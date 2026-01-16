import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

const fieldValidators = z.object({
  wantChildren: z.enum(["Yes", "No", "Maybe"], {
    required_error: "Please select your preference for having children",
  }),

  numberOfChildren: z
    .string()
    .refine(
      (val, ctx) => {
        const parentData = ctx.parent;
        if (parentData.wantChildren === "Yes") {
          return val && !isNaN(Number(val)) && Number(val) > 0;
        }
        return true;
      },
      { message: "Please enter number of children" }
    )
    .optional(),

  dreamLifestyle: z.string().min(5, "Please describe your dream lifestyle"),

  futureVision: z
    .string()
    .min(5, "Please share where you see yourself in 10 years"),

  careerVsFamily: z.enum(["Career growth", "Family time", "Both equally"], {
    required_error: "Please select your preference",
  }),
});

const Future = ({ onNext }) => {
  const fields = [
    {
      key: "wantChildren",
      label: "Do you want children in the future?",
      type: "select",
      options: ["Yes", "No", "Maybe"],
      message: "Do you want children someday?",
    },
    {
      key: "numberOfChildren",
      label: "If yes, how many?",
      type: "number",
      message: "How many children would you like to have?",
    },
    {
      key: "dreamLifestyle",
      label: "What's your dream lifestyle?",
      type: "text",
      placeholder: "City, travel, family, work balance",
      message: "Describe your ideal lifestyle",
    },
    {
      key: "futureVision",
      label: "Where do you see yourself in 10 years?",
      type: "text",
      placeholder: "Your vision for the next decade",
      message: "How do you see your life in 10 years?",
    },
    {
      key: "careerVsFamily",
      label: "What's more important: Career growth or family time?",
      type: "select",
      options: ["Career growth", "Family time", "Both equally"],
      message: "What matters more to you?",
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

export default Future;
