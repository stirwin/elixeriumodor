'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IntroSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      <motion.div variants={fadeIn} className="relative">
        <h1 className="text-5xl lg:text-7xl font-bold tracking-wider text-[#0E1D35] leading-tight font-mono">
          HISTORIAS DE
          <br />
          FRAGANCIAS DE LUJO
        </h1>
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="mt-6 flex items-center gap-8"
        >
          <motion.div variants={fadeIn} className="flex items-center gap-2">
            <div className="text-4xl font-bold text-[#0E1D35]">4.8</div>
            <div className="flex flex-col">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#A2C2F4] fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-600">Reseñas</p>
            </div>
          </motion.div>
          <div className="h-12 w-px bg-gray-300"></div>
          <motion.div variants={fadeIn} className="relative">
            <div className="bg-[#0E1D35] text-white rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-xl font-bold">1180+</span>
              <span className="text-sm">Productos</span>
            </div>
            <svg className="absolute -left-16 top-1/2 -translate-y-1/2" width="60" height="30">
              <path d="M5 15 L55 15" stroke="#A2C2F4" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-lg">
        Nuestra exclusiva colección de perfumes ha sido meticulosamente elaborada para envolverte en un mundo de lujo y sofisticación.
      </motion.p>
      <motion.div variants={fadeIn} className="flex gap-4">
        <Button className="bg-[#0E1D35] text-white hover:bg-[#0E1D35]/90">
          Únete a Nosotros
        </Button>
        <Button variant="outline" className="text-[#0E1D35] border-[#0E1D35] hover:bg-[#0E1D35]/10">
          Explorar Más
        </Button>
      </motion.div>
      <motion.div variants={fadeIn} className="flex gap-8">
        <div>
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-8 h-8 rounded-full bg-[#A2C2F4] border-2 border-white"
              />
            ))}
          </div>
          <p className="mt-2 text-[#0E1D35]">
            <span className="font-bold">2K+</span>
            <br />
            Clientes Satisfechos
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
} 