import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="text-xs text-gray-300">
      <button
        onClick={() => changeLanguage('it')}
        className={`mr-1 hover:text-yellow-400 ${i18n.language === 'it' ? 'font-bold text-yellow-400' : ''}`}
        aria-label="Cambia lingua in italiano"
      >
        ITA
      </button>
      {' · '}
      <button
        onClick={() => changeLanguage('en')}
        className={`ml-1 hover:text-yellow-400 ${i18n.language === 'en' ? 'font-bold text-yellow-400' : ''}`}
        aria-label="Switch language to English"
      >
        ENG
      </button>
    </div>
  );
}
