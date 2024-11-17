'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturedImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#A2C2F4]/30 to-[#0E1D35]/30 rounded-3xl blur-3xl" />
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10 rounded-3xl overflow-hidden shadow-lg"
      >
        <Image
          src="/img/colonia2.png"
          alt="Botella de Perfume de Lujo"
          width={600}
          height={800}
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1D35]/50 to-transparent" />
        <div className="absolute bottom-4 left-6 p-6 text-white bg-gradient-to-t from-black/30 to-transparent rounded-3xl">
          <h2 className="text-3xl font-bold mb-2">Esencia de Elegancia</h2>
          <p className="text-lg">Descubre nuestra fragancia exclusiva</p>
        </div>
      </motion.div>

      {/* Tarjeta flotante */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute -bottom-6 right-6 lg:-right-14 z-20 transform scale-90 hover:scale-95 transition-transform duration-300"
      >
        <Card className="p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200">
          <div className="flex items-center gap-4">
            <Image
              src="/img/miniper.png"
              alt="Perfume Giorgia Armani"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#0E1D35]">Giorgia Armani</h3>
                <span className="bg-[#A2C2F4] text-[#0E1D35] text-xs px-2 py-1 rounded-full">Nuevo</span>
              </div>
              <p className="text-sm text-gray-600">Terra di Gioia</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#A2C2F4] fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(340 valoraciones)</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-[#0E1D35]">$150.40</span>
                <Button size="sm" className="bg-[#0E1D35] text-white hover:bg-[#0E1D35]/90">
                  Comprar Ahora
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
} 