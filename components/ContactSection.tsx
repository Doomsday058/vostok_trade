'use client';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp, FaTelegram, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 common-bg-section">
      <div className="max-w-6xl mx-auto px-4 text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-russo mb-4" data-aos="fade-up">Свяжитесь с нами</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" data-aos="zoom-in" data-aos-delay="200"></div>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">
            Готовы к сотрудничеству? Мы всегда на связи. Выберите удобный для вас способ связи.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2" data-aos="fade-right">
            <div className="bg-gray-900/80 backdrop-blur p-6 rounded-lg border border-gray-800 shadow-lg h-full">
              <h3 className="text-2xl font-russo mb-6 text-blue-400">Контактная информация</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Телефон</h4>
                    <a 
                      href="tel:+77779887045" 
                      className="text-blue-400 hover:text-blue-300 transition-colors block"
                    >
                      +7 (777) 988-7045
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <a 
                      href="mailto:info@vostoktrade.com" 
                      className="text-blue-400 hover:text-blue-300 transition-colors block"
                    >
                      info@vostoktrade.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-green-600/20 p-3 rounded-lg text-green-400">
                    <FaWhatsapp size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                    <a 
                      href="https://wa.me/+77779887045" 
                      target="_blank" 
                      className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
                    >
                      Написать в WhatsApp
                      <span className="text-xs bg-green-900/50 px-2 py-1 rounded">Online</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <FaTelegram size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telegram</h4>
                    <a 
                      href="https://t.me/vostoktrade" 
                      target="_blank" 
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                      Написать в Telegram
                      <span className="text-xs bg-blue-900/50 px-2 py-1 rounded">Online</span>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-600/20 p-3 rounded-lg text-blue-400">
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Адрес</h4>
                    <p className="text-gray-300">070000, Усть-Каменогорск, ул. Самарское шоссе, 5</p>
                    <p className="text-gray-400 text-sm mt-1">
                      <span className="inline-flex items-center gap-1">
                        <FaBuilding size={12} />
                        Офис работает: Пн-Пт с 9:00 до 18:00
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2" data-aos="fade-left">
            <div className="w-full h-full overflow-hidden rounded-lg shadow-lg border border-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.03210210959!2d82.63398387725118!3d49.89820062697212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42eb4ed1d48c9811%3A0xa1b9c54011f0c3e0!2z0KHQsNC80LDRgNGB0LrQvtC1INGILiA1LCDQo9GB0YLRjC3QmtCw0LzQtdC90L7Qs9C-0YDRgdC6IDA3MDAwMCwg0JrQsNC30LDRhdGB0YLQsNC9!5e0!3m2!1sru!2sru!4v1741958640355!5m2!1sru!2sru"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '460px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}