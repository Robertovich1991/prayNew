import { T_KEYS } from 'assets/translations';
import { useTranslation } from 'react-i18next';
import store from 'store';

export default (key: keyof typeof T_KEYS | LanguageBasedStructure) => {
  const { t } = useTranslation();

  if (typeof key === 'string') {
    return t(key);
  } else if (typeof key === 'object') {
    return key[store.commonStore.settings.language || 'en'];
  }
  return 'Not available translation';
};
