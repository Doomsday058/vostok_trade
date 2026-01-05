'use client';
import { useState } from 'react';
import Modal from './Modal';
import api from '@/lib/api';
import { useUser } from '@/context/UserContext';
import AuthModal from './AuthModal';

export function ProductDetailModal({ isOpen, onClose, product }: any) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  if (!product) return null;

  const handleAction = async () => {
    if (!user) {
        setShowAuth(true);
        return;
    }
    setLoading(true);
    try {
      await api.post('/request-price');
      setSent(true);
    } catch (err) {
      alert('Ошибка при запросе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
        <div className="space-y-4">
          <img src={product.image || '/placeholder.jpg'} className="w-full h-48 object-cover rounded" alt={product.title} />
          <p className="text-gray-300">{product.details || product.description}</p>
          
          {product.price && (
             <p className="text-xl font-bold text-blue-400">Цена: {product.price} ₸</p>
          )}

          {sent ? (
            <div className="p-4 bg-green-600/20 border border-green-600 text-white rounded text-center">
              Прайс-лист отправлен на {user?.email}
            </div>
          ) : (
            <button 
              onClick={handleAction} 
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'Отправка...' : 'Запросить оптовый прайс'}
            </button>
          )}
        </div>
      </Modal>
      
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}