import React from "react";
import { motion } from "framer-motion";
import {
  IoChatbubbleEllipses,
  IoPersonOutline,
  IoPulseOutline,
  IoCalendarOutline,
  IoTransgenderOutline,
  IoLanguageOutline,
  IoSparklesSharp,
  IoFingerPrintOutline,
} from "react-icons/io5";

const PersonalMetrics = ({ data }) => {
  const stats = [
    {
      label: "Response",
      value: "98%",
      icon: <IoChatbubbleEllipses />,
      bg: "bg-blue-400", 
    },
    {
      label: "Views",
      value: "2.4K",
      icon: <IoPersonOutline />,
      bg: "bg-purple-400", 
    },
    {
      label: "Active",
      value: "2h ago",
      icon: <IoPulseOutline />,
      bg: "bg-rose-400", 
    },
  ];

  const personalInfo = [
    { label: "Est.", value: "Oct 1987", icon: <IoCalendarOutline /> },
    { label: "Identity", value: "Male", icon: <IoTransgenderOutline /> },
    { label: "Dialects", value: "EN • ES • DE", icon: <IoLanguageOutline /> },
  ];

  return (
    <div className="mb-24 space-y-16">
      {/* 1. ASYMMETRIC FLUID GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -12 }}
            className={`group relative p-10 rounded-[3.5rem] overflow-hidden transition-all duration-500  `}
          >
            {/* THE GLASS BASE */}
            <div className="absolute inset-0 bg-white border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]" />

            <div className="relative z-10">
              {/* ICON SQUIRCLE */}
              <div
                className={`w-14 h-14 rounded-3xl bg-color flex items-center justify-center text-white mb-8 shadow-2xl group-hover:rotate-10  transition-transform duration-500`}
              >
                {React.cloneElement(stat.icon, { size: 26 })}
              </div>

              <div className="space-y-1">
                <span className="text-3xl font-bold text-slate-950 tracking-tighter block group-hover:scale-110 origin-left transition-transform duration-500">
                  {stat.value}
                </span>
                <span className="text-[12px] font-bold text-slate-400 block">
                  {stat.label}
                </span>
              </div>

          
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. PREMIUM INFO DOCK */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative group p-1 bg-linear-to-r from-slate-100 via-slate-200 to-slate-100 rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="bg-white/90 backdrop-blur-3xl p-8 rounded-[2.9rem] flex flex-wrap items-center justify-around gap-8">
          {personalInfo.map((info, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-3 group/item"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover/item:bg-indigo-100 group-hover/item:text-indigo-700 transition-all duration-300 text-2xl">
                {info.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  {info.label}
                </p>
                <p className="text-xs font-black text-slate-800 tracking-tight">
                  {info.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalMetrics;
