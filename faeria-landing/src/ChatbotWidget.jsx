import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const faq = [
    { question: t("chat.faq1.q"), answer: t("chat.faq1.a") },
    { question: t("chat.faq2.q"), answer: t("chat.faq2.a") },
    { question: t("chat.faq3.q"), answer: t("chat.faq3.a") },
    { question: t("chat.faq4.q"), answer: t("chat.faq4.a") },
    { question: t("chat.faq5.q"), answer: t("chat.faq5.a") },
  ];

  const bannedWords = ["cazzo", "merda", "fuck", "shit", "bastard", "stronzo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return setError(t("chat.errors.invalidEmail"));
    }

    const hasBadWords = bannedWords.some((word) =>
      formData.message.toLowerCase().includes(word),
    );
    if (hasBadWords) {
      return setError(t("chat.errors.badWords"));
    }

    setSubmitted(true);
    setFormData({ name: "", surname: "", email: "", message: "" });
  };

  return (
    <div className="fixed right-4 bottom-6 sm:bottom-8 md:bottom-10 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-[#111] text-gray-200 p-4 rounded-xl w-80 shadow-xl mb-3"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-yellow-400">{t("chat.title")}</h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedFaq(null);
                    setShowContactForm(false);
                    setSubmitted(false);
                    setError("");
                  }}
                  className="text-yellow-400"
                >
                  ✕
                </button>
              </div>
              {!selectedFaq && !showContactForm ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 mb-2">
                    {t("chat.choose")}
                  </p>
                  {faq.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFaq(item)}
                      className="block w-full text-left text-sm bg-gray-800 hover:bg-yellow-500 hover:text-black p-2 rounded-lg transition"
                    >
                      {item.question}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="block w-full text-left text-sm bg-yellow-700 hover:bg-yellow-500 hover:text-black p-2 rounded-lg transition mt-2"
                  >
                    {t("chat.otherQuestions")}
                  </button>
                </div>
              ) : selectedFaq ? (
                <div>
                  <p className="text-yellow-300 text-sm font-semibold mb-1">
                    {selectedFaq.question}
                  </p>
                  <p className="text-sm text-gray-300 mb-4">
                    {selectedFaq.answer}
                  </p>
                  <button
                    onClick={() => setSelectedFaq(null)}
                    className="text-xs text-yellow-400 underline hover:text-yellow-300"
                  >
                    {t("chat.back")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2 text-sm">
                  <input
                    type="text"
                    placeholder={t("chat.form.name")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("chat.form.surname")}
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData({ ...formData, surname: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  />
                  <input
                    type="email"
                    placeholder={t("chat.form.email")}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  />
                  <textarea
                    placeholder={t("chat.form.message")}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    rows={3}
                    required
                  />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                  {submitted && (
                    <p className="text-green-400 text-xs">
                      {t("chat.form.success")}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
                    >
                      {t("chat.form.send")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="text-xs text-yellow-400 underline hover:text-yellow-300"
                    >
                      {t("chat.back")}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          💬 {t("chat.label")}
        </motion.button>
      </div>
    </div>
  );
}
