'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutOurBrand() {
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
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-24 bg-[#0E1D35] text-white rounded-3xl p-12"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={staggerChildren} initial="initial" animate="animate">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">Sobre Nuestra Marca</motion.h2>
          <motion.p variants={fadeIn} className="mb-6">
            ELIXERIUM ODOR es más que una marca de perfumes; es un viaje al mundo del arte olfativo. Nuestros maestros perfumistas combinan los mejores ingredientes para crear fragancias que evocan emociones, recuerdos y sueños.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button variant="outline" className="font-semibold border-white text-[#0E1D35]">
              Saber Más
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-80 rounded-2xl overflow-hidden flex items-center justify-center"
        >
          <Image
            src="/img/logogrande 1.png"
            alt="Nuestra Historia"
            width={350}
            height={350}
            className="mx-auto object-cover"
          />
        </motion.div>
      </div>
    </motion.section>
  );
} 