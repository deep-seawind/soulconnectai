import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Screens
import SoulIntro from "./SoulIntro";
import SoulLogin from "./SoulLogin";

// Forms
import AICompatibility from "../Forms/ai-compatibility/AICompatibility"; 
import Education from "../Forms/education/Education";
import Family from "../Forms/family/Family";
import Lifestyle from "../Forms/lifestyle/Lifestyle";
import Personality from "../Forms/personality/Personality";
import Beliefs from "../Forms/beliefs/Beliefs";
import Communication from "../Forms/communication/Communication";
import Marriage from "../Forms/marriage/Marriage";
import Future from "../Forms/future/Future";
import Verification from "../Forms/verification/Verification";
import BasicInfo from "../Forms/basic-info/BasicInfo";

// Assets
import MainBanner from "../../../assets/main-hero/main.jpg";
import MainBannerGif from "../../../assets/main-hero/GIf-2.gif";
import Logo from "../../../assets/logo/logo.png";
import SoulChatContainer from "../../SoulSense/SoulChatContainer";


/* ---------------------------------------
   STORAGE KEYS
--------------------------------------- */
const STORAGE_KEYS = {
  SCREEN: "soul_screen",
  STEP: "soul_step",
  LOGGED_IN: "soul_logged_in",
};

const Home = () => {
  const navigate = useNavigate();

  /* ---------------------------------------
     STATE
  --------------------------------------- */
  const [screen, setScreen] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.SCREEN) || "intro"
  );

  const [step, setStep] = useState(
    () => Number(sessionStorage.getItem(STORAGE_KEYS.STEP)) || 1
  );

  const [isChanging, setIsChanging] = useState(false);

  // 🔥 MASTER FORM DATA (SINGLE SOURCE OF TRUTH)
  const [formData, setFormData] = useState({
    basicInfo: {},
    education: {},
    family: {},
    lifestyle: {},
    personality: {},
    beliefs: {},
    communication: {},
    marriage: {},
    future: {},
    compatibility: {},
    verification: {},
  });

  /* ---------------------------------------
     PERSIST STATE
  --------------------------------------- */
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.SCREEN, screen);
  }, [screen]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.STEP, step);
  }, [step]);

  /* ---------------------------------------
     LOGIN PROTECTION
  --------------------------------------- */
  useEffect(() => {
    const loggedIn = sessionStorage.getItem(STORAGE_KEYS.LOGGED_IN);
    if (!loggedIn && screen === "flow") {
      setScreen("login");
    }
  }, [screen]);

  /* ---------------------------------------
     STEP HANDLER
  --------------------------------------- */
  const nextStep = () => {
    setIsChanging(true);

    setTimeout(() => {
      if (step === 11) {
        sessionStorage.removeItem(STORAGE_KEYS.STEP);
        sessionStorage.removeItem(STORAGE_KEYS.SCREEN);

        navigate("/best-matches", {
          state: {
            profileData: formData, // 🔥 SEND FULL DATA
          },
        });
        return;
      }

      setStep((s) => s + 1);
      setIsChanging(false);
    }, 400);
  };

  const handleBack = () => {
    if (screen === "login") {
      setScreen("intro");
      return;
    }

    if (screen === "flow") {
      if (step > 1) {
        setStep((s) => s - 1);
      } else {
        setScreen("login");
      }
    }
  };

  /* ---------------------------------------
     FORMS MAP
  --------------------------------------- */
  const FORM_MAP = {
    1: (
      <BasicInfo
        onNext={(data) => {
          setFormData((p) => ({ ...p, basicInfo: data }));
          nextStep();
        }}
      />
    ),
    2: (
      <Education
        onNext={(data) => {
          setFormData((p) => ({ ...p, education: data }));
          nextStep();
        }}
      />
    ),
    3: (
      <Family
        onNext={(data) => {
          setFormData((p) => ({ ...p, family: data }));
          nextStep();
        }}
      />
    ),
    4: (
      <Lifestyle
        onNext={(data) => {
          setFormData((p) => ({ ...p, lifestyle: data }));
          nextStep();
        }}
      />
    ),
    5: (
      <Personality
        onNext={(data) => {
          setFormData((p) => ({ ...p, personality: data }));
          nextStep();
        }}
      />
    ),
    6: (
      <Beliefs
        onNext={(data) => {
          setFormData((p) => ({ ...p, beliefs: data }));
          nextStep();
        }}
      />
    ),
    7: (
      <Communication
        onNext={(data) => {
          setFormData((p) => ({ ...p, communication: data }));
          nextStep();
        }}
      />
    ),
    8: (
      <Marriage
        onNext={(data) => {
          setFormData((p) => ({ ...p, marriage: data }));
          nextStep();
        }}
      />
    ),
    9: (
      <Future
        onNext={(data) => {
          setFormData((p) => ({ ...p, future: data }));
          nextStep();
        }}
      />
    ),
    10: (
      <AICompatibility
        onNext={(data) => {
          setFormData((p) => ({ ...p, compatibility: data }));
          nextStep();
        }}
      />
    ),
    11: (
      <Verification
        onNext={(data) => {
          setFormData((p) => ({ ...p, verification: data }));
          nextStep(); // 🔥 FINAL SUBMIT
        }}
      />
    ),
  };

  /* ---------------------------------------
     UI
  --------------------------------------- */
  return (
    <div
      className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
          rgba(255,255,255,0),
          rgba(255,255,255,0)
        ), url('${MainBanner}')`,
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-65 h-32 md:w-600 md:h-310 overflow-hidden opacity-20 relative">
            <div
              className="absolute top-0 w-full h-[200%] bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: `url('${MainBannerGif}')` }}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center min-h-screen">
        {/* HEADER */}
        <header className="w-full container mx-auto px-8 py-8 lg:pt-16 pt-8 flex items-center justify-between z-20">
          <div className="w-32 flex justify-start">
            {screen !== "intro" && (
              <button
                onClick={handleBack}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/5 hover:bg-slate-900 text-slate-700 hover:text-white text-sm font-bold transition-all duration-300 border border-slate-200/50"
              >
                ← Back
              </button>
            )}
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="relative cursor-pointer"
          >
            <div className="relative px-8 py-4 bg-white border border-slate-100 rounded-xl shadow-lg">
              <img src={Logo} alt="Logo" className="w-28 md:w-36" />
            </div>
          </motion.div>

          <div className="w-32" />
        </header>

        {/* MAIN */}
        <main className="flex-1 w-full max-w-7xl px-6 flex items-center justify-center pb-20">
          <AnimatePresence mode="wait">
            {screen === "intro" && (
              <SoulIntro key="intro" onStart={() => setScreen("login")} />
            )}

            {screen === "login" && (
              <SoulLogin
                key="login"
                onSuccess={() => {
                  sessionStorage.setItem(STORAGE_KEYS.LOGGED_IN, "true");
                  setScreen("flow");
                }}
              />
            )}

            {screen === "flow" && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-[3rem] p-10 pt-20"
              >
                {FORM_MAP[step]}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <SoulChatContainer />

    </div>
  );
};

export default Home;
