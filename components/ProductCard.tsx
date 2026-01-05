'use client';
import { useState } from 'react';
import { ProductDetailModal } from './ProductDetailModal';

export default function ProductCard({ product }: { product: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 group hover:shadow-2xl hover:shadow-blue-900/20 transition-all">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={product.image || '/placeholder.jpg'} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform"
            >
              Подробнее
            </button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
          {product.price && <p className="mt-4 text-blue-400 font-bold text-lg">{product.price} ₸</p>}
        </div>
      </div>

      <ProductDetailModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        product={product} 
      />
    </>
  );
}