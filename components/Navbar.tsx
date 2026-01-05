'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import AuthModal from './AuthModal';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all ${scrolled ? 'bg-black/90 py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-white">
          VOSTOK <span className="text-blue-500">TRADE</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {['about', 'products', 'reviews', 'contact'].map(item => (
            <a key={item} href={`#${item}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors capitalize">
              {item === 'about' ? 'Компания' : item === 'products' ? 'Продукция' : item === 'reviews' ? 'Отзывы' : 'Контакты'}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
              <Link href="/account" className="text-blue-400 flex items-center gap-2 text-sm">
                <FaUserCircle size={18} /> {user.email}
              </Link>
              <button onClick={logout} className="text-gray-400 hover:text-red-400 transition-colors">
                <FaSignOutAlt size={18} />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuth(true)} className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all">
              Войти
            </button>
          )}
        </nav>
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
}