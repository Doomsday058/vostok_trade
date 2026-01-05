import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp, FaChevronRight, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="mb-6">
                <Link href="/" className="inline-block">
                  <span className="text-2xl font-russo text-white">VOSTOK <span className="text-blue-500">TRADE</span></span>
                </Link>
              </div>
              <p className="text-gray-400 mb-6 font-montserrat">
                Ваш надежный партнер в оптовой торговле напитками. Мы предлагаем широкий ассортимент продукции высокого качества.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a 
                  href="https://t.me/vostoktrade" 
                  className="bg-gray-800 hover:bg-blue-300 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Telegram"
                >
                  <FaTelegram size={18} />
                </a>
                <a 
                  href="https://wa.me/+77779887045" 
                  className="bg-gray-800 hover:bg-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white font-russo">Разделы сайта</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#hero" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <FaChevronRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    Главная
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <FaChevronRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    О компании
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <FaChevronRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    Продукция
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <FaChevronRight size={12} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white font-russo">Контакты</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  <div>
                    <span className="block text-gray-400">070000, Усть-Каменогорск, ул. Самарское шоссе, 5</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1">
                    <FaPhoneAlt className="text-blue-500" />
                  </div>
                  <div>
                    <a href="tel:+77779887045" className="block text-gray-400 hover:text-blue-400 transition-colors">
                      +7 (777) 988-7045
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1">
                    <FaEnvelope className="text-blue-500" />
                  </div>
                  <div>
                    <a href="mailto:info@vostoktrade.com" className="block text-gray-400 hover:text-blue-400 transition-colors">
                      info@vostoktrade.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white font-russo">Рабочие часы</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-400">Понедельник - Пятница:</span>
                  <span className="text-white">9:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Суббота:</span>
                  <span className="text-white">10:00 - 14:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Воскресенье:</span>
                  <span className="text-white">Выходной</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">Оптовые заказы</h4>
                <p className="text-gray-400 text-sm">
                  Для оптовых заказов звоните в рабочее время или оставьте заявку на сайте
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} VOSTOK TRADE COMPANY. Все права защищены.</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>Разработка и поддержка: <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">Doomsday Web Studio</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}