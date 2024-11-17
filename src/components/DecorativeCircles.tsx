'use client';

import { motion } from "framer-motion";

export default function DecorativeCircles() {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2C2F4]/30 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#0E1D35]/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
      />
    </div>
  );
} 