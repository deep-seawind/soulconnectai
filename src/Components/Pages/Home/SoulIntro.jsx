import React from "react";
import { motion } from "framer-motion";

const SoulIntro = ({ onStart }) => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-6 leading-tight">
          {" "}
          Let’s discover your perfect{" "}
          <span className="italic text-white">connection</span>{" "}
        </h1>{" "}
        <p className="text-slate-800 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
          {" "}
          A space where intuition meets intention. Answer a few thoughtful
          questions to reveal a match that truly resonates.{" "}
        </p>
        <button
          onClick={onStart}
          className="relative px-12 py-5 rounded-full font-bold text-lg cursor-pointer bg-color"
        >
          Sign Up & Begin
        </button>
      </motion.div>
    </div>
  );
};

export default SoulIntro;
