import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoHeart } from "react-icons/io5";

const HeartButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.button
      onClick={() => setIsLiked(!isLiked)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className={`
        relative w-20 h-20 flex items-center justify-center rounded-[2.2rem] 
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden shadow-2xl
        ${
          isLiked
            ? "bg-linear-to-br from-rose-500 via-red-600 to-red-700 border-transparent shadow-red-200"
            : "bg-white border border-slate-100 shadow-slate-200/50"
        }
      `}
    > 
      <AnimatePresence>
        {isLiked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-red-400 blur-2xl"
          />
        )}
      </AnimatePresence>
 
      {!isLiked && (
        <motion.div
          whileHover={{ y: 0 }}
          initial={{ y: "100%" }}
          className="absolute inset-0 bg-red-50 transition-all duration-500"
        />
      )}
 
      <motion.div
        key={isLiked ? "liked" : "unliked"}
        initial={{ scale: 0.3 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
        }}
        className="relative z-10"
      >
        <IoHeart
          className={`
            w-9 h-9 drop-shadow-sm transition-colors duration-500
            ${isLiked ? "text-white" : "text-slate-300 hover:text-red-500"}
          `}
        />
      </motion.div>
 
      <AnimatePresence>
        {isLiked && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 40 + 20),
                  y: (i < 3 ? 1 : -1) * (Math.random() * 40 + 20),
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-200 rounded-full blur-[0.5px]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default HeartButton;
