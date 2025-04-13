import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "./supabaseClient";

export default function BetaSignupForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | duplicate
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Verifica se l'email è già presente nella tabella beta_signups
    const { data: existing } = await supabase
      .from("beta_signups")
      .select("email")
      .eq("email", email);

    if (existing && existing.length > 0) {
      setStatus("duplicate");
      return;
    }

    const { error } = await supabase.from("beta_signups").insert([{ email }]);

    if (error) {
      setStatus("error");
      setErrorMessage(t("beta.error"));
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <input
          type="email"
          required
          placeholder={t("beta.placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-white text-black text-sm h-12 w-full"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-w-fit px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg text-sm h-12 transition"
        >
          {status === "loading" ? "..." : t("beta.submit")}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        {status === "success" && (
          <p className="text-green-400">{t("beta.success")}</p>
        )}
        {status === "duplicate" && (
          <p className="text-yellow-400">{t("beta.duplicate")}</p>
        )}
        {status === "error" && (
          <p className="text-red-400">{errorMessage || t("beta.error")}</p>
        )}
      </div>
    </div>
  );
}
