import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PremiumComparison from "./PremiumComparison";
import FeaturesBlock from "./FeaturesBlock";
import NewsletterForm from "./NewsletterForm";
import Navbar from "./Navbar";
import CookieConsent from "react-cookie-consent";
import ChatbotWidget from "./ChatbotWidget";
import { useEffect } from "react";

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const trackEvent = (goal) => {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(goal);
    }
  };

  useEffect(() => {
    const handleOpenPrivacyModal = () => setShowModal("privacy");
    window.addEventListener("open-privacy-modal", handleOpenPrivacyModal);

    return () => {
      window.removeEventListener("open-privacy-modal", handleOpenPrivacyModal);
    };
  }, []);

  return (
    <div className="pt-20 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white font-sans scroll-smooth">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section
        id="top"
        className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-[#0f0f0f]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-2xl"
        >
          <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg">
            {t("heroTitle")}
          </h1>

          <p className="text-xl md:text-2xl mt-4 text-gray-200">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center px-6 sm:px-0">
            <Link to="/beta">
              <button
                onClick={() => trackEvent("Partecipa alla Beta")}
                className="relative group bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-xl transition w-full sm:w-auto"
              >
                <span className="relative z-10">{t("cta")}</span>
                <span className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition rounded-lg" />
              </button>
            </Link>

            <button
              onClick={() => {
                const el = document.getElementById("trailer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative group border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-300 font-bold py-3 px-6 rounded-lg shadow-xl transition w-full sm:w-auto"
            >
              <span className="relative z-10">{t("watchTrailer")}</span>
              <span className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition rounded-lg" />
            </button>
          </div>

          <div className="mt-12 flex justify-center relative z-10">
            <button
              onClick={() => {
                const el = document.getElementById("features");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="animate-bounce text-yellow-300 hover:text-yellow-400 transition"
              aria-label="Scroll down"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* COS'É DUNGEON CRAWLER */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* TESTO */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-3xl font-bold mb-6 text-yellow-300 font-cinzel">
              {t("whatIsTitle")}
            </h2>
            {[1, 2, 3, 7, 8, 9].map((n) => (
              <p
                key={n}
                className="text-base md:text-lg text-gray-300 leading-relaxed mb-4"
              >
                {t(`Testo${n}`)}
              </p>
            ))}
          </div>

          {/* IMMAGINI CON ANIMAZIONE */}
          <div className="-mt-20 md:w-1/2 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.img
              src="/images/world1.jpg"
              alt="Fantasy World 1"
              className="rounded-lg shadow-lg w-full sm:w-1/2 -mb-12"
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: -1.5,
                transition: { type: "spring", stiffness: 120 },
              }}
            />
            <motion.img
              src="/images/world2.jpg"
              alt="Fantasy World 2"
              className="rounded-lg shadow-lg w-full sm:w-1/2"
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: 1.5,
                transition: { type: "spring", stiffness: 120 },
              }}
            />
          </div>
        </div>
      </section>

      {/* TRAILER */}
      <section
        id="trailer"
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 w-full h-screen bg-gradient-to-b from-black via-black to-transparent flex items-center justify-center z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-5xl w-full"
          >
            <div className="relative w-full shadow-xl rounded-2xl overflow-hidden border-2 border-yellow-500">
              <video
                className="w-full h-auto rounded-2xl"
                controls
                preload="auto"
                poster="/images/trailer-cover.jpg"
              >
                <source src="/video/tutorial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CARATTERISTICHE */}
      <FeaturesBlock />

      {/* COMPARAZIONE FREE VS PREMIUM */}
      <section id="premium">
        <PremiumComparison />
      </section>

      {/* MAILING LIST */}
      <section
        id="newsletter"
        className="py-20 px-6 text-center bg-gradient-to-r from-[#0d1a26] to-[#1a2a33]"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">
          {t("newsletterTitle")}
        </h2>
        <p className="text-gray-400 mb-6">{t("newsletterDesc")}</p>
        <NewsletterForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-500 text-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          {/* Copyright */}
          <p className="shrink-0">
            © {year} Mini muuu. {t("footer.rights")}
          </p>

          {/* Link */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
            <a
              href="https://kickstarter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              Kickstarter
            </a>
            <span>·</span>
            <a
              href="https://minimuuu.it"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition"
            >
              MiniMuuu.it
            </a>
            <span>·</span>
            <button
              onClick={() => setShowModal("privacy")}
              className="hover:text-yellow-400"
            >
              {t("footer.privacy")}
            </button>
            <span>·</span>
            <button
              onClick={() => setShowModal("contatti")}
              className="hover:text-yellow-400"
            >
              {t("footer.contact")}
            </button>
          </div>
        </div>
      </footer>
      {/* COOKIE BANNER */}
      <CookieConsent
        location="bottom"
        buttonText={t("cookie.accept")}
        cookieName="notminicrawler_cookies"
        style={{ background: "#111", color: "#ccc" }}
        buttonStyle={{
          background: "#facc15",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "8px 16px",
        }}
        expires={365}
        enableDeclineButton={false}
        sameSite="strict"
      >
        {t("cookie.message")}{" "}
        <button
          onClick={() => setShowModal("privacy")}
          className="underline text-yellow-400"
        >
          {t("cookie.link")}
        </button>
      </CookieConsent>

      {/* CHATBOT */}
      <ChatbotWidget />

      {/* MODAL DOCUMENTI */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] text-gray-200 p-6 rounded-lg max-w-xl w-full relative">
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-2 right-2 text-yellow-400 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-yellow-300">
              {t(`footer.${showModal}`)}
            </h2>
            <p className="text-sm leading-relaxed">{t(`modal.${showModal}`)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
