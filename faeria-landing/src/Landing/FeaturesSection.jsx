import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const texts = [1, 2, 3, 7, 8, 9].map((n) => t(`Testo${n}`));
  const images = [
    {
      src: "/images/world1.jpg",
      alt: "Fantasy World 1",
      motionProps: { rotate: -1.5 },
    },
    {
      src: "/images/world2.jpg",
      alt: "Fantasy World 2",
      motionProps: { rotate: 1.5 },
    },
  ];

  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* TESTO */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl font-bold mb-6 text-yellow-300 font-cinzel">
            {t("whatIsTitle")}
          </h2>
          {texts.map((text, idx) => (
            <p
              key={idx}
              className="text-base md:text-lg text-gray-300 leading-relaxed mb-4"
            >
              {text}
            </p>
          ))}
        </div>

        {/* IMMAGINI */}
        <div className="md:w-1/2 flex flex-col sm:flex-row gap-6 justify-center items-center">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              className="w-4/5 sm:w-1/2 max-w-xs"
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: img.motionProps.rotate,
                transition: { type: "spring", stiffness: 120 },
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
