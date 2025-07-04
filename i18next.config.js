import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { EN_TRANSLATIONS } from './src/assets/translations/en';
import { FR_TRANSLATIONS } from './src/assets/translations/fr';

//empty for now
const resources = {
  en: {
    translation: EN_TRANSLATIONS,
  },
  fr: {
    translation: FR_TRANSLATIONS,
  },
};

// console.log('initReactI18next', resources);

i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  // fallbackLng: "en",
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
