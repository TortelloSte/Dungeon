import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PremiumComparison from './PremiumComparison';
import FeaturesBlock from './FeaturesBlock';
import NewsletterForm from './NewsletterForm';
import Navbar from './Navbar';
import CookieConsent from 'react-cookie-consent';
import ChatbotWidget from './ChatbotWidget';


export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(null); // 'privacy' | 'terms' | 'contatti' | null
  const trackEvent = (goal) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(goal);
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans scroll-smooth">
      <Navbar />

      {/* HERO */}
      <section id="top" className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
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
            <Link to="/beta">
              <button onClick={() => trackEvent('Partecipa alla Beta')}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-xl transition w-full sm:w-auto">
                {t('cta')}
              </button>
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById('trailer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-300 font-bold py-3 px-6 rounded-lg shadow-xl transition w-full sm:w-auto"
            >
              {t('watchTrailer')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* COS'É DUNGEON CRAWLER */}
      <section id="features" className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-yellow-300" data-aos="fade-up">{t('whatIsTitle')}</h2>
        {[1,2,3,7,8,9].map(n => (
          <p key={n} className="text-lg text-gray-300 leading-relaxed mb-3" data-aos="fade-up">
            {t(`Testo${n}`)}
          </p>
        ))}
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
        <p className="mt-4 text-sm text-gray-400 italic">{t('trailerNote')}</p>
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
        <p>© {year} Mini muuu. {t('footer.rights')}</p>
        <div className="mt-2 space-x-2">
          <a href="https://kickstarter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">Kickstarter</a>
          <span>·</span>
          <a href="https://minimuuu.it" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">MiniMuuu.it</a>
          <span>·</span>
          <button onClick={() => setShowModal('privacy')} className="hover:text-yellow-400">{t('footer.privacy')}</button>
          <span>·</span>
          <button onClick={() => setShowModal('contatti')} className="hover:text-yellow-400">{t('footer.contact')}</button>
        </div>
      </footer>

      {/* COOKIE BANNER */}
      <CookieConsent
        location="bottom"
        buttonText={t('cookie.accept')}
        cookieName="notminicrawlerCookies"
        style={{ background: '#1f1f1f', color: '#eee', fontSize: '14px' }}
        buttonStyle={{ background: '#facc15', color: '#000', fontWeight: 'bold', borderRadius: '8px', padding: '6px 16px' }}
        expires={0} // <- questo lo forza a mostrarsi ad ogni nuova sessione
        disableCookies={true} // <- disabilita il salvataggio del cookie
      >
        {t('cookie.message')} <Link to="/privacy" className="underline text-yellow-400">{t('cookie.link')}</Link>.
      </CookieConsent>

      {/* CHATBOT */}
        <ChatbotWidget />


      {/* MODAL DOCUMENTI */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] text-gray-200 p-6 rounded-lg max-w-xl w-full relative">
            <button onClick={() => setShowModal(null)} className="absolute top-2 right-2 text-yellow-400 text-xl">✕</button>
            <h2 className="text-xl font-bold mb-4 text-yellow-300">{t(`footer.${showModal}`)}</h2>
            <p className="text-sm leading-relaxed">
              {t(`modal.${showModal}`)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}