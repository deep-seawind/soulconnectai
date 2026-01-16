import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

const fieldValidators = z.object({
  threeWordsPartner: z
    .string()
    .min(3, "Please enter at least 3 words describing your ideal partner"),

  mostImportantPartnerTrait: z
    .string()
    .min(3, "Please specify what matters most in a partner"),

  emotionalBond: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select importance of emotional bond",
  }),

  financialStability: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select importance of financial stability",
  }),

  sharedGoals: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select importance of shared goals",
  }),

  physicalAttraction: z.enum(["Low", "Medium", "High"], {
    required_error: "Please select importance of physical attraction",
  }),

  biggestTurnOff: z.enum(
    ["Dishonesty", "Laziness", "Ego", "Irresponsibility"],
    {
      required_error: "Please select a turn-off trait",
    }
  ),

  openToChange: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num >= 1 && num <= 5;
  }, "Please enter a number between 1 and 5"),

  lovePhilosophy: z.string().min(3, "Please describe your love philosophy"),
});

const AICompatibility = ({ onNext }) => {
  const fields = [
    {
      key: "threeWordsPartner",
      label: "Choose the 3 words that describe your ideal life partner",
      type: "text",
      placeholder: "e.g., Kind, Loyal, Ambitious",
      message: "Describe your ideal partner in 3 words",
    },
    {
      key: "mostImportantPartnerTrait",
      label: "When choosing a partner, what matters most?",
      type: "text",
      placeholder: "e.g., Trust, Compatibility, Humor",
      message: "What is the most important quality for you in a partner?",
    },
    {
      key: "emotionalBond",
      label: "Emotional bond",
      type: "select",
      options: ["Low", "Medium", "High"],
      message: "How important is an emotional bond?",
    },
    {
      key: "financialStability",
      label: "Financial stability",
      type: "select",
      options: ["Low", "Medium", "High"],
      message: "How important is financial stability?",
    },
    {
      key: "sharedGoals",
      label: "Shared goals",
      type: "select",
      options: ["Low", "Medium", "High"],
      message: "How important is it that you share goals with your partner?",
    },
    {
      key: "physicalAttraction",
      label: "Physical attraction",
      type: "select",
      options: ["Low", "Medium", "High"],
      message: "How important is physical attraction?",
    },
    {
      key: "biggestTurnOff",
      label: "Which of these turns you off the most?",
      type: "select",
      options: ["Dishonesty", "Laziness", "Ego", "Irresponsibility"],
      message: "Which trait would you dislike the most in a partner?",
    },
    {
      key: "openToChange",
      label: "How open are you to change for a relationship?",
      type: "number",
      placeholder: "1–5",
      message: "Rate your openness to change for your partner",
    },
    {
      key: "lovePhilosophy",
      label: "What is your love philosophy?",
      type: "text",
      placeholder: 'e.g., "Grow together", "Respect individuality"',
      message: "Share your love philosophy",
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

export default AICompatibility;
