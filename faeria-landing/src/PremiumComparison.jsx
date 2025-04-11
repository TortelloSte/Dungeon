import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PremiumComparison() {
  const { t } = useTranslation();
  const [billing, setBilling] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      monthly: '€0',
      yearly: '€0',
      description: 'Accesso base con funzionalità limitate',
      features: [
        'Accesso ai dungeon base',
        'Progressione limitata',
        'Inventario annotabile',
        'Personaggi casuali',
      ],
      button: 'Inizia gratis',
      bg: 'bg-pink-100',
      text: 'text-black',
    },
    {
      name: 'Professional',
      monthly: '€10',
      yearly: '€96', // 20% sconto
      description: 'Per avventurieri esperti',
      features: [
        'Tutte le funzionalità del piano Free',
        'Dungeon avanzati',
        'Personaggi personalizzabili',
        'Statistiche salvate',
        'Oggetti rari e inventario esteso',
      ],
      button: 'Sblocca Pro',
      bg: 'bg-lime-200',
      text: 'text-black',
    },
    {
      name: 'Team',
      monthly: '€18',
      yearly: '€160', // 20% sconto
      description: 'Per gruppi e party cooperativi',
      features: [
        'Tutte le funzionalità del piano Pro',
        'Progressione condivisa',
        'Gestione team e ruoli',
        'Matchmaking per party',
        'Evento esclusivo mensile',
      ],
      button: 'Attiva Team Plan',
      bg: 'bg-yellow-300',
      text: 'text-black',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8 text-yellow-300">{t('comparisonTitle')}</h2>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10 gap-4 text-sm font-medium text-gray-300">
        <span>Mensile</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            onChange={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            checked={billing === 'yearly'}
          />
          <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500" />
        </label>
        <span>Annuale <span className="text-yellow-400 text-xs ml-1">(–20%)</span></span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${plan.bg} ${plan.text} rounded-xl shadow-lg p-8 flex flex-col justify-between h-full`}
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>

              <div className="text-4xl font-extrabold mb-2">
                {billing === 'monthly' ? plan.monthly : plan.yearly}
                <span className="text-base font-medium ml-1">/{billing === 'monthly' ? 'mese' : 'anno'}</span>
              </div>

              <p className="text-sm mb-6">{plan.description}</p>
              <ul className="text-sm space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-1 text-black" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="bg-black text-white font-semibold py-2 rounded hover:opacity-90 transition">
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
