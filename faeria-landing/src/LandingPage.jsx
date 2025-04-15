import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "./Landing/HeroSection";
import PremiumComparison from "./Landing/PremiumComparison";
import FeaturesBlock from "./Landing/FeaturesBlock";
import NewsletterForm from "./Landing/NewsletterForm";
import TrailerSection from "./Landing/TrailerSection";
import Navbar from "./Landing/Navbar";
import CookieConsent from "react-cookie-consent";
import ChatbotWidget from "./Landing/ChatbotWidget";
import FeaturesSection from "./Landing/FeaturesSection";
import Footer from "./Footer";


export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  const [showModal, setShowModal] = useState(null);
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
      <HeroSection trackEvent={trackEvent} />

      {/* COS'É DUNGEON CRAWLER */}
      <FeaturesSection />

      {/* TRAILER */}
      <TrailerSection />

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
        <h2 id="newsletterTitle" className="text-3xl font-bold mb-4 text-white">
          {t("newsletterTitle")}
        </h2>
        <p className="text-gray-400 mb-6">{t("newsletterDesc")}</p>
        <NewsletterForm />
      </section>

      {/* FOOTER */}
      <Footer setShowModal={setShowModal} />

      {/* COOKIE BANNER */}
      <CookieConsent
        location="bottom"
        buttonText={t("cookie.accept")}
        cookieName="notminicrawler_cookies"
        style={{
          background: "#111",
          color: "#ccc",
          padding: "1rem",
          maxWidth: "100%",
          boxSizing: "border-box",
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
        buttonStyle={{
          background: "#facc15",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "8px 16px",
        }}
        contentClasses="text-sm"
        expires={365}
        sameSite="strict"
        role="dialog"
        aria-live="polite"
      >
        {t("cookie.message")}{" "}
        <button
          onClick={() => setShowModal("privacy")}
          className="underline text-yellow-400 hover:text-yellow-300 transition"
          type="button"
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
