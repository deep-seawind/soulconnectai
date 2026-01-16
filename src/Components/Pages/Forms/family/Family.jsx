import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

  /* ---------------- ZOD VALIDATORS ---------------- */
  const fieldValidators = {
    familyType: z.string().min(1, "Please select a family type"),
    parentsOccupation: z
      .string()
      .min(3, "Please enter parents' occupation"),
    siblingsCount: z.string().min(1, "Please select siblings count"),
    familyRelationship: z
      .string()
      .min(1, "Please select relationship type"),
    familyApprovalImportance: z
      .string()
      .min(1, "Please rate family approval importance"),
  };

const Family = ({ onNext }) => {
  const fields = [
    {
      key: "familyType",
      label: "Family Type",
      type: "select",
      options: ["Joint", "Nuclear", "Single Parent"],
      message:
        "Family structure shapes daily life. What type of family do you belong to?",
    },
    {
      key: "parentsOccupation",
      label: "Parents' Occupation",
      type: "text",
      message:
        "Parents play a key role in our upbringing. What do your parents do?",
    },
    {
      key: "siblingsCount",
      label: "Number of Siblings",
      type: "select",
      options: ["0", "1", "2", "3", "4+"],
      message:
        "Siblings often shape our early experiences. How many siblings do you have?",
    },
    {
      key: "familyRelationship",
      label: "Relationship with Family",
      type: "select",
      options: ["Close", "Moderate", "Independent"],
      message:
        "Everyone connects differently with family. How would you describe your relationship?",
    },
    {
      key: "familyApprovalImportance",
      label: "Importance of Family Approval in Marriage",
      type: "select",
      options: ["1", "2", "3", "4", "5"],
      message:
        "Family opinions can matter in big decisions. How important is family approval for you?",
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

  /* ---------------- VALIDATION ---------------- */
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

    step === fields.length - 1
      ? onNext()
      : setStep((s) => s + 1);
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
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

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

export default Family;
