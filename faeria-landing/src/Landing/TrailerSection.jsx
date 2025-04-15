import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TrailerSection() {
  return (
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
              {("videotexts")}
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
