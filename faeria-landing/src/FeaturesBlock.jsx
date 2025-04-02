import React from 'react';
import { useTranslation } from 'react-i18next';

export default function FeaturesBlock() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-16 text-yellow-300">{t('featuresTitle')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Primo */}
        <div className="flex flex-col items-center relative">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-3xl">🗺️</span>
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature1')}</h3>
          <p className="text-gray-300">Dungeon unici generati proceduralmente con eventi misteriosi e percorsi nascosti.</p>
          <div className="hidden md:block absolute right-[-40px] top-[50%] w-10 h-1 bg-yellow-400 rotate-0"></div>
        </div>

        {/* Secondo */}
        <div className="flex flex-col items-center relative">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-3xl">🃏</span>
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature2')}</h3>
          <p className="text-gray-300">Sistema a carte che influenza ogni combattimento, decisione e sviluppo del personaggio.</p>
          <div className="hidden md:block absolute right-[-40px] top-[50%] w-10 h-1 bg-yellow-400 rotate-0"></div>
        </div>

        {/* Terzo */}
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4">
            <span className="text-yellow-400 text-3xl">🧙</span>
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature3')}</h3>
          <p className="text-gray-300">Ogni eroe è diverso: puoi crearne uno con abilità uniche oppure scoprire quelli casuali.</p>
        </div>
      </div>
    </section>
  );
}
