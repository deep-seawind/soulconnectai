import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  IoCheckmarkCircle, 
  IoCloseCircle,
  IoTimeOutline,
  IoShieldCheckmark
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const VerificationStatus = () => {
  const navigate = useNavigate();
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Sample verification data - replace with actual data from your state/API
  const verificationData = {
    governmentID: { status: "completed", label: "Government ID" },
    selfie: { status: "completed", label: "Face Verification" },
    videoIntroduction: { status: "skipped", label: "Video Introduction" },
    socialMediaHandle: { status: "completed", label: "Social Media" },
    mobileNumber: { status: "completed", label: "Phone Verification" },
    otp: { status: "completed", label: "OTP Verification" },
  };

  // Calculate completion percentage
  const totalFields = Object.keys(verificationData).length;
  const completedFields = Object.values(verificationData).filter(
    (field) => field.status === "completed"
  ).length;
  const completionPercentage = Math.round((completedFields / totalFields) * 100);

  // Animate percentage on mount
  useEffect(() => {
    let current = 0;
    const increment = completionPercentage / 50; // 50 frames
    const timer = setInterval(() => {
      current += increment;
      if (current >= completionPercentage) {
        setAnimatedPercentage(completionPercentage);
        clearInterval(timer);
      } else {
        setAnimatedPercentage(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [completionPercentage]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <IoCheckmarkCircle className="text-green-500" size={24} />;
      case "pending":
        return <IoTimeOutline className="text-amber-500" size={24} />;
      case "skipped":
        return <IoCloseCircle className="text-slate-400" size={24} />;
      default:
        return <IoTimeOutline className="text-slate-400" size={24} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Verified";
      case "pending":
        return "Pending";
      case "skipped":
        return "Skipped";
      default:
        return "Not Started";
    }
  };

  const handleContinue = () => {
    navigate('/best-matches');
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 font-sans selection:bg-indigo-100">
      {/* SOFT AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-color rounded-full mb-6">
            <IoShieldCheckmark className="text-black" size={40} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-3">
            Verification Status
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Your profile verification progress
          </p>
        </motion.div>

        {/* PERCENTAGE CIRCLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] mb-8"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              {/* Background Circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#e2e8f0"
                  strokeWidth="16"
                  fill="none"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "552.9 552.9", strokeDashoffset: 552.9 }}
                  animate={{
                    strokeDashoffset: 552.9 - (552.9 * animatedPercentage) / 100,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  className="text-6xl font-bold bg-linear-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent"
                  key={animatedPercentage}
                >
                  {animatedPercentage}%
                </motion.span>
                <span className="text-sm text-slate-500 font-medium mt-1">
                  Complete
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {completionPercentage === 100
                ? "Fully Verified!"
                : "Almost There!"}
            </h2>
            <p className="text-slate-500 text-center max-w-md">
              {completionPercentage === 100
                ? "Your profile is fully verified and ready to match with others."
                : `Complete the remaining ${
                    totalFields - completedFields
                  } step${
                    totalFields - completedFields > 1 ? "s" : ""
                  } to unlock full features.`}
            </p>
          </div>
        </motion.div>

        {/* VERIFICATION ITEMS LIST */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-[3rem] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] mb-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Verification Details
          </h3>

          <div className="space-y-4">
            {Object.entries(verificationData).map(([key, data], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {getStatusIcon(data.status)}
                  <div>
                    <p className="font-semibold text-slate-900">{data.label}</p>
                    <p className="text-sm text-slate-500">
                      {getStatusLabel(data.status)}
                    </p>
                  </div>
                </div>

                {data.status === "completed" && (
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    ✓ DONE
                  </span>
                )}
                {data.status === "skipped" && (
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    SKIPPED
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleContinue}
            className="px-10 py-4 bg-color text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl cursor-pointer"
          >
            {completionPercentage === 100
              ? "Continue to Matches"
              : "Continue Anyway"}
          </button>

          {completionPercentage < 100 && (
            <p className="text-sm text-slate-500 mt-4">
              You can complete verification later from your profile
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationStatus;