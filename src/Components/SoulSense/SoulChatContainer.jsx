import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SoulChatBot from "./SoulChatBot";
import SoulChatButton from "./SoulChatButton";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "1234567890"; // ← your WhatsApp number (with country code)
const WHATSAPP_MESSAGE = "Hi, I need help!";

const SoulChatContainer = () => {
  const [open, setOpen] = useState(false);

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <> 
    <div className="flex items-center">
      <SoulChatButton onClick={() => setOpen(true)} />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={openWhatsApp}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          backgroundColor: "#25D366",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        }}
        aria-label="WhatsApp Chat"
      >
        <FaWhatsapp size={28} color="#fff" />
      </motion.button>
</div>
      <AnimatePresence>
        {open && <SoulChatBot onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default SoulChatContainer;
