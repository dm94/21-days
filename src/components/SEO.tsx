import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = 'https://21days.deeme.dev/og-image.jpg',
  url = 'https://21days.deeme.dev/',
  type = 'website'
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const defaultTitle = currentLang === 'es' 
    ? '21 Days - Forma Hábitos en 21 Días | Seguimiento de Hábitos Gratis'
    : '21 Days - Build Habits in 21 Days | Free Habit Tracker';
    
  const defaultDescription = currentLang === 'es'
    ? 'Aplicación web gratuita para formar hábitos siguiendo la teoría de los 21 días. Seguimiento visual, sistema de recompensas y soporte multiidioma. Sin registro requerido.'
    : 'Free web application to build habits following the 21-day theory. Visual tracking, reward system, and multilingual support. No registration required.';
    
  const defaultKeywords = currentLang === 'es'
    ? 'hábitos, 21 días, seguimiento hábitos, formación hábitos, productividad, bienestar, aplicación web, gratis, sin registro'
    : 'habits, 21 days, habit tracking, habit formation, productivity, wellness, web app, free, no registration';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:locale', currentLang === 'es' ? 'es_ES' : 'en_US', true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', finalTitle, true);
    updateMetaTag('twitter:description', finalDescription, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    
    // Update language attribute
    document.documentElement.setAttribute('lang', currentLang);
    
  }, [finalTitle, finalDescription, finalKeywords, image, url, type, currentLang]);

  return null;
};

export default SEO;