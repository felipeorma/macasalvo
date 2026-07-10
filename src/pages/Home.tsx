import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Assessment from '../components/sections/Assessment';
import Services from '../components/sections/Services';
import Instagram from '../components/sections/Instagram';
import FacebookSection from '../components/sections/FacebookSection';
import Booking from '../components/sections/Booking';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Assessment />
        <Services />
        <Instagram />
        <FacebookSection />
        <Booking />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
