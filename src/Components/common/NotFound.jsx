import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlineGlobeAlt,
  HiOutlineLightningBolt,
} from "react-icons/hi";

const NotFound = () => {
  const location = useLocation(); 
  const reduceMotion = useReducedMotion(); // respects user prefers-reduced-motion

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* 1. Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Orb 1 */}
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, 50, 0],
                  y: [0, 25, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-72 h-72 bg-[#0e5da0]/20 rounded-full blur-[120px] will-change-transform"
        />

        {/* Orb 2 */}
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                  x: [0, -60, 0],
                  y: [0, -80, 0],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-112.5 h-112.5 bg-indigo-500/10 rounded-full blur-[150px] will-change-transform"
        />

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff10 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Text */}
          <div className="relative inline-block">
            <motion.h1
              animate={reduceMotion ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[12rem] md:text-[18rem] font-semibold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 select-none"
            >
              404
            </motion.h1>
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto -mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Signal Lost in Transmission
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              The route{" "}
              <code className="text-[#0e5da0] bg-[#0e5da0]/10 px-2 py-0.5 rounded font-mono text-sm">
                {location.pathname}
              </code>{" "}
              doesn't exist. It looks like this market has been delisted or
              moved.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: reduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: reduceMotion ? 1 : 0.95 }}
                  className="px-8 py-4 bg-[#0e5da0] text-white rounded-2xl font-semibold flex items-center gap-3 shadow-[0_20px_40px_rgba(14,93,160,0.3)] hover:shadow-[0_25px_50px_rgba(14,93,160,0.5)] transition-all"
                >
                  <HiOutlineArrowLeft className="text-xl" />
                  Return to Dashboard
                </motion.button>
              </Link>

              <Link to="/support">
                <motion.button
                  whileHover={{
                    backgroundColor: reduceMotion
                      ? "transparent"
                      : "rgba(255,255,255,0.05)",
                  }}
                  className="px-8 py-4 bg-transparent border border-slate-700 text-slate-300 rounded-2xl font-semibold transition-colors"
                >
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Terminal Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex items-center justify-center gap-8 text-slate-600 font-mono text-xs uppercase tracking-[0.2em]"
        >
          <div className="flex items-center gap-2">
            <HiOutlineGlobeAlt className="text-lg" />
            <span>Server: Frankfurt-01</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-lg" />
            <span>Latency: 12ms</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Prices */}
      <FloatingPrice
        label="EUR/USD"
        price="1.0842"
        top="20%"
        left="15%"
        reduceMotion={reduceMotion}
      />
      <FloatingPrice
        label="BTC/USD"
        price="64,210"
        top="60%"
        right="10%"
        color="#f59e0b"
        reduceMotion={reduceMotion}
      />
    </div>
  );
};

// Optimized Floating Price
const FloatingPrice = ({
  label,
  price,
  top,
  left,
  right,
  color = "#0e5da0",
  reduceMotion,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={reduceMotion ? {} : { opacity: [0.1, 0.3, 0.1], y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
    style={{ top, left, right, position: "absolute" }}
    className="hidden lg:block p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md will-change-transform"
  >
    <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1">
      {label}
    </div>
    <div className="font-mono font-semibold" style={{ color }}>
      {price}
    </div>
  </motion.div>
);

export default NotFound;
