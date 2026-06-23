import { LanguageProvider } from './context/LanguageContext';
import Seo from './components/Seo';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import { getServiceByPath } from './services.data';

export default function App() {
  const match =
    typeof window !== 'undefined' ? getServiceByPath(window.location.pathname) : null;

  return (
    <LanguageProvider>
      <Seo />
      <div className="relative min-h-screen">
        <AnimatedBackground />
        {match ? <ServicePage service={match.service} /> : <Home />}
      </div>
    </LanguageProvider>
  );
}
