import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SoulLogin = ({ onBack, onSuccess }) => {
  const [contact, setContact] = useState("");
  const [showOTP, setShowOTP] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-[#d4af37]/20 to-amber-200/20 blur-2xl rounded-[3rem]" />

      <div className="relative bg-white  backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        
        <header className="text-center mb-10">
          <motion.h2 
            key={showOTP ? "otp-head" : "login-head"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-2"
          >
            {showOTP ? "Verify Soul" : "Welcome"}
          </motion.h2>
          <p className="text-slate-500 font-medium">
            {showOTP ? `Enter the code sent to ${contact}` : "Login via OTP to continue"}
          </p>
        </header>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {!showOTP ? (
              /* Step 1: Email or Mobile */
              <motion.div 
                key="input-step"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="group relative"
              >
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="peer w-full bg-transparent border-b-2 border-slate-200 py-2 text-lg outline-none transition-all focus:border-[#d4af37]"
                  placeholder=" "
                />
                <label className="absolute left-0 top-2 text-slate-400 pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#d4af37] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm">
                  Email or Mobile Number
                </label>
              </motion.div>
            ) : (
              /* Step 2: OTP Input */
              <motion.div 
                key="otp-step"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center"
              >
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4].map((i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#d4af37] focus:bg-white outline-none transition-all"
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setShowOTP(false)}
                  className="mt-4 text-xs font-bold text-[#d4af37] uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  Resend Code
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={showOTP ? () => setShowOTP(false) : onBack}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-800 transition-all group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
          </button>

          <button
            onClick={showOTP ? onSuccess : () => setShowOTP(true)}
            className="relative px-10 py-4 bg-black text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
          >
            <span className="relative z-10">
              {showOTP ? "Verify" : "Get OTP"}
            </span>
              <div className="absolute inset-0 bg-color translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SoulLogin;