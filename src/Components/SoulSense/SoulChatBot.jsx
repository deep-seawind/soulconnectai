import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiSmile, FiMoreHorizontal } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import Logo from "../../assets/logo/logo.png"

const SoulChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 💫 I’m SoulSense. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: input }]);
    setInput("");
    
    // Simulate thinking state
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: "I hear you ❤️ Tell me more." }]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 2 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-28 right-8 z-100 w-95 h-145 bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/40"
    >
      {/* 1. DYNAMIC HEADER */}
      <div className="relative px-6 py-6 bg-slate-950 text-white overflow-hidden">
        {/* Animated Background Aura */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/30 blur-3xl rounded-full -mr-10 -mt-10" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-xl shadow-lg">
                <img src={Logo} alt="" className="p-1"/>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-4 border-slate-950 rounded-full" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                SoulSense <IoSparkles className="text-amber-400 text-xs" />
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">AI Emotional Guide</p>
            </div>
          </div>
          <div className="flex gap-2"> 
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-rose-500 rounded-xl transition-all"><FiX /></button>
          </div>
        </div>
      </div>

      {/* 2. CONVERSATION CANVAS */}
      <div ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto scroll-smooth">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.from === "user" ? 20 : -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-5 py-3.5 shadow-sm ${
                  msg.from === "user"
                    ? "bg-slate-900 text-white rounded-3xl rounded-tr-none shadow-indigo-200/20"
                    : "bg-white border border-slate-100 text-slate-700 rounded-3xl rounded-tl-none"
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <span className={`text-[8px] mt-1 block opacity-40 font-bold ${msg.from === "user" ? "text-right" : "text-left"}`}>
                  12:45 PM
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. PREMIUM INPUT DOCK */}
      <div className="p-6 bg-white/50 border-t border-slate-50">
        <div className="relative flex items-center bg-white rounded-4xl border border-slate-200 p-1.5 shadow-inner group focus-within:border-indigo-500 transition-all">
          <button className="p-3 text-slate-400 hover:text-indigo-500 transition-colors">
            <FiSmile size={20} />
          </button>
          
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="How's your heart today?..."
            className="flex-1 px-2 bg-transparent text-sm font-medium outline-none text-slate-700 placeholder:text-slate-300"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            className="w-12 h-12 bg-color rounded-full flex items-center justify-center shadow-xl hover:bg-indigo-600 transition-all"
          >
            <FiSend size={18} />
          </motion.button>
        </div>
        <p className="text-center text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
          End-to-End Encrypted Soul-Space
        </p>
      </div>
    </motion.div>
  );
};

export default SoulChatBot;