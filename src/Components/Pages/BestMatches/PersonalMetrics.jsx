import React from "react";
import { motion } from "framer-motion";
import {
  IoChatbubbleEllipses,
  IoPersonOutline,
  IoPulseOutline,
  IoCalendarOutline,
  IoTransgenderOutline,
  IoLanguageOutline,
  IoInfiniteOutline,
} from "react-icons/io5";

const PersonalMetrics = ({ data }) => {
  const stats = [
    {
      label: "Response",
      value: "98%",
      icon: <IoChatbubbleEllipses />,
      color: "from-blue-500 to-indigo-600",
      delay: 0.1,
    },
    {
      label: "Popularity",
      value: "Top 2%",
      icon: <IoPersonOutline />,
      color: "from-purple-500 to-rose-500",
      delay: 0.2,
    },
    {
      label: "Activity",
      value: "Live",
      icon: <IoPulseOutline />,
      color: "from-emerald-400 to-teal-600",
      delay: 0.3,
    },
  ];

  const infoPills = [
    { label: "Born", value: "Oct 1987", icon: <IoCalendarOutline /> },
    { label: "Identity", value: "Male", icon: <IoTransgenderOutline /> },
    { label: "Dialects", value: "EN • ES • DE", icon: <IoLanguageOutline /> },
  ];

  return (
    <div className="mb-24 space-y-12">
      {/* 1. THE ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay, duration: 0.8 }}
            whileHover={{ y: -8 }}
            className="group relative p-8 rounded-[3rem] bg-white border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div
              className={`absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br ${stat.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`}
            />

            <div className="relative z-10">
              <div
                className={`w-12 h-12 rounded-2xl bg-linear-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}
              >
                {React.cloneElement(stat.icon, { size: 22 })}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-slate-400 mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
                    {stat.value}
                  </h3>
                </div>

                {/* Visual Data Indicator (Mini Wave) */}
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3].map((bar) => (
                    <motion.div
                      key={bar}
                      animate={{ height: [10, 20, 10] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: bar * 0.2,
                      }}
                      className={`w-1 rounded-full bg-linear-to-t ${stat.color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subtle Interactive Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-indigo-50/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      {/* 2. THE IDENTITY DOCK (Skeuomorphic Glass) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden p-px rounded-4xl bg-white"
      >
        <div className="bg-white/70 backdrop-blur-2xl px-10 py-8 flex flex-wrap items-center justify-between gap-8">
          {infoPills.map((info, i) => (
            <div
              key={i}
              className="flex items-center gap-5 group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-color border border-slate-100 flex items-center justify-center text-slate-400 shadow-inner group-hover:text-indigo-600 group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all duration-500">
                {React.cloneElement(info.icon, { size: 24 })}
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                  {info.label}
                </span>
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  {info.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Background Decorative "Orb" */}
      <div className="absolute -z-10 left-1/2 bottom-0 -translate-x-1/2 w-full h-32 bg-indigo-500/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default PersonalMetrics;
