import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface Product {
  images?: string[];
  name: string;
  price: number | string;
  category?: {
    name: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.images?.[0] || 'https://placehold.co/600x400/png'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
        <p className="text-red-600 font-bold text-xl mt-2">
          {Number(product.price).toLocaleString('vi-VN')} đ
        </p>
        <p className="text-sm text-gray-500 mt-1">{product.category?.name}</p>
        
        <button className="mt-4 w-full bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition">
          <ShoppingCart className="w-5 h-5" />
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
}