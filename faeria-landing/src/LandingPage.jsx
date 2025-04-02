import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans">
      {/* LANGUAGE SWITCHER */}
      <div className="absolute top-4 right-4 z-50">
        <button onClick={() => i18n.changeLanguage('it')} className="mr-2">🇮🇹</button>
        <button onClick={() => i18n.changeLanguage('en')}>🇬🇧</button>
      </div>

      {/* HERO */}
      <section className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-200">{t('heroSubtitle')}</p>
          <Link to="/login">
            <button className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-xl transition">
              {t('cta')}
            </button>
          </Link>
        </motion.div>
      </section>

      {/* COS'É DUNGEON CRAWLER */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 text-yellow-300">{t('whatIsTitle')}</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-3">
          Dungeon Crawler è un gioco fantasy strategico dove ogni decisione può significare gloria... o rovina.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-3">
          Crea il tuo eroe, esplora dungeon generati proceduralmente, combatti con un sistema a carte dinamico
          e svela antichi segreti in un mondo avvolto dal mistero.
        </p>
        <p className="text-lg text-gray-300 leading-relaxed italic">
          Ogni avventura è unica. Ogni passo può cambiare il tuo destino.
        </p>
      </section>

      {/* TRAILER */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300">{t('trailerTitle')}</h2>
        <div className="relative w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src="/images/trailer-placeholder.jpg" alt="Trailer"
            className="w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.586-2.65A1 1 0 009 9.382v5.236a1 1 0 001.166.964l4.586-1.192a1 1 0 000-1.922z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-300 italic">
            Trailer in arrivo...
          </div>
        </div>
      </section>

      {/* CARATTERISTICHE */}
      <section className="bg-[#121212] py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-yellow-300">{t('featuresTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left text-gray-300">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">🗺️ {t('feature1')}</h3>
            <p>Esplora dungeon generati proceduralmente pieni di misteri e trappole.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">🃏 {t('feature2')}</h3>
            <p>Costruisci il tuo mazzo per affrontare ogni situazione con strategia.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">🧙 {t('feature3')}</h3>
            <p>Crea eroi epici con abilità uniche e background coinvolgenti.</p>
          </div>
        </div>
      </section>

      {/* COMPARAZIONE FREE VS PREMIUM */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300">Free vs Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-yellow-400">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">🌱 {t('free')}</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Personaggio casuale</li>
              <li>Accesso base ai dungeon</li>
              <li>Progressione limitata</li>
              <li>Inventario annotabile</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-yellow-500">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">🌟 {t('premium')}</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Creazione personaggio avanzata</li>
              <li>Razze e classi sbloccate</li>
              <li>Dungeon e missioni esclusive</li>
              <li>Ricompense leggendarie</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MAILING LIST */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#0d1a26] to-[#1a2a33]">
        <h2 className="text-3xl font-bold mb-4 text-white">{t('newsletterTitle')}</h2>
        <p className="text-gray-400 mb-6">{t('newsletterDesc')}</p>
        <div className="flex justify-center flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="La tua email"
            className="px-4 py-3 rounded-lg w-full sm:w-2/3 bg-white text-black"
          />
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition w-full sm:w-auto">
            Iscriviti
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-center py-6 text-gray-500">
        <p>© 2025 Mini muuu. Un mondo creato con magia e codice.</p>
      </footer>
    </div>
  );
}