import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductsSection from '@/components/ProductsSection';
import PriceRequestForm from '@/components/PriceRequestForm';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <PriceRequestForm />
      <ReviewsSection />
      <ContactSection />
    </>
  );
}