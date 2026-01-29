import React from "react";
import { motion } from "framer-motion";
import { IoSparkles, IoAdd, IoShapesOutline } from "react-icons/io5";

const InterestsSection = ({ data }) => {
  if (!data || !data.traits) return null;

  return (
    <section className="mb-24 relative">
      {/* 1. SECTION HEADER: AI INSPIRED */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="relative">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tighter">
            Vibe <span className="text-slate-300 font-light">&</span> Passions
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "8rem" }}
            className="h-1 bg-color-border mt-4 rounded-full"
          />
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-xl transition-all group"
        >
          <div className="p-1 bg-white/10 rounded-lg group-hover:rotate-90 transition-transform duration-500">
            <IoAdd size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">
            Explore Full Deck
          </span>
        </motion.button>
      </div>

      {/* 2. THE BENTO-GRID ARCHITECTURE */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        {data.traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className={`group relative overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white p-2 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)]
              }
            `}
          >
            <div className="absolute inset-0 p-[1.5px] rounded-[2.5rem] bg-linear-to-br from-indigo-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            <div className="absolute inset-[1.5px] bg-white rounded-[2.4rem] -z-10" />

            <div className="flex h-full items-center justify-between gap-5"> 
                {/* Icon Glass-Container */}
                <div className="w-1/4">
                <div className="w-12 h-12 rounded-full  flex items-center justify-center bg-indigo-600 text-white  transition-all duration-500 shadow-inner">
                  {React.cloneElement(trait.icon, { size: 28 })}
                </div>
                </div>

                <div className=" ">
                  <h4 className="text-xl font-semibold text-slate-900 tracking-tight leading-none mb-2 px-4">
                    {trait.label}
                  </h4>
                </div> 
            </div>

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      {/* 3. AMBIENT ATMOSPHERE */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-50/30 blur-[120px] rounded-full" />
    </section>
  );
};

export default InterestsSection;
