# 🚀 VOSTOK TRADE COMPANY

![Project Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Render-black?style=for-the-badge)

<div align="center">
  <img src="./assets/screen.png" alt="Скриншот проекта Vostok Trade" width="100%" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
  <br>
  <h3>Современная B2B платформа для дистрибуции напитков</h3>
  
  <a href="https://vostok-trade.onrender.com">
    <img src="https://img.shields.io/badge/🔴_LIVE_DEMO-Смотреть_онлайн-red?style=for-the-badge&logo=vercel" height="35" />
  </a>
</div>

---

## 📖 О проекте

**VOSTOK TRADE** — это fullstack веб-приложение для оптовой торговой компании. Проект объединяет в себе лендинг, каталог продукции и панель администрирования. Платформа позволяет клиентам ознакомиться с ассортиментом и запросить прайс-лист, а администраторам — управлять товарами через загрузку Excel-файлов.

Это вторая версия проекта. Он был переписан с классической связки React+Express на **Next.js 15 (App Router)** для улучшения SEO, производительности и удобства деплоя.

---

## 🛠️ Стек технологий

Проект построен на современном стеке технологий, обеспечивающем высокую производительность и масштабируемость.

### Core & Frontend
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend & Database
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Utilities & Tools
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-blue?style=for-the-badge)
![XLSX](https://img.shields.io/badge/SheetJS-green?style=for-the-badge)

---

## ✨ Ключевые возможности

* **⚡ Server Side Rendering (SSR):** Быстрая загрузка и отличная SEO-оптимизация благодаря Next.js.
* **🔐 Авторизация:** Система регистрации и входа с использованием JWT (Access Token).
* **🛒 Динамический каталог:** Товары подгружаются из базы данных MongoDB.
* **📩 Email-рассылка:** Автоматическая отправка прайс-листов клиентам на почту (Nodemailer).
* **👑 Админ-панель:**
    * Просмотр истории запросов клиентов.
    * Массовая загрузка/обновление товаров через **Excel (.xlsx)**.
* **🎨 UI/UX:** Адаптивный дизайн, темная тема, плавные анимации (AOS), параллакс-эффекты.

---

## 🚀 Запуск проекта локально

Следуйте инструкции, чтобы развернуть проект на своем компьютере.

### 1. Клонирование репозитория
```bash
git clone [https://github.com/Doomsday058/vostok-trade.git](https://github.com/ВАШ_НИКНЕЙМ/vostok-trade.git)
cd vostok-trade
```

### 2. Установка зависимостей

 ```bash
npm install
# или
yarn install
```

### 3. Настройка окружения

 ```bash
# База данных (MongoDB Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vostok-trade

JWT_SECRET=super_secret_key_change_me

# Настройки почты (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Запуск в режиме разработки

 ```bash
npm run dev
```
