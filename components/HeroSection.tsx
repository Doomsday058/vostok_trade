'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="hero" className="h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden common-bg-section">
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-black font-russo mb-6 tracking-tight" data-aos="fade-down">
          VOSTOK <span className="text-blue-500">TRADE</span> COMPANY
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-montserrat font-light text-gray-300" data-aos="fade-up" data-aos-delay="200">
          Ваш стратегический партнер в дистрибуции напитков
        </p>
        <div data-aos="zoom-in" data-aos-delay="400">
          <a href="#products" className="px-10 py-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-full text-lg font-bold inline-block hover:scale-105 active:scale-95">
            Смотреть каталог
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <a href="#about">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}