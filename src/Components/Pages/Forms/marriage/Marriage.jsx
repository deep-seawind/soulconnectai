import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

const fieldValidators = z.object({
  idealAgeRange: z
    .string()
    .min(2, "Please enter your ideal age range")
    .regex(/^\d{2,3}-\d{2,3}$/, "Enter in format: 25-30"),

  preferredHeightRange: z
    .string()
    .min(2, "Please enter preferred height range")
    .regex(/^[\d'"]+\s*-\s*[\d'"]+$/, "Enter in format: 5'5\" - 6'0\""),

  religionCommunityPreference: z.string().optional(),

  locationPreference: z.enum(
    ["Same City", "Open to Move", "Long Distance OK"],
    { required_error: "Please select location preference" }
  ),

  marriageTypePreference: z.enum(["Arranged", "Semi-Arranged", "Self-Choice"], {
    required_error: "Please select marriage type preference",
  }),

  marriageTimeline: z.enum(["6 months", "1 year", "2+ years"], {
    required_error: "Please select a preferred marriage timeline",
  }),

  liveWithParents: z.enum(["Yes", "No", "Depends"], {
    required_error: "Please select whether you would live with parents",
  }),
});

const Marriage = ({ onNext }) => {
  const fields = [
    {
      key: "idealAgeRange",
      label: "Ideal Age Range for Partner",
      type: "text",
      placeholder: "e.g. 25-30",
      message: "What age range do you prefer for your partner?",
    },
    {
      key: "preferredHeightRange",
      label: "Preferred Height Range",
      type: "text",
      placeholder: "e.g. 5'5\" - 6'0\"",
      message: "Do you have a preferred height range for your partner?",
    },
    {
      key: "religionCommunityPreference",
      label: "Religion / Community Preference (if any)",
      type: "text",
      placeholder: "Optional",
      message: "Do you have any preference for religion or community?",
    },
    {
      key: "locationPreference",
      label: "Location Preference",
      type: "select",
      options: ["Same City", "Open to Move", "Long Distance OK"],
      message: "Where would you prefer your partner to be located?",
    },
    {
      key: "marriageTypePreference",
      label: "Marriage Type Preference",
      type: "select",
      options: ["Arranged", "Semi-Arranged", "Self-Choice"],
      message:
        "Do you prefer arranged, semi-arranged, or self-choice marriage?",
    },
    {
      key: "marriageTimeline",
      label: "How soon do you plan to marry if you find the right person?",
      type: "select",
      options: ["6 months", "1 year", "2+ years"],
      message: "What’s your preferred timeline for marriage?",
    },
    {
      key: "liveWithParents",
      label: "Would you live with your parents after marriage?",
      type: "select",
      options: ["Yes", "No", "Depends"],
      message: "Do you plan to live with your parents after marriage?",
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
            {field.type === "select" ? (
              <select
                autoFocus
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                className="w-full bg-transparent text-xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
              >
                <option value="">Choose your answer</option>
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                autoFocus
                type="text"
                value={value}
                placeholder="Type your response…"
                onChange={(e) => updateValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                className="w-full bg-transparent text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
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

export default Marriage;
