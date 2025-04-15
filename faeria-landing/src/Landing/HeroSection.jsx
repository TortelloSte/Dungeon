import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


export default function HeroSection({ trackEvent }) {
  const { t } = useTranslation();

  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-gradient-to-b from-black/80 via-black/40 to-[#0f0f0f]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl"
      >
        {/* Titolo */}
        <h1 className="font-cinzel text-5xl md:text-6xl font-bold text-yellow-300 drop-shadow-lg">
          {t("heroTitle")}
        </h1>

        {/* Sottotitolo */}
        <p className="text-xl md:text-2xl mt-4 text-gray-200">
          {t("heroSubtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center px-6 sm:px-0">
          <Link to="/beta">
            <CTAButton
              onClick={() => trackEvent("Partecipa alla Beta")}
              text={t("cta")}
              type="primary"
            />
          </Link>
          <CTAButton
            onClick={() => scrollToElement("trailer")}
            text={t("watchTrailer")}
            type="outline"
          />
        </div>

        {/* Scroll Icon */}
        <div className="mt-12 flex justify-center relative z-10">
          <button
            onClick={() => scrollToElement("features")}
            className="animate-bounce text-yellow-300 hover:text-yellow-400 transition"
            aria-label={t("scrollDown")}
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
  );
}

function CTAButton({ onClick, text, type = "primary" }) {
  const baseClasses =
    "relative group font-bold py-3 px-6 rounded-lg shadow-xl transition w-full sm:w-auto";
  const primaryClasses =
    "bg-yellow-500 hover:bg-yellow-400 text-black";
  const outlineClasses =
    "border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-300";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${type === "primary" ? primaryClasses : outlineClasses}`}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-yellow-200 opacity-0 group-hover:opacity-20 transition rounded-lg" />
    </button>
  );
}
