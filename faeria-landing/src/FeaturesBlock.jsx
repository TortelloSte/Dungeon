import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Swords, Sparkles } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function FeaturesBlock() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-16 text-yellow-300" data-aos="fade-up">
        {t('featuresTitle')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Primo */}
        <div className="flex flex-col items-center relative" data-aos="fade-up" data-aos-delay="0">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4 transition hover:scale-105 hover:shadow-yellow-500/30">
            <Map className="text-yellow-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature1')}</h3>
          <p className="text-gray-300">{t('Testo4')}</p>
          <div className="hidden md:block absolute right-[-40px] top-[50%] w-10 h-1 bg-yellow-400 rotate-0"></div>
        </div>

        {/* Secondo */}
        <div className="flex flex-col items-center relative" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4 transition hover:scale-105 hover:shadow-yellow-500/30">
            <Swords className="text-yellow-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature2')}</h3>
          <p className="text-gray-300">{t('Testo5')}</p>
          <div className="hidden md:block absolute right-[-40px] top-[50%] w-10 h-1 bg-yellow-400 rotate-0"></div>
        </div>

        {/* Terzo */}
        <div className="flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-gray-800 p-6 rounded-full shadow-lg w-24 h-24 flex items-center justify-center mb-4 transition hover:scale-105 hover:shadow-yellow-500/30">
            <Sparkles className="text-yellow-400 w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-2">{t('feature3')}</h3>
          <p className="text-gray-300">{t('Testo6')}</p>
        </div>
      </div>
    </section>
  );
}
