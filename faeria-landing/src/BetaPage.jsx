import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BetaSignupForm from "./BetaSignupForm";

export default function BetaPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400">{t("Coming")}</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-xl">{t("betaDesc")}</p>

      <BetaSignupForm />

      <Link
        to="/"
        className="mt-10 inline-block text-yellow-400 hover:text-yellow-300 transition text-sm"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
