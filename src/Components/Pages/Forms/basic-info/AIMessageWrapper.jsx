import React from "react";
import { motion } from "framer-motion"; 
import AIMessage from "../../Home/AIMessage";

const AIMessageWrapper = ({ step, field }) => (
  <div className="flex justify-start lg:-mt-10">
    <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      <AIMessage step={step + 1} customMessage={field.message} />
    </motion.div>
  </div>
);

export default AIMessageWrapper;
