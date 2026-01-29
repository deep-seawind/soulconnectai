import React from "react";
import { motion } from "framer-motion";
import { 
  IoLocationSharp, 
  IoFlame, 
  IoCheckmarkCircle, 
  IoCloseOutline, 
  IoHeart,
  IoArrowBack 
} from "react-icons/io5"; 
import { FiMoon, FiCamera } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const matches = [
  {
    id: 1,
    name: "Liam P",
    age: 38,
    location: "Chicago, USA",
    status: "Casual Fun",
    traits: [
      { icon: <FiMoon />, label: "Late Nights" },
      { icon: <FiCamera />, label: "Photography" },
    ],
    moreTraits: 14,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Aarav M",
    age: 29,
    location: "Mumbai, IND",
    status: "Serious Only",
    traits: [
      { icon: <IoFlame />, label: "Fitness" },
      { icon: <FiCamera />, label: "Travel" },
    ],
    moreTraits: 8,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Riya S",
    age: 27,
    location: "London, UK",
    status: "Exploring",
    traits: [
      { icon: <FiMoon />, label: "Deep Talk" },
      { icon: <FiCamera />, label: "Art" },
    ],
    moreTraits: 12,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
  },
];

const BestMatches = () => {
  const navigate = useNavigate();

  const handleBackToVerification = () => {
    // Navigate back to verification page
    navigate('/verification-status');
  };

  return (
    <div className="min-h-screen  ">
      {/* SOFT AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* BACK BUTTON */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToVerification}
          className="mb-8 flex items-center gap-3 px-6 py-3 bg-color rounded-full shadow-lg cursor-pointer "
        >
          <IoArrowBack 
            size={20} 
            className=" " 
          />
          <span className="text-sm font-semibold ">
            Back to Verification
          </span>
        </motion.button>

        {/* SECTION TITLE */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-6xl font-bold tracking-tight text-slate-900 mb-3 text-center"
        >
          Your Top Matches.
        </motion.h1>

        <p className="text-slate-500 text-lg font-medium mb-20 text-center">
          Handpicked souls aligned with your values, energy, and future vision.
        </p>

        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group aspect-3/4 rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] bg-white cursor-pointer"
            >
              <Link to={"/profile-details"}>
                {/* IMAGE WITH ZOOM EFFECT */}
                <div className="aspect-4/5 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    src={match.image}
                    alt={match.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Multi-layered Vignette */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />
                </div>

                {/* FLOATING ACTION BUTTONS */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:-translate-y-2">
                  <button className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-rose-500 transition-all active:scale-90">
                    <IoCloseOutline size={28} />
                  </button>
                  <button className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all active:scale-90">
                    <IoHeart size={28} />
                  </button>
                </div>

                {/* TOP STATUS BADGE - LIGHT VERSION */}
                <div className="absolute top-8 left-8">
                  <div className="px-5 py-2 bg-white backdrop-blur-md border border-white/40 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                      {match.status}
                    </span>
                  </div>
                </div>

                {/* BOTTOM GRADIENT - SOFT & DEEP */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/80 to-transparent opacity-90" />

                {/* CONTENT OVERLAY */}
                <div className="absolute bottom-10 left-8 right-8 text-white">
                  {/* LOCATION */}
                  <div className="flex items-center gap-2 mb-2 opacity-90">
                    <IoLocationSharp size={16} />
                    <span className="text-sm font-bold tracking-wide uppercase">
                      {match.location}
                    </span>
                  </div>

                  {/* NAME & VERIFIED */}
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-4xl font-bold tracking-tight leading-none">
                      {match.name},{" "}
                      <span className="font-light">{match.age}</span>
                    </h2>
                    <IoCheckmarkCircle
                      className="text-blue-400 drop-shadow-md"
                      size={28}
                    />
                  </div>

                  {/* TRAIT BADGES (GLASS) */}
                  <div className="flex flex-wrap items-center gap-2">
                    {match.traits.map((trait, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/30 transition-all"
                      >
                        <span className="text-amber-400 drop-shadow-sm">
                          {trait.icon}
                        </span>
                        <span className="text-[12px] font-bold tracking-tight text-white">
                          {trait.label}
                        </span>
                      </div>
                    ))}

                    {/* +N BADGE */}
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                      <span className="text-[12px] font-black text-white/70">
                        +{match.moreTraits}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestMatches;