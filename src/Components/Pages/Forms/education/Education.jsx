import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

/* -------------------- ZOD SCHEMA -------------------- */
const educationSchema = z.object({
  highestQualification: z.string().min(1, "Please select qualification"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  currentOccupation: z.string().min(2, "Occupation is required"),
  annualIncomeRange: z.string().min(1, "Please select income range"),
  workEnvironment: z.string().min(1, "Please select work environment"),
  continueWorkingAfterMarriage: z.string().min(1, "Please select an option"),
  careerAmbitionLevel: z.string().min(1, "Please select ambition level"),
});
/* --------------------------------------------------- */

const Education = ({ onNext }) => {
  const fields = [
    {
      key: "highestQualification",
      label: "Highest Qualification",
      type: "select",
      options: [
        "High School",
        "Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate (PhD)",
        "Other",
      ],
      message:
        "Education shapes perspective. What is your highest qualification?",
    },
    {
      key: "fieldOfStudy",
      label: "Field of Study",
      type: "text",
      message: "Your area of learning matters. What field did you study?",
    },
    {
      key: "currentOccupation",
      label: "Current Occupation",
      type: "text",
      message: "What do you currently do professionally?",
    },
    {
      key: "annualIncomeRange",
      label: "Annual Income Range",
      type: "select",
      options: [
        "Below ₹3 LPA",
        "₹3–5 LPA",
        "₹5–10 LPA",
        "₹10–20 LPA",
        "Above ₹20 LPA",
        "Prefer not to say",
      ],
      message:
        "Financial stability is important. Which income range best fits you?",
    },
    {
      key: "workEnvironment",
      label: "Work Environment",
      type: "select",
      options: ["Remote", "Office", "Hybrid"],
      message: "How do you usually work day to day?",
    },
    {
      key: "continueWorkingAfterMarriage",
      label: "Plan to continue working after marriage?",
      type: "select",
      options: ["Yes", "No", "Not Sure"],
      message:
        "Looking ahead matters. Do you plan to continue working after marriage?",
    },
    {
      key: "careerAmbitionLevel",
      label: "Career Ambition Level",
      type: "select",
      options: ["Balanced", "Moderate", "Highly Ambitious"],
      message:
        "Everyone has a different drive. How ambitious are you about your career?",
    },
  ];

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const field = fields[step];
  if (!field) return null;

  const value = formData[field.key] || "";

  const updateValue = (val) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [field.key]: val,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateCurrentField = () => {
    try {
      educationSchema
        .pick({ [field.key]: true })
        .parse({ [field.key]: formData[field.key] });
      return true;
    } catch (err) {
      setError(err.errors[0].message);
      return false;
    }
  };

  const next = () => {
    setError("");

    const val = formData[field.key]?.toString().trim();
    if (!val) {
      setError("This field is required");
      return;
    }

    if (!validateCurrentField()) return;

    // LAST FIELD → SEND ONLY
    if (step === fields.length - 1) {
      onNext();
      return;
    }

    setStep((s) => s + 1);
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const skipToLast = () => {
    setStep(fields.length - 1);
  };

  /* ------------------------------------------------ */

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
              <div className="flex flex-wrap gap-3">
                {field.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      updateValue(opt);

                      setTimeout(() => {
                        if (step === fields.length - 1) {
                          onNext();
                        } else {
                          setStep((s) => s + 1);
                        }
                      }, 0);
                    }}
                    className={`px-5 py-2.5 rounded-full border text-sm font-semibold transition cursor-pointer
                      ${
                        value === opt
                          ? "bg-black text-white border-black"
                          : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                      }`}
                  >
                    {opt}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    next();
                  }
                }}
                className="w-full bg-transparent text-xl md:text-2xl font-semibold border-b border-slate-300 pb-3 focus:outline-none"
              />
            )}

            {/* underline */}
            <span className="absolute left-0 -bottom-px h-0.5 w-0 bg-linear-to-r from-indigo-500 to-rose-500 group-focus-within:w-full transition-all duration-500" />
          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-3 text-sm text-red-500 font-medium">{error}</p>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={skipToLast}
              className="bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full cursor-pointer text-sm"
            >
              Skip to last
            </button>

            <div className="flex gap-4">
              {step > 0 && (
                <button
                  onClick={back}
                  className="px-6 py-2.5 bg-black text-white rounded-full text-sm cursor-pointer"
                >
                  Back
                </button>
              )}

              <button
                onClick={next}
                className="px-6 py-2.5 rounded-full bg-color text-sm font-semibold cursor-pointer"
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

export default Education;
