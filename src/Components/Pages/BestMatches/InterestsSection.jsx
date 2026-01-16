import React from "react";
import { motion } from "framer-motion";
import { IoSparklesSharp, IoAddOutline } from "react-icons/io5";

const InterestsSection = ({ data }) => {
  // Guard clause for data
  if (!data || !data.traits) return null;

  return (
    <section className="mb-24 relative">
      {/* 1. HEADER WITH DEPTH */}
      <div className="flex justify-between items-end mb-12">
        <div className="relative">
          <div className="text-4xl font-bold text-slate-950">
            Vibe & Passions
          </div>
        </div>

        {/* Actionable Badge */}
        <motion.div
          whileHover={{
            scale: 1.05, 
          }}
          className="group flex items-center gap-2 text-[11px] bg-color text-black px-5 py-3 rounded-2xl shadow-sm cursor-pointer transition-all duration-300"
        >
          <IoAddOutline className="text-lg group-hover:rotate-90 transition-transform duration-300 text-black" />
          Explore {data.moreTraits || 12} More
        </motion.div>
      </div>

      {/* 2. DYNAMIC PILL GRID */}
      <div className="flex flex-wrap gap-4">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.12)",
              borderColor: "rgba(79, 70, 229, 0.2)",
            }}
            className="relative flex items-center gap-4 px-8 py-5 rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_4px_20px_-1px_rgba(0,0,0,0.02)] transition-all cursor-pointer group overflow-hidden"
          >
            {/* Subtle Gradient Hover background */}
            <div className="absolute inset-0 bg-linear-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/50 group-hover:to-white transition-all duration-500" />

            {/* Icon with "Aura" */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-inner">
              {React.cloneElement(trait.icon, {
                size: 20,
                className: "group-hover:scale-110 transition-transform",
              })}
            </div>

            <div className="relative">
              <span className="block font-black text-slate-800 text-sm tracking-tight mb-0.5">
                {trait.label}
              </span>
              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Core Interest
              </span>
            </div>

            {/* Corner Decorative Sparkle */}
            <div className="absolute top-2 right-4 opacity-0 group-hover:opacity-20 transition-opacity">
              <IoSparklesSharp size={10} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-10 -right-20 w-64 h-64 bg-indigo-50/50 blur-[100px] -z-10 rounded-full" />
    </section>
  );
};

export default InterestsSection;
