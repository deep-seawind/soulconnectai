import React, { useState } from "react";
import { motion } from "framer-motion";
import SoulSenseChat from "../../SoulSense/SoulChatBot";

const SoulIntro = ({ onStart,profileData }) => {
  const [gender, setGender] = useState(null);

  const handleStart = () => {
    if (!gender) return;
    localStorage.setItem("gender", gender);
    onStart(gender);
  };

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-6">
      {/* SINGLE LIGHT CONTAINER ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* TITLE */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 leading-tight">
          Let’s discover your perfect{" "}
          <span className="italic text-white">connection</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-800 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
          A space where intuition meets intention. Answer a few thoughtful
          questions to reveal a match that truly resonates.
        </p>

        {/* GENDER SELECT */}
        <div className="flex justify-center gap-6 mb-12">
          {["Male", "Female"].map((item) => (
            <button
              key={item}
              onClick={() => setGender(item)}
              className={`px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200
                ${
                  gender === item
                    ? "bg-black text-white scale-105 shadow-lg"
                    : "bg-white text-black border border-black/20 hover:scale-105"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* START BUTTON */}
        <button
          disabled={!gender}
          onClick={handleStart}
          className={`relative px-12 py-5 rounded-full font-bold text-lg transition-all duration-300
            ${
              gender
                ? "bg-black text-white hover:bg-[#d4af37]"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
        >
          {gender ? "Start Your Journey" : "Select Gender First"}
        </button>
      </motion.div> 
    </div>
  );
};

export default SoulIntro;
