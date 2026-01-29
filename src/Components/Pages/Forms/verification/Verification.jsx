import React from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { VerificationForm, TrustScoreDisplay } from "./VerificationComponents";
import { useVerification } from "./Useverification";

const Verification = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Navigate to verification status page
    navigate('/verification-status');
  };

  const {
    step,
    safeStep,
    field,
    value,
    formData,
    error,
    otpTimer,
    verificationComplete,
    trustScore,
    updateValue,
    updateCountryCode,
    handleFileChange,
    resendOTP,
    next,
    back,
    skipToLast,
    fieldsLength,
  } = useVerification(handleComplete);

  // Show Trust Score Display after verification is complete
  if (verificationComplete && trustScore !== null) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex justify-start lg:-mt-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <AIMessage
              step={step + 1}
              isAnimating={false}
              customMessage="Verification complete! Your AI Trust Score has been calculated."
            />
          </motion.div>
        </div>

        <TrustScoreDisplay trustScore={trustScore} />
      </div>
    );
  }

  // Main Verification Form
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* AI MESSAGE */}
      <div className="flex justify-start lg:-mt-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <AIMessage
            step={step + 1}
            isAnimating={false}
            customMessage={field.message}
          />
        </motion.div>
      </div>

      {/* VERIFICATION FORM */}
      <VerificationForm
        field={field}
        value={value}
        countryCode={formData.countryCode}
        error={error}
        safeStep={safeStep}
        step={step}
        fieldsLength={fieldsLength}
        onValueChange={updateValue}
        onCountryCodeChange={updateCountryCode}
        onFileChange={handleFileChange}
        onResendOTP={resendOTP}
        otpTimer={otpTimer}
        onNext={next}
        onBack={back}
        onSkipToLast={skipToLast}
      />
    </div>
  );
};

export default Verification;