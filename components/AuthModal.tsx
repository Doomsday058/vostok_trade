'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { useUser } from '@/context/UserContext';
import api from '@/lib/api';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', companyName: '', userType: 'personal' });
  
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, formData);
      
      login(data.token, data.user);
      onClose();
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка операции');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'login' ? 'Вход' : mode === 'register' ? 'Регистрация' : 'Сброс пароля'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-500/20 border border-red-500 text-white rounded text-sm">{error}</div>}
        
        {mode === 'register' && (
          <select 
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded"
            value={formData.userType}
            onChange={e => setFormData({...formData, userType: e.target.value})}
          >
            <option value="personal">Физическое лицо</option>
            <option value="business">Юридическое лицо</option>
          </select>
        )}

        {mode === 'register' && formData.userType === 'business' && (
          <input 
            type="text" placeholder="Название компании" required
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded"
            onChange={e => setFormData({...formData, companyName: e.target.value})}
          />
        )}

        <input 
          type="email" placeholder="Email" required
          className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded"
          onChange={e => setFormData({...formData, email: e.target.value})}
        />

        {mode !== 'forgot' && (
          <input 
            type="password" placeholder="Пароль" required
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        )}

        <button 
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all disabled:opacity-50"
        >
          {isLoading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Продолжить'}
        </button>

        <div className="flex justify-between text-xs text-gray-400">
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </button>
          {mode === 'login' && <button type="button" onClick={() => setMode('forgot')}>Забыли пароль?</button>}
        </div>
      </form>
    </Modal>
  );
}