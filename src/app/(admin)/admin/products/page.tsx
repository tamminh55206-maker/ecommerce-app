import { prisma } from '@/lib/prisma';
import ProductForm from '@/components/admin/ProductForm';
import { deleteProduct } from '@/actions/products';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý Sản phẩm</h1>
      </div>

      <ProductForm />

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Danh sách sản phẩm ({products.length})</h2>

        <table className="w-full border border-gray-200 rounded-2xl">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left">Tên sản phẩm</th>
              <th className="px-6 py-4 text-left">Giá</th>
              <th className="px-6 py-4 text-left">Tồn kho</th>
              <th className="px-6 py-4 text-left">Danh mục</th>
              <th className="px-6 py-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{Number(product.price).toLocaleString('vi-VN')} đ</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.category?.name}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-3">
                  <ProductForm product={product} />
                  <form action={deleteProduct.bind(null, product.id)}>
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}