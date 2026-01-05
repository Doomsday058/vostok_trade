import { Russo_One, Montserrat } from 'next/font/google';
import { UserProvider } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/app/styles/globals.css';

const russo = Russo_One({ 
  weight: '400', 
  subsets: ['cyrillic'], 
  variable: '--font-russo' 
});

const montserrat = Montserrat({ 
  subsets: ['cyrillic'], 
  variable: '--font-montserrat' 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${russo.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-gray-900 font-montserrat text-white">
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}