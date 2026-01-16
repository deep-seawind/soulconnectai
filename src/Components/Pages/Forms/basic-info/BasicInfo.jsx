import React, { useState } from "react";
import AIMessage from "../../Home/AIMessage";
import { motion } from "framer-motion";
import { z } from "zod";

/* ------------------ ZOD SCHEMA ------------------ */
const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().refine((dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age >= 18;
  }, "You must be at least 18 years old"),
  height: z.string().optional(),
  weight: z.string().optional(),
  maritalStatus: z.enum(["Never Married", "Divorced", "Widowed"]),
  religion: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  nationality: z.string().optional(),
  citizenship: z.string().optional(),
  languages: z.string().optional(),
  openToInterCommunity: z.enum(["Yes", "No", "Maybe"]),
});

const BasicInfo = ({ onNext }) => {
  const fields = [
    {
      key: "fullName",
      label: "Full Name",
      type: "text",
      message:
        "Every great story starts with a name. How should I address you?",
    },
    {
      key: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      message: "Identity matters. How do you identify yourself?",
    },
    {
      key: "dob",
      label: "Date of Birth",
      type: "date",
      message: "Time shapes us. When were you born?",
    },
    {
      key: "height",
      label: "Height (cm)",
      type: "number",
      message: "What is your height?",
    },
    {
      key: "weight",
      label: "Weight (kg)",
      type: "number",
      message: "And your weight?",
    },
    {
      key: "maritalStatus",
      label: "Marital Status",
      type: "select",
      options: ["Never Married", "Divorced", "Widowed"],
      message: "What is your marital status?",
    },
    {
      key: "religion",
      label: "Religion / Community / Caste",
      type: "text",
      message: "Tell me about your beliefs.",
    },
    {
      key: "country",
      label: "Country",
      type: "text",
      message: "Where do you live?",
    },
    {
      key: "state",
      label: "State",
      type: "text",
      message: "Which state are you in?",
    },
    {
      key: "city",
      label: "City",
      type: "text",
      message: "Which city are you currently in?",
    },
    {
      key: "nationality",
      label: "Nationality",
      type: "text",
      message: "Your nationality?",
    },
    {
      key: "citizenship",
      label: "Citizenship",
      type: "text",
      message: "Your citizenship?",
    },
    {
      key: "languages",
      label: "Languages You Speak",
      type: "text",
      message: "Which languages do you speak?",
    },
    {
      key: "openToInterCommunity",
      label: "Open to inter-community marriage?",
      type: "select",
      options: ["Yes", "No", "Maybe"],
      message: "Are you open to it?",
    },
  ];

  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const field = fields[step];
  const value = data[field.key] || "";
  const isfieldFilled = Boolean(value?.toString().trim());

  const updateValue = (val) => {
    setError("");
    setData((prev) => ({ ...prev, [field.key]: val }));
  };

  const next = () => {
    setError("");

    const val = value?.toString().trim();
    if (!val) {
      setError("This field is required");
      return;
    }

    const partial = { ...data, [field.key]: val };
    const fieldSchema = basicInfoSchema.pick({ [field.key]: true });
    const result = fieldSchema.safeParse(partial);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    if (field.key === "fullName") setName(val);

    step === fields.length - 1 ? onNext() : setStep((s) => s + 1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* LEFT: AI MESSAGE (Slightly Higher) */}
      <div className="flex justify-start lg:-mt-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <AIMessage
            step={step + 1}
            name={name}
            customMessage={field.message}
          />
        </motion.div>
      </div>

      {/* RIGHT: USER INPUT (Slightly Lower – Reply Style) */}
      <motion.div
        className="relative max-w-xl w-full lg:mt-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 -z-10 rounded-[2.8rem] 
          bg-linear-to-br from-indigo-500/10 via-transparent to-rose-500/10 
          blur-3xl"
        />

        {/* Reply Surface */}
        <div
          className="relative bg-white backdrop-blur-2xl 
          border border-slate-200/60 
          rounded-[2.5rem] p-8 md:p-10 
          shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
        >
          {/* Prompt */}
          <h1 className="text-sm font-medium text-slate-500 mb-6">
            {field.label}
          </h1>

          {/* Input */}
          <div className="relative group">
            {field.type === "select" ? (
              <select
                autoFocus
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                className="w-full bg-transparent text-xl border-b border-slate-300 pb-3 focus:outline-none"
              >
                <option value="">Choose your answer</option>
                {field.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                autoFocus
                type={field.type}
                value={value}
                onChange={(e) => updateValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                className="w-full bg-transparent text-xl border-b border-slate-300 pb-3 focus:outline-none"
              />
            )}

            {/* Animated Underline */}
            <span
              className="absolute left-0 -bottom-px h-0.5 w-0
              bg-linear-to-r from-indigo-500 to-rose-500
              group-focus-within:w-full transition-all duration-500"
            />
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          {/* Footer */}
          <div className="flex items-center justify-between mt-8">
            <button
              disabled={!isfieldFilled}
              onClick={() => setStep(fields.length - 1)}
              className={
                isfieldFilled
                  ? "bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full"
                  : "text-slate-300 cursor-not-allowed"
              }
            >
              Skip to last
            </button>

            {/* Actions */}
            <div className="flex gap-4">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-2.5 bg-black text-white rounded-full"
                >
                  Back
                </button>
              )}

              <button
                onClick={next}
                className="px-6 py-2.5 rounded-full bg-color text-white font-semibold"
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

export default BasicInfo;
