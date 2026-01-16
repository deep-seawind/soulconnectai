import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

/* ---------------- ZOD VALIDATION ---------------- */
const fieldValidators = {
  friendsDescription: z
    .string()
    .min(3, "Please enter at least 3 words")
    .refine(
      (val) => val.trim().split(/\s+/).length === 3,
      "Please enter exactly 3 words"
    ),

  personalityType: z.enum(["Introvert", "Extrovert", "Ambivert"], {
    required_error: "Please select your personality type",
  }),

  happinessSource: z.string().min(3, "Please tell what makes you happy"),

  stressHandling: z.string().min(3, "Please explain how you handle stress"),

  beliefInSoulmates: z.enum(["Yes", "No", "Not Sure"], {
    required_error: "Please select an option",
  }),

  relationshipValues: z
    .string()
    .min(5, "Please enter at least 3 values")
    .refine(
      (val) => val.split(",").length >= 3,
      "Please enter at least 3 values separated by commas"
    ),

  loveLanguage: z.enum(
    [
      "Words of Affirmation",
      "Quality Time",
      "Gifts",
      "Acts of Care",
      "Physical Touch",
    ],
    { required_error: "Please select how you express love" }
  ),

  emotionalVsPhysical: z
    .string()
    .refine(
      (val) => ["1", "2", "3", "4", "5"].includes(val),
      "Please select a value between 1 and 5"
    ),
};
const Personality = ({ onNext }) => {
  const fields = [
    {
      key: "friendsDescription",
      label: "How would your friends describe you? (3 words)",
      type: "text",
      placeholder: "e.g. Caring, Honest, Ambitious",
      message:
        "Sometimes others see us more clearly. In three words, how would your friends describe you?",
    },
    {
      key: "personalityType",
      label: "Personality Type",
      type: "select",
      options: ["Introvert", "Extrovert", "Ambivert"],
      message:
        "Everyone has a different social energy. Are you more introverted, extroverted, or somewhere in between?",
    },
    {
      key: "happinessSource",
      label: "What makes you happiest in life?",
      type: "text",
      placeholder: "e.g. Family, growth, peace, success",
      message:
        "Happiness means different things to different people. What truly makes you happy?",
    },
    {
      key: "stressHandling",
      label: "How do you deal with stress?",
      type: "text",
      placeholder: "e.g. Music, meditation, talking to friends",
      message: "Life has its pressures. How do you usually handle stress?",
    },
    {
      key: "beliefInSoulmates",
      label: "Do you believe in soulmates or destiny?",
      type: "select",
      options: ["Yes", "No", "Not Sure"],
      message:
        "Some believe love is written in the stars, others believe it's built. What do you believe?",
    },
    {
      key: "relationshipValues",
      label: "Top 3 values in a relationship",
      type: "text",
      placeholder: "e.g. Trust, Respect, Freedom",
      message:
        "Values shape lasting relationships. What are the top three values you seek in a relationship?",
    },
    {
      key: "loveLanguage",
      label: "How do you express love?",
      type: "select",
      options: [
        "Words of Affirmation",
        "Quality Time",
        "Gifts",
        "Acts of Care",
        "Physical Touch",
      ],
      message:
        "Everyone expresses love differently. Which way feels most natural to you?",
    },
    {
      key: "emotionalVsPhysical",
      label: "Emotional vs Physical Connection",
      type: "select",
      options: ["1", "2", "3", "4", "5"],
      message:
        "On a scale of 1 to 5, how important is emotional connection compared to physical attraction?",
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* LEFT: AI MESSAGE */}
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

      {/* RIGHT: USER INPUT */}
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
                className={`w-full bg-transparent text-xl font-semibold border-b pb-3 focus:outline-none transition
                  ${
                    error
                      ? "border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
              >
                <option value="">Choose your answer</option>
                {field.options.map((o) => (
                  <option key={o}>{o}</option>
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
                className={`w-full bg-transparent text-xl md:text-2xl font-semibold border-b pb-3 focus:outline-none transition
                  ${
                    error
                      ? "border-red-500"
                      : "border-slate-300 focus:border-indigo-500"
                  }`}
              />
            )}
          </div>

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep(fields.length - 1)}
              className="bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full"
            >
              Skip to last
            </button>

            <div className="flex items-center gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm font-medium text-slate-400 hover:text-slate-700"
                >
                  Back
                </button>
              )}

              <button
                onClick={next}
                className="px-6 py-2.5 rounded-full bg-color text-sm font-semibold transition"
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

export default Personality;
