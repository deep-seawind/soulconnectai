import React, { useEffect, useRef, useState } from "react";
import maleAvatar from "../../../assets/main-hero/male-avatr.jpg";
import femaleAvatar from "../../../assets/main-hero/ai-avtar.jpg";


const AIMessage = ({ step, name, isAnimating, customMessage }) => {
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [slideIn, setSlideIn] = useState(false);
  const [avatar, setAvatar] = useState(femaleAvatar); // default
  const prevMessageRef = useRef("");

  useEffect(() => {
    const gender = localStorage.getItem("gender");

    if (gender === "Male") {
      setAvatar(femaleAvatar);
    } else if (gender === "Female") {
      setAvatar(maleAvatar);
    } else {
      setAvatar(femaleAvatar);
    }
  }, []);

  const formatMessage = (message) => {
    if (!name || step === 1) return message;
    return `${name}, ${message}`;
  };

  useEffect(() => {
    if (!customMessage) return;

    const finalMessage = formatMessage(customMessage);
    const isNewMessage = prevMessageRef.current !== finalMessage;
    prevMessageRef.current = finalMessage;

    let index = 0;
    setDisplayedMessage("");

    if (isNewMessage) {
      setSlideIn(false);
      requestAnimationFrame(() => setSlideIn(true));
    }

    const interval = setInterval(() => {
      setDisplayedMessage(finalMessage.slice(0, index + 1));
      index++;

      if (index >= finalMessage.length) clearInterval(interval);
    }, 5);

    return () => clearInterval(interval);
  }, [customMessage, name, step]);

  return (
    <div className="relative w-full max-w-lg perspective-1000">
      {/* Message Wrapper */}
      <div className="relative min-h-45">
        {/* Message Bubble */}
        <div
          className={`
        relative z-20 p-8 md:p-10
        bg-white rounded-[2.5rem] rounded-bl-none
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${slideIn ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}
        ${isAnimating ? "scale-95 blur-sm" : "scale-100"}
      `}
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-[2.5rem] rounded-bl-none bg-linear-to-br from-white/40 to-transparent pointer-events-none" />

          <p className="relative z-10 text-xl md:text-xl font-semibold leading-relaxed tracking-tight">
            {displayedMessage}
            <span className="inline-block w-1.5 h-6 ml-2 bg-color animate-pulse rounded-full align-middle" />
          </p>
        </div>

        {/* Avatar (Fixed Position) */}
        <div
          className={`
        absolute -bottom-90 -left-44
        flex items-center gap-4
        transition-all duration-700
        ${
          isAnimating ? "opacity-0 -translate-x-6" : "opacity-100 translate-x-0"
        }
      `}
        >
          <img
            src={avatar}
            alt="AI Assistant"
            className="w-16 h-16 md:w-60 md:h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AIMessage;
