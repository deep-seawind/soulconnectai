import { motion } from "framer-motion";
import {
  IoChatbubbleEllipses,
  IoLocationSharp,
  IoCheckmarkCircle,
  IoFlash,
  IoShieldCheckmark,
} from "react-icons/io5";
import { FiMoon, FiCamera, FiMusic, FiCoffee, FiMap } from "react-icons/fi";
import HeartButton from "./HeartButton";
import PersonalMetrics from "./PersonalMetrics";
import InterestsSection from "./InterestsSection";
import ProfileSlider from "./ProfileSlider";

const ProfileDetails = ({ profile, onBack }) => {
  const data = profile || {
    name: "Liam P",
    age: 38,
    location: "Chicago, USA",
    status: "Casual Fun",
    bio: "Architect by day, urban explorer by night. I believe the best stories are found between the pages of a passport and the bottom of a coffee cup. Forever chasing cities with character, hidden cafés, and museums that make you lose track of time. Looking for someone to share late-night jazz sessions, weekend gallery hops, and flights booked on impulse. Bonus points if you love conversations that start small and end somewhere unexpected.",
    traits: [
      { icon: <FiMoon />, label: "Late Nights" },
      { icon: <FiCamera />, label: "Photography" },
      { icon: <FiMusic />, label: "Jazz" },
      { icon: <FiCoffee />, label: "Cold Brew" },
      { icon: <FiMap />, label: "Traveling" },
    ],
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
    ],
    compatibility: 92,
  };

  return (
    <div className="min-h-screen bg-white  ">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <ProfileSlider data={data} onBack={onBack} />

        <div className="w-full lg:w-1/2 px-6 py-12 lg:px-24 lg:py-28 bg-[#FAFBFF] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 blur-[120px] -z-10 rounded-full" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden lg:block mb-20 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.05, x: 0 }}
                transition={{ duration: 2 }}
                className="absolute top-16 left-2 text-8xl font-bold text-slate-900 select-none pointer-events-none tracking-tighter"
              >
                {data.name}
              </motion.div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative group overflow-hidden px-6 py-2.5 bg-slate-900 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-500 hover:shadow-indigo-500/20"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-20 group-hover:opacity-40 transition-opacity" />
                  <IoFlash className="text-amber-400 animate-bounce" />
                  <span className="text-white text-sm font-bold tracking-wider uppercase">
                    {data.compatibility}% Match
                  </span>
                  {/* Animated Shine */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl flex items-center gap-2 group cursor-pointer hover:border-emerald-200 transition-all shadow-sm"
                >
                  <div className="relative">
                    <IoShieldCheckmark className="text-emerald-500 text-xl" />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"
                    />
                  </div>
                  <span className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Identity Verified
                  </span>
                </motion.div>
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl xl:text-8xl font-bold text-slate-900 tracking-tight leading-[0.8] mb-4"
                  >
                    {data.name}
                    <motion.span
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", damping: 12 }}
                      className="inline-block align-top ml-4"
                    >
                      <div className="relative">
                        <IoCheckmarkCircle className="text-blue-600 text-6xl shadow-blue-500/50" />
                      </div>
                    </motion.span>
                  </motion.h1>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 flex items-center gap-8"
                >
                  {/* Location Chip */}
                  <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <IoLocationSharp className="text-rose-500 relative z-10 group-hover:scale-125 transition-transform" />
                    <span className="font-bold text-[12px] text-slate-700 uppercase tracking-[0.2em] relative z-10">
                      {data.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 tracking-tighter">
                        1.2k
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Connects
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900 tracking-tighter">
                        Gold
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Tier
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <section className="mb-20 relative">
              <h2 className="text-4xl font-bold text-slate-900  ">About Me</h2>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "4rem" }}
                className="h-1 bg-color-border my-4 rounded-full"
              />
              <div className="relative">
                <p className="text-lg text-slate-800">{data.bio}</p>
              </div>
            </section>

            <PersonalMetrics />

            <InterestsSection data={data} />

            <div className="sticky bottom-8 lg:relative lg:bottom-0">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-3 bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] flex items-center gap-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 h-20 bg-slate-950 text-white rounded-[2.2rem] font-bold text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 relative overflow-hidden group"
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
