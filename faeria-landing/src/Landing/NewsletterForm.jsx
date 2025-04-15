import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { supabase } from "../supabaseClient";

const commonDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "protonmail.com",
  "libero.it",
  "virgilio.it",
  "fastwebnet.it",
  "live.com",
  "tiscali.it",
  "zoho.com",
  "gmx.com",
  "mail.com",
];

export default function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [status, setStatus] = useState("idle");
  const [isLiveInvalid, setIsLiveInvalid] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const domain = email.split("@")[1];
    return (
      emailRegex.test(email) &&
      domain &&
      commonDomains.includes(domain.toLowerCase())
    );
  };

  useEffect(() => {
    setIsLiveInvalid(email.length > 5 && !isValidEmail(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedPrivacy) return setStatus("noPrivacy");
    if (!isValidEmail(email)) return setStatus("invalid");

    setStatus("loading");
    const { error } = await supabase.from("newsletter").insert([{ email }]);

    if (error) {
      if (
        error.message.includes("duplicate") ||
        error.message.includes("already exists") ||
        error.code === "23505"
      ) {
        setStatus("exists");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("success");
      setEmail("");
      setAcceptedPrivacy(false);
    }
  };

  const statusMessages = {
    success: t("newsletter.success"),
    error: t("newsletter.error"),
    exists: t("newsletter.exists"),
    invalid: t("newsletter.invalid"),
    noPrivacy: t("newsletter.noPrivacy"),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4 text-left"
      autoComplete="off"
      aria-labelledby="newsletterTitle"
    >
      {/* Email input + Submit */}
      <div className="flex flex-col sm:flex-row w-full gap-3">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          required
          aria-invalid={isLiveInvalid}
          aria-describedby="newsletter-feedback"
          placeholder={t("newsletter.placeholder") || "La tua email"}
          className={`flex-grow px-4 py-3 rounded-lg bg-white text-black border ${
            isLiveInvalid ? "border-red-500" : "border-transparent"
          } transition`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition"
        >
          {status === "loading"
            ? t("newsletter.loading")
            : t("newsletter.submit")}
        </button>
      </div>

      {/* Privacy checkbox */}
      <div className="flex items-start gap-2 text-sm text-gray-300">
        <input
          id="newsletter-consent"
          type="checkbox"
          checked={acceptedPrivacy}
          onChange={(e) => {
            setAcceptedPrivacy(e.target.checked);
            setStatus("idle");
          }}
          className="mt-1 form-checkbox h-4 w-4 text-yellow-500 rounded"
          required
        />
        <label htmlFor="newsletter-consent" className="leading-snug">
          <Trans
            i18nKey="newsletter.privacyText"
            components={[
              <button
                key="privacy-link"
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-privacy-modal"))
                }
                className="underline text-yellow-400 hover:text-yellow-300"
              />,
            ]}
          />
        </label>
      </div>

      {/* Feedback message */}
      <div
        id="newsletter-feedback"
        className="mt-1 min-h-[20px] text-sm text-left text-red-400"
      >
        {status !== "idle" && statusMessages[status] && (
          <p
            className={
              status === "success"
                ? "text-green-400"
                : status === "exists"
                  ? "text-yellow-400"
                  : "text-red-400"
            }
          >
            {statusMessages[status]}
          </p>
        )}
      </div>
    </form>
  );
}
