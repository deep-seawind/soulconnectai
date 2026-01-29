import { useState, useEffect } from "react";
import { 
  fieldValidators, 
  verificationFields, 
  sendOTP as sendOTPAPI, 
  verifyOTP as verifyOTPAPI 
} from "./verificationUtils";

export const useVerification = (onNext) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    countryCode: "+91", // Default country code
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [trustScore, setTrustScore] = useState(null);

  // OTP Timer countdown
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const safeStep = Math.min(step, verificationFields.length - 1);
  const field = verificationFields[safeStep];
  const value = formData[field.key] || "";

  const updateValue = (val) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [field.key]: val,
    }));
  };

  const updateCountryCode = (code) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
    }));
  };

  const validateCurrentField = () => {
    const validator = fieldValidators[field.key];
    if (!validator) return true;

    const result = validator.safeParse(value);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return false;
    }

    return true;
  };

  const sendOTP = async () => {
    try {
      const fullPhoneNumber = formData.countryCode + formData.mobileNumber;
      await sendOTPAPI(fullPhoneNumber);
      
      setOtpSent(true);
      setOtpTimer(60); // 60 seconds timer
      return true;
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
      return false;
    }
  };

  const verifyOTP = async () => {
    try {
      const fullPhoneNumber = formData.countryCode + formData.mobileNumber;
      const result = await verifyOTPAPI(fullPhoneNumber, formData.otp);
      
      if (result.success) {
        setTrustScore(result.trustScore);
        setVerificationComplete(true);
        return true;
      } else {
        setError("Invalid OTP. Please try again.");
        return false;
      }
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      return false;
    }
  };

  const next = async () => {
    setError("");

    // Handle optional fields
    if (field.key === "videoIntroduction" || field.key === "socialMediaHandle") {
      if (!value || value.toString().trim() === "") {
        // Skip optional field
        if (step === verificationFields.length - 1) {
          onNext();
        } else {
          setStep((s) => s + 1);
        }
        return;
      }
    }

    // Check if field has value
    const val = value?.toString().trim();
    if (!val) {
      setError("This field is required");
      return;
    }

    // Validate current field
    if (!validateCurrentField()) return;

    // Special handling for phone number field
    if (field.key === "mobileNumber") {
      const otpSuccess = await sendOTP();
      if (!otpSuccess) return;
    }

    // Special handling for OTP field
    if (field.key === "otp") {
      const verifySuccess = await verifyOTP();
      if (!verifySuccess) return;
      
      // Show trust score for 3 seconds before completing
      setTimeout(() => {
        onNext();
      }, 3000);
      return;
    }

    // Move to next step
    if (step === verificationFields.length - 1) {
      onNext();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      // Reset OTP state when going back from OTP field
      if (field.key === "otp") {
        setOtpSent(false);
        setOtpTimer(0);
      }
      setStep((s) => s - 1);
    }
  };

  const skipToLast = () => {
    setStep(verificationFields.length - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) updateValue(file);
  };

  const resendOTP = async () => {
    if (otpTimer > 0) return;
    setError("");
    await sendOTP();
  };

  return {
    step,
    safeStep,
    field,
    value,
    formData,
    error,
    otpSent,
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
    fieldsLength: verificationFields.length,
  };
};