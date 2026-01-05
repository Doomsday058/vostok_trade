'use client';
import { FaTruck, FaHandshake, FaAward, FaChartLine } from 'react-icons/fa';

const features = [
  { icon: <FaTruck />, title: 'Логистика', desc: 'Доставка точно в срок' },
  { icon: <FaHandshake />, title: 'Партнерство', desc: 'Индивидуальные условия' },
  { icon: <FaAward />, title: 'Качество', desc: 'Проверенные бренды' },
  { icon: <FaChartLine />, title: 'Рост', desc: 'Развиваем ваш бизнес' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-900 common-bg-section">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full"></div>
            <img src="/about.jpg" alt="" className="rounded-2xl shadow-2xl relative z-10 border border-gray-800" />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-6 rounded-2xl z-20 shadow-xl hidden md:block">
              <span className="text-3xl font-black text-white block">2023</span>
              <span className="text-blue-100 text-sm">на рынке</span>
            </div>
          </div>
          
          <div data-aos="fade-left">
            <h2 className="text-4xl font-russo text-white mb-6">О компании</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed font-montserrat">
              VOSTOK TRADE COMPANY — это современный дистрибьютор, объединяющий лучшие традиции оптовой торговли и передовые стандарты сервиса. Мы не просто продаем товар, мы создаем цепочки поставок, которые работают как часы.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                  <div className="text-blue-500 text-2xl">{f.icon}</div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{f.title}</h4>
                    <p className="text-gray-500 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}