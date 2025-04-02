import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LoadingScreen() {
  const { t, i18n } = useTranslation();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50">
      <div className="text-center">
        <div className="animate-pulse text-4xl font-bold text-yellow-400 mb-4">{t('heroTitle')}</div>
        <p className="text-sm text-gray-400">{t('loading')}</p>
      </div>
    </div>
  );
}