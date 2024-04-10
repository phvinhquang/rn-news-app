import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, vn} from './translations';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  // debug: true,
  // lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    vn: {
      translation: vn,
    },
  },
});

export default i18next;
