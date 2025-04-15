import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer({ setShowModal }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
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
  );
}
