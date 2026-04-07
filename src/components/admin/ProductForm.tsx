"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct, updateProduct } from "@/actions/products";

const schema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().min(0),
  categoryId: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm({ product }: { product?: any }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product || {},
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));

    if (product?.id) {
      await updateProduct(product.id, formData);
    } else {
      await createProduct(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-6 rounded-2xl space-y-4">
      <input {...register("name")} placeholder="Tên sản phẩm" className="border p-3 w-full rounded-xl" />
      <input {...register("price", { valueAsNumber: true })} type="number" placeholder="Giá" className="border p-3 w-full rounded-xl" />
      <input {...register("stock", { valueAsNumber: true })} type="number" placeholder="Tồn kho" className="border p-3 w-full rounded-xl" />
      <input {...register("categoryId")} placeholder="Category ID" className="border p-3 w-full rounded-xl" />
      <button type="submit" className="bg-black text-white px-8 py-4 rounded-xl">
        {product ? "Cập nhật" : "Thêm sản phẩm"}
      </button>
    </form>
  );
}