'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import api from '@/lib/api';
import { FaUserCircle, FaHistory, FaSpinner, FaUpload } from 'react-icons/fa';

export default function AccountPage() {
  const { user, logout, loading: authLoading } = useUser();
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) router.push('/');
    if (user) {
      api.get('/price-requests')
        .then(res => {
            if (Array.isArray(res.data)) {
                setRequests(res.data);
            } else {
                setRequests([]);
            }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, authLoading, router]);

  const handleUploadPrice = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      await api.post('/upload-price', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Прайс-лист успешно обновлен!');
    } catch (err) {
      console.error(err);
      alert('Ошибка загрузки файла');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  if (authLoading || !user) return <div className="h-screen flex items-center justify-center"><FaSpinner className="animate-spin text-blue-500" size={40} /></div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-russo mb-10 text-center md:text-left">Личный кабинет</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
              <FaUserCircle size={80} className="mx-auto text-blue-500 mb-4" />
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold">{user.companyName || 'Клиент'}</h2>
                <p className="text-gray-400 text-sm">{user.role === 'admin' ? 'Администратор' : 'Партнер'}</p>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">Тип:</span>
                  <span>{user.userType === 'business' ? 'Юр. лицо' : 'Физ. лицо'}</span>
                </div>
              </div>

              <button onClick={logout} className="w-full mt-8 py-3 bg-gray-700 hover:bg-red-600 transition-colors rounded-xl font-bold">
                Выйти
              </button>
            </div>

            {user.role === 'admin' && (
              <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaUpload className="text-blue-400" /> Обновить прайс
                </h3>
                <label className="block w-full text-center py-3 border-2 border-dashed border-blue-500/50 rounded-xl cursor-pointer hover:bg-blue-500/10 transition-all">
                  <span className="text-sm font-medium">{uploading ? 'Загрузка...' : 'Выбрать Excel файл'}</span>
                  <input type="file" accept=".xlsx" className="hidden" onChange={handleUploadPrice} disabled={uploading} />
                </label>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
              <FaHistory className="text-blue-500" /> История запросов
            </h2>
            
            {loading ? (
              <div className="py-20 text-center opacity-50"><FaSpinner className="animate-spin mx-auto mb-4" /></div>
            ) : requests.length === 0 ? (
              <div className="py-20 text-center text-gray-500">Запросов пока не было</div>
            ) : (
              <div className="space-y-4">
                {requests.map((req: any) => (
                  <div key={req._id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <div>
                        <p className="font-bold">{new Date(req.createdAt).toLocaleDateString('ru-RU')}</p>
                        <p className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${req.status === 'sent' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {req.status === 'sent' ? 'ОТПРАВЛЕН' : 'ОШИБКА'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}