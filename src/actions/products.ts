"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string(),
});

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function createProduct(formData: FormData) {
  const result = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  await prisma.product.create({
    data: { ...result.data, slug: slugify(result.data.name) },
  });
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const result = ProductSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  await prisma.product.update({
    where: { id },
    data: { ...result.data, slug: slugify(result.data.name) },
  });
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
  revalidatePath("/admin/products");
}