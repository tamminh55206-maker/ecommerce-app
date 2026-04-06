import { prisma } from '@/lib/prisma'
import ProductCard from '@/components/store/ProductCard' // bạn sẽ tạo sau
import ProductFilters from '@/components/store/ProductFilters'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; minPrice?: string; maxPrice?: string; q?: string; sort?: string }
}) {
  const { category, minPrice, maxPrice, q, sort } = searchParams

  const products = await prisma.product.findMany({
    where: {
      AND: [
        category ? { category: { slug: category } } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        } : {},
      ],
    },
    include: { category: true },
    orderBy: sort === 'price-asc' ? { price: 'asc' }
           : sort === 'newest' ? { createdAt: 'desc' }
           : { featured: 'desc' },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <ProductFilters />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}