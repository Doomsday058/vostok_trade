'use client';
import { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Тестовые отзывы для демонстрации
const reviews = [
  { id: 1, name: 'Иван Иванов', role: 'Менеджер по продажам', text: 'Отличный сервис и большой выбор продукции! Работать с VOSTOK TRADE COMPANY - одно удовольствие.' },
  { id: 2, name: 'Мария Петрова', role: 'Закупщик', text: 'Очень довольны качеством напитков. Все всегда вовремя, с хорошими ценами. Рекомендуем!' },
  { id: 3, name: 'Дмитрий Сидоров', role: 'Клиент', text: 'Всегда лучшая продукция на рынке! Пивной ассортимент - просто супер.' },
  { id: 4, name: 'Елена Смирнова', role: 'Директор кафе', text: 'Наладили сотрудничество в прошлом году, и с тех пор ни разу не пожалели. Надежный партнер с отличным сервисом.' },
  { id: 5, name: 'Алексей Попов', role: 'Владелец магазина', text: 'Высокое качество продукции и отличный клиентский сервис. Всем рекомендую данную компанию!' },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }
    
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPaused]);
  
  const getVisibleReviews = () => {
    const visibleCount = isMobile ? 1 : 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % reviews.length;
      result.push(reviews[index]);
    }
    
    return result;
  };
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  
  const goToIndex = (index: number) => {
  setCurrentIndex(index);
};
  
  const visibleReviews = getVisibleReviews();
  
  return (
    <section 
      id="reviews" 
      className="py-20 common-bg-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-russo mb-8">Что говорят наши клиенты</h2>

        <div className="relative overflow-hidden px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`} 
                className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-blue-900/30 hover:shadow-xl h-full flex flex-col"
                style={{ 
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" 
                }}
              >
                <div className="flex justify-between mb-4 items-start">
                  <FaQuoteLeft className="text-blue-500 opacity-30 text-4xl" />
                  <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-xl font-bold text-blue-400">
                    {review.name.charAt(0)}
                  </div>
                </div>
                <p className="text-lg font-montserrat italic mb-6 flex-grow">{review.text}</p>
                <div className="mt-auto">
                  <div className="font-semibold text-white font-montserrat text-lg">{review.name}</div>
                  <div className="text-blue-400 text-sm font-montserrat">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="md:hidden flex justify-center mt-6 space-x-4">
            <button 
              onClick={goToPrev} 
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors hover:shadow-blue-500/50"
              aria-label="Предыдущий отзыв"
            >
              <FaChevronLeft />
            </button>
            
            <button 
              onClick={goToNext}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors hover:shadow-blue-500/50"
              aria-label="Следующий отзыв"
            >
              <FaChevronRight />
            </button>
          </div>
          
          <button 
            onClick={goToPrev} 
            className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors hover:shadow-blue-500/50"
            aria-label="Предыдущий отзыв"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors hover:shadow-blue-500/50"
            aria-label="Следующий отзыв"
          >
            <FaChevronRight />
          </button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-600 w-3'
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}