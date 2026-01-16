import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

const fieldValidators = z.object({
  governmentID: z
    .instanceof(File, { message: "Government ID is required" })
    .refine((file) => file.size > 0 && file.type.startsWith("image/"), {
      message: "Please upload a valid image file (JPG, PNG)",
    }),
  selfie: z
    .instanceof(File, { message: "Selfie is required for face verification" })
    .refine((file) => file.size > 0 && file.type.startsWith("image/"), {
      message: "Please upload a valid selfie image (JPG, PNG)",
    }),
  videoIntroduction: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size > 0, {
      message: "Please upload a valid video file",
    }),
  socialMediaHandle: z
    .string()
    .max(50, "Social media handle must be less than 50 characters")
    .optional(),

  mobileNumber: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Enter a valid mobile number with country code"),
});

const Verification = ({ onNext }) => {
  const fields = [
    {
      key: "governmentID",
      label: "Upload government ID (for KYC verification)",
      type: "file",
      message: "Please upload a valid government-issued ID",
    },
    {
      key: "selfie",
      label: "Face verification selfie",
      type: "file",
      message: "Upload a selfie for AI face verification with your ID",
    },
    {
      key: "videoIntroduction",
      label: "Video introduction (optional)",
      type: "file",
      message: "Optional: upload a short video introduction",
    },
    {
      key: "socialMediaHandle",
      label: "Social media handle linking (optional)",
      type: "text",
      placeholder: "@yourhandle",
      message: "Optional: link your social media handle",
    },
    {
      key: "mobileNumber",
      label: "Mobile number + OTP verification",
      type: "text",
      placeholder: "+91 9876543210",
      message: "Enter your mobile number to receive OTP",
    },
    {
      key: "aiTrustScore",
      label: "AI Trust Score visible to others after verification",
      type: "text",
      placeholder: "Auto-generated after verification",
      message: "Your trust score will be shown once verified",
    },
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const field = fields[step];
  const value = formData[field.key] || "";

  const updateValue = (val) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [field.key]: val,
    }));
  };

  /* -------------------- VALIDATION -------------------- */

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

  const next = () => {
    setError("");

    const val = value?.toString().trim();
    if (!val) {
      setError("This field is required");
      return;
    }

    if (!validateCurrentField()) return;

    if (step === fields.length - 1) {
      onNext();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const skipToLast = () => {
    setStep(fields.length - 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) updateValue(file);
  };

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

      {/* USER INPUT */}
      <motion.div
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
            {field.type === "file" ? (
              <>
                <input
                  key={field.key}
                  type="file"
                  autoFocus
                  onChange={handleFileChange}
                  className="w-full text-xl border-b border-slate-300 pb-3 focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-500 hover:file:bg-amber-100"
                />
              </>
            ) : (
              <input
                type="text"
                autoFocus
                value={value || ""}
                placeholder={field.placeholder}
                onChange={(e) => updateValue(e.target.value)}
                readOnly={field.readOnly}
                className="w-full text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
              />
            )}

            <span className="absolute left-0 -bottom-px h-0.5 w-0 bg-linear-to-r from-indigo-500 to-rose-500 group-focus-within:w-full transition-all duration-500" />
          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={skipToLast}
              className="bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full text-sm"
            >
              Skip to last
            </button>

            <div className="flex gap-4">
              {step > 0 && (
                <button
                  onClick={back}
                  className="px-6 py-2.5 bg-black text-white rounded-full text-sm"
                >
                  Back
                </button>
              )}

              <button
                onClick={next}
                className="px-6 py-2.5 rounded-full bg-color text-sm font-semibold"
              >
                {step === fields.length - 1 ? "Send" : "Reply"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Verification;
