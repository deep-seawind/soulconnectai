import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowLeft, HiOutlineSupport } from "react-icons/hi";

const NotFound = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50">
      
      {/* 1. SoluConnect AI Ambient Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={reduceMotion ? {} : { opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-linear-to-br from-indigo-500/20 to-transparent blur-[120px]" 
        />
        <motion.div 
          animate={reduceMotion ? {} : { opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-linear-to-tl from-rose-500/20 to-transparent blur-[120px]" 
        />
      </div>

      {/* 2. Main Content Card */}
      <motion.div
        className="relative max-w-xl w-full px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* The "AI Shadow" Layer */}
        <div className="absolute inset-0 -z-10 rounded-[2.8rem] bg-linear-to-br from-indigo-500/10 via-transparent to-rose-500/10 blur-3xl" />

        {/* Reply-style Surface */}
        <div className="relative bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.08)] text-center">
          
          {/* Large Error Indicator */}
          <div className="relative mb-8">
            <h1 className="text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-slate-900 to-slate-400">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -z-10" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-4">
            Signal Lost
          </h2>
          
          <p className="text-slate-500 mb-10 leading-relaxed max-w-sm mx-auto">
            The path <code className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-mono text-sm">{location.pathname}</code> leads to a dead end. 
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3.5 bg-color text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                <HiOutlineArrowLeft />
                Home
              </motion.button>
            </Link>

            <Link to="/support" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ backgroundColor: "rgba(241, 245, 249, 1)" }}
                className="w-full px-8 py-3.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <HiOutlineSupport />
                Support
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </span>
          <span>Node: FRA-01</span>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;