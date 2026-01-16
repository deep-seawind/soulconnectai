import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IoChevronBack,
  IoChatbubbleEllipses,
  IoLocationSharp,
  IoShieldCheckmarkOutline,
  IoShareSocial, 
  IoFlashOutline, 
  IoCheckmarkCircle, 
} from "react-icons/io5";
import {
  FiMoon,
  FiCamera,
  FiMusic,
  FiCoffee,
  FiMap,
  FiBookmark,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import PersonalMetrics from "./PersonalMetrics";
import InterestsSection from "./InterestsSection";

const ProfileDetails = ({ profile, onBack }) => {
  const [saved, setSaved] = useState(false);

    const data = profile || {
        name: "Liam P",
        age: 38,
        location: "Chicago, USA",
        status: "Casual Fun",
        bio: "Architect by day, urban explorer by night. I believe the best stories are found between the pages of a passport and the bottom of a coffee cup. Looking for someone to share late-night jazz sessions and weekend gallery hops.",
        traits: [
        { icon: <FiMoon />, label: "Late Nights" },
        { icon: <FiCamera />, label: "Photography" },
        { icon: <FiMusic />, label: "Jazz" },
        { icon: <FiCoffee />, label: "Cold Brew" },
        { icon: <FiMap />, label: "Traveling" },
        ],
        image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
        compatibility: 92,
    };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT SIDE: FIXED HERO IMAGE */}
        <div className="relative w-full lg:w-1/2 h-[70vh] lg:h-screen lg:sticky lg:top-0 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover"
          />

          {/* BACK BUTTON */}

          <Link to={"/best-matches"} className="cursor-pointer">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="absolute top-8 left-8 p-4 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white shadow-2xl"
            >
              <IoChevronBack size={24} />
            </motion.button>
          </Link>

          {/* IMAGE OVERLAY GRADIENT */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden" />

          {/* Quick Actions */}
          <div className="absolute top-8 right-8 flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSaved(!saved)}
              className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl hover:shadow-amber-500/20 transition-all"
            >
              <FiBookmark
                size={20}
                className={
                  saved ? "text-amber-400 fill-amber-400" : "text-white"
                }
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl hover:shadow-indigo-500/20 transition-all"
            >
              <IoShareSocial size={20} />
            </motion.button>
          </div>

          <div className="absolute bottom-10 left-10 lg:hidden text-white">
            <h1 className="text-5xl font-black tracking-tighter">
              {data.name}, {data.age}
            </h1>
            <div className="flex items-center gap-2 mt-2 opacity-80">
              <IoLocationSharp />
              <span className="font-bold uppercase text-xs tracking-widest">
                {data.location}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE DETAILS */}
        <div className="w-full lg:w-1/2 px-6 py-12 lg:px-24 lg:py-28 bg-[#FAFBFF] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 blur-[120px] -z-10 rounded-full" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* 1. ULTRA-MODERN HEADER */}
            <div className="hidden lg:block mb-16">
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-4 py-2 bg-color text-sm font-bold rounded-2xl shadow-lg shadow-rose-200 flex items-center gap-2"
                >
                  <IoFlashOutline className="animate-pulse" />
                  {data.compatibility}% Match
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-5 py-2.5 bg-white border border-slate-100/80 rounded-2xl shadow-sm flex items-center gap-2 group cursor-help"
                >
                  <div className="relative">
                    <IoShieldCheckmarkOutline className="text-indigo-500 text-lg group-hover:scale-110 transition-transform" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border-2 border-white animate-ping" />
                  </div>
                  <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Identity Verified
                  </span>
                </motion.div>
              </div>

              <div className="relative">
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-7xl font-bold text-slate-950 tracking-[-0.04em] leading-[0.85] relative"
                >
                  {data.name}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-block align-top ml-2"
                  >
                    <IoCheckmarkCircle className="text-blue-500 text-5xl" />
                  </motion.span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10 flex items-center gap-6"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 rounded-xl text-indigo-600 border border-indigo-100/50 group cursor-pointer hover:bg-indigo-100 transition-colors">
                    <IoLocationSharp className="group-hover:bounce" />
                    <span className="font-black text-[11px] uppercase tracking-widest">
                      {data.location}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>


            {/* 3. BIO WITH TYPOGRAPHIC DEPTH */}
            <section className="mb-20 relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-0.5 w-12 bg-indigo-500" />
                <h3 className="text-lg font-semibold text-slate-600">
                  The Narrative
                </h3>
              </div>
              <div className="relative">
                <p className="text-xl text-slate-800">{data.bio}</p>
              </div>
            </section>

            
            {/* 2. STATS BENTO GRID (The "Data" Section) */}
            <PersonalMetrics />

            {/* 4. CHIP-STYLE INTERESTS GRID */}
          <InterestsSection data={data}/>

            {/* 5. FLOATING GLASS ACTION BAR */}
            <div className="sticky bottom-8 lg:relative lg:bottom-0">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-3 bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] flex items-center gap-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 h-20 bg-slate-950 text-white rounded-[2.2rem] font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <IoChatbubbleEllipses size={22} className="relative z-10" />
                  <span className="relative z-10">Start Chat</span>
                  <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                </motion.button>

                <div className="pr-2">
                  <HeartButton />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
