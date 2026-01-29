import React from "react";
import { motion } from "framer-motion";

const StepInputArea = ({
  field,
  rawValue,
  updateValue,
  next,
  removeSingleImage,
  removeMultiImage,
  isFieldFilled,
  step,
  fields,
  setStep,
  error,
}) => {
  const getPreviewUrl = (file) => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  return (
    <motion.div
      className="relative max-w-xl w-full lg:mt-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
    >
      <div className="relative bg-white backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        <h1 className="text-sm font-medium text-slate-500 mb-6">
          {field.label}
        </h1>

        {/* PROFILE IMAGE */}
        {field.type === "image" && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateValue(e.target.files?.[0] || null)}
              className="w-full text-xl focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-500 hover:file:bg-amber-100"
            />
            {rawValue instanceof File && (
              <div className="mt-4 relative w-32 h-32">
                <img
                  src={getPreviewUrl(rawValue)}
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                  alt="profile preview"
                />
                <button
                  type="button"
                  onClick={removeSingleImage}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black text-white text-sm flex items-center justify-center hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            )}
          </>
        )}

        {/* GALLERY IMAGES */}
        {field.type === "images" && (
          <>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => updateValue(Array.from(e.target.files || []))}
              className="w-full text-xl focus:outline-none cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-500 hover:file:bg-amber-100"
            />
            {Array.isArray(rawValue) && rawValue.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {rawValue.map((file, index) =>
                  file instanceof File ? (
                    <div key={index} className="relative group w-20 h-20">
                      <img
                        src={getPreviewUrl(file)}
                        className="w-20 h-20 rounded-xl object-cover shadow-sm"
                        alt={`gallery ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeMultiImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center hover:scale-110 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </>
        )}

        {/* TEXT / BUTTON SELECT / NUMBER / DATE */}
        {field.type !== "image" && field.type !== "images" && (
          <div className="relative group">
            {field.type === "select" ? (
  <div className="flex flex-wrap gap-3">
    {field.options.map((option) => (
      <button
        key={option}
        type="button"
        onClick={() => {
          updateValue(option);
          setStep((s) => s + 1); // ✅ bypass validation safely
        }}
        className={`px-5 py-2.5 rounded-full border text-sm font-medium transition
          ${
            rawValue === option
              ? "bg-black text-white border-black"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
      >
        {option}
      </button>
    ))}
  </div>
            ) : (
              <input
                autoFocus
                type={field.type}
                value={rawValue || ""}
                onChange={(e) => updateValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && next()}
                className="w-full bg-transparent text-xl border-b border-slate-300 pb-3 focus:outline-none"
              />
            )}

          </div>
        )}

        {/* ERROR */}
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        {/* FOOTER CONTROLS */}
        <div className="flex items-center justify-between mt-8">
          <button
            disabled={!isFieldFilled}
            onClick={() => setStep(fields.length - 1)}
            className={
              isFieldFilled
                ? "bg-linear-to-r from-indigo-500 to-rose-500 px-6 py-2.5 text-white rounded-full cursor-pointer"
                : "text-slate-300 cursor-not-allowed"
            }
          >
            Skip to last
          </button>

          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-6 py-2.5 bg-black text-white rounded-full cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              onClick={next}
              className="px-6 py-2.5 rounded-full bg-color text-white font-semibold cursor-pointer"
            >
              {step === fields.length - 1 ? "Send" : "Reply"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepInputArea;
