import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import AIMessage from "../../Home/AIMessage";
import StepInputArea from "./StepInputArea";

// ── SCHEMA (unchanged) ────────────────────────────────────────
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
  profileImage: z.any().optional(),
  galleryImages: z.array(z.any()).optional(),
});

const BasicInfo = ({ onNext }) => {
const fields = [
  { key: "fullName", label: "Full Name", type: "text", message: "Every great story starts with a name. How should I address you?" },
  { key: "gender", label: "Gender", type: "select", options: ["Male","Female","Other"], message: "Identity matters. How do you identify yourself?" },
  { key: "dob", label: "Date of Birth", type: "date", message: "Time shapes us. When were you born?" },
  { key: "height", label: "Height (cm)", type: "number", message: "What is your height?" },
  { key: "weight", label: "Weight (kg)", type: "number", message: "And your weight?" },
  { key: "maritalStatus", label: "Marital Status", type: "select", options: ["Never Married","Divorced","Widowed"], message: "What is your marital status?" },
  { key: "religion", label: "Religion / Community / Caste", type: "text", message: "Tell me about your beliefs." },
  { key: "country", label: "Country", type: "text", message: "Where do you live?" },
  { key: "state", label: "State", type: "text", message: "Which state are you in?" },
  { key: "city", label: "City", type: "text", message: "Which city are you currently in?" },
  { key: "nationality", label: "Nationality", type: "text", message: "Your nationality?" },
  { key: "citizenship", label: "Citizenship", type: "text", message: "Your citizenship?" },
  { key: "languages", label: "Languages You Speak", type: "text", message: "Which languages do you speak?" },
  { key: "openToInterCommunity", label: "Open to inter-community marriage?", type: "select", options: ["Yes","No","Maybe"], message: "Are you open to it?" },
  { key: "profileImage", label: "Profile Image", type: "image", message: "Let’s start with a photo that truly represents you." },
  { key: "galleryImages", label: "Additional Photos", type: "images", message: "You can add a few more photos to complete your profile." },
];

  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [error, setError] = useState("");
 
  const objectUrlsRef = useRef(new Map());

  const field = fields[step];
  const rawValue = data[field.key];
 
 
 
  useEffect(() => {
    return () => { 
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);
 
  useEffect(() => {
    if (field.key === "galleryImages" && Array.isArray(rawValue)) {
      const currentFiles = new Set(rawValue);
      for (const [file, url] of objectUrlsRef.current.entries()) {
        if (!currentFiles.has(file)) {
          URL.revokeObjectURL(url);
          objectUrlsRef.current.delete(file);
        }
      }
    }
  }, [rawValue, field.key]);

  const isFieldFilled =
    field.type === "image"
      ? rawValue instanceof File
      : field.type === "images"
        ? Array.isArray(rawValue) && rawValue.length > 0
        : Boolean(rawValue?.toString()?.trim());

  const updateValue = (newValue) => {
    setError("");
 
    if (field.key === "galleryImages" && Array.isArray(newValue)) {
      const prevFiles = Array.isArray(rawValue) ? rawValue : [];
      const removed = prevFiles.filter((f) => !newValue.includes(f));
      removed.forEach((file) => {
        const url = objectUrlsRef.current.get(file);
        if (url) {
          URL.revokeObjectURL(url);
          objectUrlsRef.current.delete(file);
        }
      });
    }

    setData((prev) => ({ ...prev, [field.key]: newValue }));
  };

  const next = () => {
    setError("");
 
    if (
      (field.type !== "image" &&
        field.type !== "images" &&
        !rawValue?.toString()?.trim()) ||
      (field.type === "image" && !(rawValue instanceof File)) ||
      (field.type === "images" &&
        (!Array.isArray(rawValue) || rawValue.length === 0))
    ) {
      setError("This field is required");
      return;
    }
 
    if (field.type !== "image" && field.type !== "images") {
      const partial = { [field.key]: rawValue };
      const fieldSchema = basicInfoSchema.pick({ [field.key]: true });
      const result = fieldSchema.safeParse(partial);
      if (!result.success) {
        setError(result.error.issues[0].message);
        return;
      }
    }

    if (field.key === "fullName") {
      setName(rawValue?.trim() || "");
    }

    if (step === fields.length - 1) {
      onNext();
    } else {
      setStep((s) => s + 1);
    }
  };

  const removeSingleImage = () => {
    setData((prev) => ({
      ...prev,
      [field.key]: null,
    }));
  };

  const removeMultiImage = (index) => {
    setData((prev) => ({
      ...prev,
      [field.key]: prev[field.key].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* AI Message - unchanged */}
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

     <StepInputArea
        field={field}
        rawValue={rawValue}
        updateValue={updateValue}
        next={next}
        removeSingleImage={removeSingleImage}
        removeMultiImage={removeMultiImage}
        isFieldFilled={isFieldFilled}
        step={step}
        fields={fields}
        setStep={setStep}
        error={error}
      />
    </div>
  );
};

export default BasicInfo;
