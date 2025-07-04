import store from 'store';

export const useLanguageBasedStructure = (
  structure?: LanguageBasedStructure,
) => {
  if (!structure) {
    return '';
  }

  const selectedLanguage = store.commonStore.settings.language || 'en';

  if (Object.keys(structure).includes(selectedLanguage)) {
    return structure[selectedLanguage];
  } else {
    return '';
  }
};
