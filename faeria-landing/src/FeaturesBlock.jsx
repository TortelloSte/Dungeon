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

  const features = [
    {
      icon: Map,
      title: t('feature1'),
      description: t('Testo4'),
    },
    {
      icon: Swords,
      title: t('feature2'),
      description: t('Testo5'),
    },
    {
      icon: Sparkles,
      title: t('feature3'),
      description: t('Testo6'),
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 text-yellow-300" data-aos="fade-up">
        {t('featuresTitle')}
      </h2>
      <p className="text-gray-400 mb-16 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
        {t('featuresIntro')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-[#111] border border-yellow-500/20 rounded-xl p-6 flex flex-col justify-between items-center shadow-md transition duration-300 hover:scale-105 hover:shadow-yellow-500/30 min-h-[320px]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex flex-col items-center">
                {/* ICONA - senza hover */}
                <div className="bg-gray-800 p-5 rounded-full shadow-lg w-20 h-20 flex items-center justify-center mb-4">
                  <Icon className="text-yellow-400 w-8 h-8" />
                </div>

                <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
