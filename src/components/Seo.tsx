import { useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { SITE_URL, BUSINESS, SERVICES, CREDENTIALS, META } from '../seo.config';
import { getServiceByPath } from '../services.data';

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
    const abs = (p: string) => `${SITE_URL}${p}`;
    const match =
      typeof window !== 'undefined' ? getServiceByPath(window.location.pathname) : null;
    const es = lang === 'es';

    // Paths for canonical + hreflang (home or service page)
    const esPath = match ? `/servicios/${match.service.slugEs}` : '/';
    const enPath = match ? `/en/services/${match.service.slugEn}` : '/en/';
    const canonical = abs(es ? esPath : enPath);
    const ogImage = abs(BUSINESS.ogImage);

    // Title + description
    let title: string;
    let description: string;
    if (match) {
      title = es ? match.service.metaTitleEs : match.service.metaTitleEn;
      description = es ? match.service.metaDescEs : match.service.metaDescEn;
    } else {
      title = META[lang].title;
      description = META[lang].description;
    }

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // Canonical + hreflang
    setLink('canonical', canonical);
    setLink('alternate', abs(esPath), 'es-CL');
    setLink('alternate', abs(enPath), 'en-CA');
    setLink('alternate', abs(esPath), 'x-default');

    // Open Graph
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', BUSINESS.name);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:locale', META[lang].ogLocale);
    setMeta('property', 'og:locale:alternate', es ? 'en_CA' : 'es_CL');
    setMeta('property', 'og:image', ogImage);

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // ---- JSON-LD ----
    const business = {
      '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: BUSINESS.name,
      url: SITE_URL,
      image: abs(BUSINESS.image),
      telephone: BUSINESS.phone,
      priceRange: '$$',
      knowsLanguage: ['es', 'en'],
      areaServed: [
        { '@type': 'City', name: 'Calgary' },
        { '@type': 'AdministrativeArea', name: 'Alberta' },
        { '@type': 'Country', name: 'Canada' },
        { '@type': 'Country', name: 'Chile' },
      ],
      sameAs: [BUSINESS.instagram, BUSINESS.facebook, BUSINESS.whatsapp],
      founder: { '@id': `${SITE_URL}/#maca` },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: es ? 'Terapias holísticas' : 'Holistic therapies',
        itemListElement: SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: es ? s.es : s.en },
        })),
      },
    };

    const person = {
      '@type': 'Person',
      '@id': `${SITE_URL}/#maca`,
      name: BUSINESS.founder,
      jobTitle: es ? 'Terapeuta Holística' : 'Holistic Therapist',
      image: abs(BUSINESS.image),
      url: SITE_URL,
      sameAs: [BUSINESS.instagram, BUSINESS.facebook],
      knowsAbout: [
        'Sound Healing',
        'Tarot Reading',
        'Bioconstellation',
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
    };

    const website = {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      inLanguage: META[lang].hreflang,
      publisher: { '@id': `${SITE_URL}/#business` },
    };

    const graph: Record<string, unknown>[] = [business, person, website];

    if (match) {
      const name = es ? match.service.nameEs : match.service.nameEn;
      const priceText = es ? match.service.priceEs : match.service.priceEn;
      const priceNum = (priceText.match(/\d+/) || [])[0];
      graph.push({
        '@type': 'Service',
        '@id': `${canonical}#service`,
        name,
        description,
        serviceType: name,
        url: canonical,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: [
          { '@type': 'City', name: 'Calgary' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Chile' },
        ],
        ...(priceNum
          ? {
              offers: {
                '@type': 'Offer',
                price: priceNum,
                priceCurrency: 'CAD',
                availability: 'https://schema.org/InStock',
              },
            }
          : {}),
      });
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: es ? 'Inicio' : 'Home', item: abs(es ? '/' : '/en/') },
          { '@type': 'ListItem', position: 2, name: es ? 'Servicios' : 'Services', item: abs(es ? '/#services' : '/en/#services') },
          { '@type': 'ListItem', position: 3, name, item: canonical },
        ],
      });
    }

    const ld = { '@context': 'https://schema.org', '@graph': graph };

    let script = document.getElementById('ld-json');
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-json';
      (script as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, [lang]);

  return null;
}
