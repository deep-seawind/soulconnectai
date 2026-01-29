import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

/* ---------------- ZOD VALIDATION ---------------- */
const fieldValidators = {
  smokingHabit: z.string().min(1, "Please select smoking habit"),
  drinkingHabit: z.string().min(1, "Please select drinking habit"),
  dietPreference: z.string().min(1, "Please select diet preference"),
  fitnessRoutine: z.string().min(1, "Please select fitness routine"),
  sleepSchedule: z.string().min(1, "Please select sleep schedule"),
  leisureTravelFrequency: z.string().min(1, "Please select travel frequency"),
  lifestylePreference: z.string().min(1, "Please select lifestyle preference"),
  weekendActivities: z
    .string()
    .min(3, "Please describe your weekend activities"),
};

const Lifestyle = ({ onNext }) => {
  const fields = [
    {
      key: "smokingHabit",
      label: "Do you smoke?",
      type: "select",
      options: ["No", "Occasionally", "Yes"],
      message: "Lifestyle habits matter in daily life. Do you smoke?",
    },
    {
      key: "drinkingHabit",
      label: "Do you drink alcohol?",
      type: "select",
      options: ["No", "Occasionally", "Yes"],
      message: "Social habits can vary. Do you drink alcohol?",
    },
    {
      key: "dietPreference",
      label: "Diet Preference",
      type: "select",
      options: ["Vegetarian", "Eggetarian", "Non-Vegetarian"],
      message:
        "Food choices say a lot about lifestyle. What is your diet preference?",
    },
    {
      key: "fitnessRoutine",
      label: "Fitness Routine",
      type: "select",
      options: ["Daily", "Sometimes", "Rarely", "Never"],
      message:
        "Health is an important part of life. How often do you follow a fitness routine?",
    },
    {
      key: "sleepSchedule",
      label: "Sleep Schedule",
      type: "select",
      options: ["Early Sleeper", "Night Owl", "Flexible"],
      message:
        "Everyone has a rhythm. What best describes your sleep schedule?",
    },
    {
      key: "leisureTravelFrequency",
      label: "Leisure Travel Frequency",
      type: "select",
      options: ["Often", "Sometimes", "Rarely"],
      message: "Travel can be refreshing. How often do you travel for leisure?",
    },
    {
      key: "lifestylePreference",
      label: "Lifestyle Preference",
      type: "select",
      options: ["Simple", "Balanced", "Luxurious"],
      message:
        "Comfort means different things to different people. What lifestyle do you prefer?",
    },
    {
      key: "weekendActivities",
      label: "How do you spend your weekends?",
      type: "text",
      message:
        "Free time shows personality. How do you usually spend your weekends?",
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
    <div className="flex flex-wrap gap-3">
      {field.options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => {
            updateValue(o);
            // ✅ Check if this is the last field
            if (step === fields.length - 1) {
              // Auto-submit on last field
              setTimeout(() => {
                onNext();
              }, 300); // Small delay for smooth transition
            } else {
              // Move to next field for non-last fields
              setStep((s) => s + 1);
            }
          }}
          className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition cursor-pointer cursor-pointer
            ${
              value === o
                ? "bg-black text-white border-black"
                : error
                ? "border-red-500 text-red-500"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
        >
          {o}
        </button>
      ))}
    </div>
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
              className="bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full cursor-pointer"
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
                className="px-6 py-2.5 rounded-full bg-color text-sm font-semibold cursor-pointer transition"
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

export default Lifestyle;