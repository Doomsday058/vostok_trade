'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import AuthModal from './AuthModal';
import api from '@/lib/api';

export default function PriceRequestForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setShowAuth(true);
    
    setLoading(true);
    try {
      await api.post('/request-price');
      setSent(true);
    } catch (err) {
      alert('Ошибка при отправке. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 common-bg-section" style={{ backgroundImage: "url('/hero-bg.jpg')" }}>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-russo text-white mb-8">Запросить полный прайс-лист</h2>
        
        {sent ? (
          <div className="p-8 bg-green-600/10 border border-green-600 rounded-2xl text-white">
            <p className="text-xl font-bold mb-2">Готово!</p>
            <p className="text-gray-400">Файл отправлен на почту {user?.email}</p>
          </div>
        ) : (
          <form onSubmit={handleRequest} className="relative group">
            <input 
              type="email" 
              readOnly 
              value={user?.email || 'Войдите, чтобы ввести email'}
              className="w-full p-5 bg-gray-800 border border-gray-700 rounded-full text-gray-300 focus:outline-none focus:border-blue-500 transition-all pl-8 pr-48"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all disabled:opacity-50"
            >
              {loading ? '...' : 'Получить прайс'}
            </button>
          </form>
        )}
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </section>
  );
}