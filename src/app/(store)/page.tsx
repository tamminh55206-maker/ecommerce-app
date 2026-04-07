import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/store/ProductCard';

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 8,
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 text-center">
        <h1 className="text-6xl font-bold mb-4">Chào mừng đến Shop</h1>
        <p className="text-2xl mb-8">Sản phẩm chất lượng - Giá tốt nhất</p>
        <a
          href="/products"
          className="inline-block bg-white text-black px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-100"
        >
          Xem tất cả sản phẩm
        </a>
      </div>

      {/* Sản phẩm nổi bật */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: Number(product.price),     // ← Đây là dòng fix Decimal
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}