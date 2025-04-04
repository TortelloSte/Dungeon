import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PremiumComparison from './PremiumComparison';
import FeaturesBlock from './FeaturesBlock';
import NewsletterForm from './NewsletterForm';
import Navbar from './Navbar';

export default function LandingPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans scroll-smooth">
      <Navbar />
      {/* HERO */}
      <section id="top" className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-cover bg-center"
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
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-xl transition">
                {t('cta')}
              </button>
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById('trailer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-300 font-bold py-3 px-6 rounded-lg transition"
            >
              {t('watchTrailer') || 'Guarda il trailer'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* COS'É DUNGEON CRAWLER */}
      <section id="features" className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 text-yellow-300" data-aos="fade-up">{t('whatIsTitle')}</h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-3" data-aos="fade-up">{t('Testo1')} </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-3" data-aos="fade-up" >{t('Testo2')}</p>
        <p className="text-lg text-gray-300 leading-relaxed italic" data-aos="fade-up">{t('Testo3')}</p>
        <p className="text-lg text-gray-300 leading-relaxed italic" data-aos="fade-up">{t('Testo7')}</p>
        <p className="text-lg text-gray-300 leading-relaxed italic" data-aos="fade-up">{t('Testo8')}</p>
        <p className="text-lg text-gray-300 leading-relaxed italic" data-aos="fade-up">{t('Testo9')}</p>
      </section>

      {/* TRAILER */}
      <section id="trailer" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300">{t('trailerTitle')}</h2>

        <div className="relative w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
          <video
            className="w-full rounded-lg shadow-lg"
            controls
            preload="auto"
            poster="/images/trailer-cover.jpg"
          >
            <source src="/video/tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <p className="mt-4 text-sm text-gray-400 italic">
          {t('trailerNote') || 'Attiva l’audio e immergiti nella leggenda.'}
        </p>

      </section>


      {/* CARATTERISTICHE */}
      <FeaturesBlock />

      {/* COMPARAZIONE FREE VS PREMIUM */}
      <section id="premium">
        <PremiumComparison />
      </section>

      {/* MAILING LIST */}
      <section id="newsletter" className="py-20 px-6 text-center bg-gradient-to-r from-[#0d1a26] to-[#1a2a33]">
        <h2 className="text-3xl font-bold mb-4 text-white">{t('newsletterTitle')}</h2>
        <p className="text-gray-400 mb-6">{t('newsletterDesc')}</p>
        <NewsletterForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-center py-6 text-gray-500 text-sm">
        <p>© 2025 Mini muuu. Un mondo creato con magia e codice.</p>
        <div className="mt-2 space-x-2">
          <a href="https://kickstarter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            Kickstarter
          </a>
          <span>·</span>
          <a href="https://minimuuu.it" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
            MiniMuuu.it
          </a>
        </div>
      </footer>

    </div>
  );
}