import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import esTranslations from '../locales/es.json';
import enTranslations from '../locales/en.json';

// Get saved language from localStorage or default to Spanish
const savedLanguage = localStorage.getItem('language') || 'es';

const resources = {
  es: {
    translation: esTranslations,
  },
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language
    fallbackLng: 'es', // use Spanish if detected lng is not available

    interpolation: {
      escapeValue: false, // react already does escaping
    },

    // Save language preference to localStorage when changed
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Save language to localStorage when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;