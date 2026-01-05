'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="products" className="py-24 common-bg-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-russo text-white mb-4">Наш ассортимент</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-gray-800 rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p: any) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}