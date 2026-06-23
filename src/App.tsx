import { LanguageProvider } from './context/LanguageContext';
import Seo from './components/Seo';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Assessment from './components/sections/Assessment';
import Services from './components/sections/Services';
import Instagram from './components/sections/Instagram';
import Booking from './components/sections/Booking';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function App() {
  return (
    <LanguageProvider>
      <Seo />
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Assessment />
          <Services />
          <Instagram />
          <Booking />
          <Testimonials />
          <FAQ />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}
