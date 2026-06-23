import { useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { SITE_URL, BUSINESS, SERVICES, CREDENTIALS, META } from '../seo.config';

// Upsert a <meta> tag by name/property so re-renders don't duplicate tags.
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (hreflang) el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo() {
  const { lang } = useLang();

  useEffect(() => {
    const meta = META[lang];
    const abs = (p: string) => `${SITE_URL}${p}`;
    const canonical = abs(meta.path);
    const ogImage = abs(BUSINESS.ogImage);

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // Canonical + hreflang (cada idioma su propia URL indexable)
    setLink('canonical', canonical);
    setLink('alternate', abs(META.es.path), 'es-CL');
    setLink('alternate', abs(META.en.path), 'en-CA');
    setLink('alternate', abs(META.es.path), 'x-default');

    // Open Graph
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', BUSINESS.name);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:locale', meta.ogLocale);
    setMeta('property', 'og:locale:alternate', lang === 'es' ? 'en_CA' : 'es_CL');
    setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', ogImage);

    // JSON-LD structured data (LocalBusiness service-area + Person + WebSite)
    const services = SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: lang === 'es' ? s.es : s.en },
    }));

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
          '@id': `${SITE_URL}/#business`,
          name: BUSINESS.name,
          url: canonical,
          image: abs(BUSINESS.image),
          telephone: BUSINESS.phone,
          priceRange: '$$',
          description: META[lang].description,
          knowsLanguage: ['es', 'en'],
          // Negocio de área de servicio: sin dirección de calle pública.
          areaServed: [
            { '@type': 'City', name: 'Calgary' },
            { '@type': 'AdministrativeArea', name: 'Alberta' },
            { '@type': 'Country', name: 'Canada' },
            { '@type': 'Country', name: 'Chile' },
          ],
          sameAs: [BUSINESS.instagram, BUSINESS.whatsapp],
          founder: { '@id': `${SITE_URL}/#maca` },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: lang === 'es' ? 'Terapias holísticas' : 'Holistic therapies',
            itemListElement: services,
          },
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#maca`,
          name: BUSINESS.founder,
          jobTitle: lang === 'es' ? 'Terapeuta Holística' : 'Holistic Therapist',
          image: abs(BUSINESS.image),
          url: SITE_URL,
          sameAs: [BUSINESS.instagram],
          knowsAbout: [
            'Sound Healing',
            'Reiki',
            'Access Bars',
            'Sacred Geometry',
            'Karnak Pendulum',
            'Energy Healing',
            'Theta Healing',
          ],
          hasCredential: CREDENTIALS.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name: c,
          })),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: BUSINESS.name,
          inLanguage: meta.hreflang,
          publisher: { '@id': `${SITE_URL}/#business` },
        },
      ],
    };

    let script = document.getElementById('ld-json');
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-json';
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }, [lang]);

  return null;
}
