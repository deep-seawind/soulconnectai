import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SoulLogin = ({ onBack, onSuccess }) => {
  const [contact, setContact] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const isPhone = /^\d+$/.test(contact);  

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Glow Background */}
      <div className="absolute -inset-1 bg-linear-to-r from-[#d4af37]/20 to-amber-200/20 blur-2xl rounded-[3rem]" />

      <div className="relative bg-white backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <header className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            {showOTP ? "Verify Soul" : "Welcome"}
          </h2>
          <p className="text-slate-500 font-medium">
            {showOTP
              ? `Enter the code sent to ${contact}`
              : "Login with email or mobile number"}
          </p>
        </header>

        {/* Input */}
        <div className="space-y-8">
          {!showOTP ? (
            <div className="group relative flex items-end gap-2">
              {/* Country Code (ONLY for phone) */}
              {isPhone && (
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-10 bg-transparent border-b-2 border-slate-200 text-lg font-medium focus:border-[#d4af37] outline-none"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
              )}

              <div className="relative flex-1">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value.trim())}
                  className="peer w-full bg-transparent border-b-2 border-slate-200 py-2 text-lg outline-none transition-all focus:border-[#d4af37]"
                  placeholder=" "
                />
                <label
                  className="absolute left-0 top-2 text-slate-400 pointer-events-none 
                    peer-focus:-top-4 peer-focus:text-sm peer-focus:text-[#d4af37]
                    peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
                >
                  Email or Mobile Number
                </label>
              </div>
            </div>
          ) : (
            // OTP Step
            <div className="flex flex-col items-center">
              <div className="flex gap-3 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength="1"
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#d4af37] outline-none"
                  />
                ))}
              </div>
              <button className="mt-4 text-xs font-bold text-[#d4af37] uppercase tracking-widest">
                Resend Code
              </button>
            </div>
          )}
        </div>

        {/* Google Button */}
        {!showOTP && (
          <button className="mt-8 w-full py-3 rounded-full border border-slate-200 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
            <FcGoogle size={22} />
            Continue with Google
          </button>
        )}

        {/* Actions */}
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={showOTP ? () => setShowOTP(false) : onBack}
            className="text-sm font-semibold text-slate-400 hover:text-slate-800"
          >
            ← Back
          </button>

          <button
            onClick={showOTP ? onSuccess : () => setShowOTP(true)}
            className="px-10 py-4 bg-black text-white rounded-full font-bold cursor-pointer bg-color transition-all"
          >
            {showOTP ? "Verify" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoulLogin;
