import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SoulChatBot from "./SoulChatButton";
import SoulChatButton from "./SoulChatButton";

const SoulChatContainer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SoulChatButton onClick={() => setOpen(true)} />

      <AnimatePresence>
        {open && <SoulChatBot onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default SoulChatContainer;
