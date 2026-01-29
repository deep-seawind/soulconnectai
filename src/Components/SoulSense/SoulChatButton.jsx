import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi"; 

const SoulChatButton = ({ onClick }) => {
  const [index, setIndex] = useState(0);
  const messages = [
    "Feeling lonely?",
    "Need to vent?",
    "Share a secret",
    "How's your heart?",
    "Talk to Soul",
  ];
 
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-30 right-8 z-60 flex items-center gap-4">
      {/* 1. DYNAMIC MESSAGE BUBBLE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex flex-col items-end absolute right-20 bottom-15"
      >
        <div className="bg-white  backdrop-blur-xl border border-slate-100 px-5 py-3 rounded-[1.8rem] rounded-br-none shadow-2xl shadow-indigo-100/50 relative">
          <div className="h-5 overflow-hidden w-32">
            <AnimatePresence mode="wait">
              <motion.span
                key={messages[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="block text-sm font-bold text-indigo-600 whitespace-nowrap"
              >
                {messages[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 2. THE RADIANT ORB BUTTON */}
      <div className="relative">
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group w-20 h-20 flex items-center justify-center rounded-full bg-slate-950 text-white shadow-2xl overflow-hidden"
        >
          {/* Shimmer Sweep */}
          <motion.div
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          />

          <div className="relative z-10">
            <FiMessageCircle
              size={32}
              className="group-hover:rotate-15 transition-transform duration-500"
            />
          </div>
 
          <span className="absolute top-5 right-5 w-3.5 h-3.5 bg-emerald-400 border-[3px] border-slate-950 rounded-full" />
        </motion.button>
      </div>
    </div>
  );
};

export default SoulChatButton;
