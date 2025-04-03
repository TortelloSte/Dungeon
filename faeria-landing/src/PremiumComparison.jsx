import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function PremiumComparison() {
  const [isPremium, setIsPremium] = useState(false);
  const { t } = useTranslation();

  const features = {
    free: [
      t('free.feature1'),
      t('free.feature2'),
      t('free.feature3'),
      t('free.feature4'),
    ],
    premium: [
      t('premium.feature1'),
      t('premium.feature2'),
      t('premium.feature3'),
      t('premium.feature4'),
    ],
  };

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6 text-yellow-300">{t('comparisonTitle')}</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setIsPremium(false)}
          className={`px-6 py-2 font-semibold border border-yellow-400 text-sm w-28 ${
            !isPremium ? 'bg-yellow-500 text-black rounded-l-lg' : 'bg-gray-800 text-yellow-400'
          }`}
        >
          {t('free.label')}
        </button>
        <button
          onClick={() => setIsPremium(true)}
          className={`px-6 py-2 font-semibold border border-yellow-400 text-sm w-28 ${
            isPremium ? 'bg-yellow-500 text-black rounded-r-lg' : 'bg-gray-800 text-yellow-400'
          }`}
        >
          {t('premium.label')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isPremium ? 'premium' : 'free'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-xl mx-auto"
        >
          <ul className="text-left list-disc list-inside space-y-2 text-gray-300">
            {(isPremium ? features.premium : features.free).map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-sm text-gray-400 italic">
        {isPremium
          ? t('premium.description')
          : t('free.description')}
      </div>
    </section>
  );
}
