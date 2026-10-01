import { LanguageProvider } from './context/LanguageContext';
import Seo from './components/Seo';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';
import GeometryTest from './pages/GeometryTest';
import { getServiceByPath } from './services.data';
import { isGeometryTestPath } from './routes';

export default function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const match = getServiceByPath(path);
  const isTest = isGeometryTestPath(path);

  return (
    <LanguageProvider>
      <Seo />
      <div className="relative min-h-screen">
        <AnimatedBackground />
        {isTest ? <GeometryTest /> : match ? <ServicePage service={match.service} /> : <Home />}
      </div>
    </LanguageProvider>
  );
}
