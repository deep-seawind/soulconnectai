import React from "react";
import { motion } from "framer-motion";

/* ==================== PHONE INPUT COMPONENT ==================== */
export const PhoneInput = ({ value, countryCode, onValueChange, onCountryCodeChange, placeholder, autoFocus }) => {
  return (
    <div className="flex gap-2">
      <select
        value={countryCode}
        onChange={(e) => onCountryCodeChange(e.target.value)}
        className="w-24 text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none bg-transparent"
      >
        <option value="+91">🇮🇳 +91</option>
        <option value="+1">🇺🇸 +1</option>
        <option value="+44">🇬🇧 +44</option>
        <option value="+61">🇦🇺 +61</option>
        <option value="+86">🇨🇳 +86</option>
        <option value="+81">🇯🇵 +81</option>
        <option value="+49">🇩🇪 +49</option>
        <option value="+33">🇫🇷 +33</option>
        <option value="+971">🇦🇪 +971</option>
        <option value="+65">🇸🇬 +65</option>
      </select>
      <input
        type="tel"
        autoFocus={autoFocus}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, "");
          onValueChange(numericValue);
        }}
        maxLength={15}
        className="flex-1 text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
      />
    </div>
  );
};

/* ==================== OTP INPUT COMPONENT ==================== */
export const OTPInput = ({ value, onValueChange, onResendOTP, otpTimer, autoFocus, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        autoFocus={autoFocus}
        value={value || ""}
        placeholder={placeholder}
        onChange={(e) => {
          const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);
          onValueChange(numericValue);
        }}
        maxLength={6}
        className="w-full text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none tracking-widest text-center"
      />
      <div className="mt-4 text-sm text-slate-600 text-center">
        {otpTimer > 0 ? (
          <p>Resend OTP in {otpTimer}s</p>
        ) : (
          <button
            onClick={onResendOTP}
            className="text-indigo-500 font-semibold hover:text-indigo-600 transition-colors"
          >
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

/* ==================== TRUST SCORE DISPLAY COMPONENT ==================== */
export const TrustScoreDisplay = ({ trustScore }) => {
  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Very Good";
    return "Good";
  };

  return (
    <motion.div
      className="relative max-w-xl w-full lg:mt-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 -z-10 rounded-[2.8rem] bg-linear-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl" />

      <div className="relative bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        <div className="text-center">
          <h2 className="text-lg font-medium text-slate-500 mb-6">
            AI Trust Score
          </h2>
          
          <motion.div
            className="relative w-40 h-40 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "439.6 439.6", strokeDashoffset: 439.6 }}
                animate={{ strokeDashoffset: 439.6 - (439.6 * trustScore) / 100 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-5xl font-bold bg-linear-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {trustScore}
              </motion.span>
            </div>
          </motion.div>

          <p className="text-slate-600 mb-2">
            {getScoreLabel(trustScore)} Trust Score
          </p>
          <p className="text-sm text-slate-500">
            This score is visible to others and reflects your verification status
          </p>

          <div className="mt-8 space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-slate-600">Government ID Verified</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-slate-600">Face Verification Complete</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-500">✓</span>
              <span className="text-slate-600">Mobile Number Verified</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==================== FORM INPUT COMPONENT ==================== */
export const FormInput = ({
  field,
  value,
  countryCode,
  onValueChange,
  onCountryCodeChange,
  onFileChange,
  onResendOTP,
  otpTimer,
}) => {
  if (field.type === "file") {
    return (
      <input
        key={field.key}
        type="file"
        autoFocus
        onChange={onFileChange}
        accept={field.key === "videoIntroduction" ? "video/*" : "image/*"}
        className="w-full text-xl border-b border-slate-300 pb-3 focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-500 hover:file:bg-amber-100"
      />
    );
  }

  if (field.type === "phone") {
    return (
      <PhoneInput
        value={value}
        countryCode={countryCode}
        onValueChange={onValueChange}
        onCountryCodeChange={onCountryCodeChange}
        placeholder={field.placeholder}
        autoFocus
      />
    );
  }

  if (field.type === "otp") {
    return (
      <OTPInput
        value={value}
        onValueChange={onValueChange}
        onResendOTP={onResendOTP}
        otpTimer={otpTimer}
        placeholder={field.placeholder}
        autoFocus
      />
    );
  }

  return (
    <input
      type="text"
      autoFocus
      value={value || ""}
      placeholder={field.placeholder}
      onChange={(e) => onValueChange(e.target.value)}
      readOnly={field.readOnly}
      className="w-full text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
    />
  );
};

/* ==================== VERIFICATION FORM COMPONENT ==================== */
export const VerificationForm = ({
  field,
  value,
  countryCode,
  error,
  safeStep,
  step,
  fieldsLength,
  onValueChange,
  onCountryCodeChange,
  onFileChange,
  onResendOTP,
  otpTimer,
  onNext,
  onBack,
  onSkipToLast,
}) => {
  return (
    <motion.div
      key={safeStep}
      className="relative max-w-xl w-full lg:mt-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
    >
      <div className="absolute inset-0 -z-10 rounded-[2.8rem] bg-linear-to-br from-indigo-500/10 via-transparent to-rose-500/10 blur-3xl" />

      <div className="relative bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        <h1 className="text-sm font-medium text-slate-500 mb-6">
          {field.label}
        </h1>

        <div className="relative group">
          <FormInput
            field={field}
            value={value}
            countryCode={countryCode}
            onValueChange={onValueChange}
            onCountryCodeChange={onCountryCodeChange}
            onFileChange={onFileChange}
            onResendOTP={onResendOTP}
            otpTimer={otpTimer}
          />
          <span className="absolute left-0 -bottom-px h-0.5 w-0 bg-linear-to-r from-indigo-500 to-rose-500 group-focus-within:w-full transition-all duration-500" />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={onSkipToLast}
            className="bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full cursor-pointer text-sm hover:shadow-lg transition-shadow"
          >
            Skip to last
          </button>

          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={onBack}
                className="px-6 py-2.5 bg-black text-white rounded-full text-sm cursor-pointer hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
            )}

            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-full bg-color text-sm font-semibold cursor-pointer hover:shadow-lg transition-shadow"
            >
              {step === fieldsLength - 1 ? "Verify" : "Reply"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};