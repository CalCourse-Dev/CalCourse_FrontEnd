import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {

        }
      },
      zh: {
        translations: {
          
        }
      }
    },
    lng: `${window.navigator.language}`,
    fallbackLng: 'en',
    debug: true,
    supportedLngs: ['en', 'zh'],
    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    }
  });

export default i18n;
