import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

const fieldValidators = z.object({
  beliefInGodOrSpirituality: z.enum(["Yes", "No", "Sometimes"], {
    required_error: "Please select your belief",
  }),

  importanceOfReligion: z.enum(
    ["Very Important", "Moderately Important", "Not Important"],
    { required_error: "Please select how important religion is for you" }
  ),

  partnerBeliefPreference: z.enum(["Yes", "No", "Doesn't matter"], {
    required_error: "Please select your preference for partner beliefs",
  }),

  astrologyOrZodiac: z.enum(["Yes", "No", "Sometimes"]).optional(),
});

const Beliefs = ({ onNext }) => {
  const fields = [
    {
      key: "beliefInGodOrSpirituality",
      label: "Do you believe in God or spirituality?",
      type: "select",
      options: ["Yes", "No", "Sometimes"],
      message:
        "Your spiritual beliefs shape your life. Do you believe in God or spirituality?",
    },
    {
      key: "importanceOfReligion",
      label: "How important is religion in your daily life?",
      type: "select",
      options: ["Very Important", "Moderately Important", "Not Important"],
      message:
        "Religion can guide values and routines. How important is it for you daily?",
    },
    {
      key: "partnerBeliefPreference",
      label: "Would you prefer a partner with the same belief system?",
      type: "select",
      options: ["Yes", "No", "Doesn't matter"],
      message: "Do you care if your partner shares your belief system?",
    },
    {
      key: "astrologyOrZodiac",
      label: "Do you follow astrology / zodiac compatibility?",
      type: "select",
      options: ["Yes", "No", "Sometimes"],
      message: "(Optional) Are astrology or zodiac signs important to you?",
    },
  ];

  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const field = fields[step];
  const value = data[field.key] || "";

  const updateValue = (val) => {
    setError("");
    setData((p) => ({ ...p, [field.key]: val }));
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

  const next = () => {
    setError("");

    const val = value?.toString().trim();
    if (!val) {
      setError("This field is required");
      return;
    }

    if (!validateCurrentField()) return;

    step === fields.length - 1 ? onNext() : setStep((s) => s + 1);
  };

  const skipToLast = () => {
    setStep(fields.length - 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
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

export default Beliefs;
