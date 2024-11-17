import { Card } from "@/components/ui/card";
import { Truck, Shield, CreditCard, Clock, ShoppingBag, Home } from "lucide-react";

export default function ServiceSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2C2F4]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0E1D35]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-wider text-[#0E1D35] leading-tight font-mono">
            EXPERIENCIA
            <br />
            DE LUJO
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Disfruta de una experiencia de compra premium con nuestros servicios exclusivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta de Envíos Nacionales */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <Truck className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Envíos Nacionales
                </h3>
                <p className="text-gray-600 text-sm">
                  Entrega rápida en todo el país
                </p>
              </div>
            </div>
          </Card>

          {/* Tarjeta de Garantías */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <Shield className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Garantías
                </h3>
                <p className="text-gray-600 text-sm">
                  Fragancias 100% auténticas
                </p>
              </div>
            </div>
          </Card>

          {/* Tarjeta de Métodos de Pago */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <CreditCard className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Métodos de Pago
                </h3>
                <p className="text-gray-600 text-sm">
                  Múltiples opciones seguras de pago
                </p>
              </div>
            </div>
          </Card>

          {/* Tarjeta de Pago en Casa */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <Home className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Pago en Casa
                </h3>
                <p className="text-gray-600 text-sm">
                  Disponible contra entrega
                </p>
              </div>
            </div>
          </Card>

          {/* Tarjeta de Pagos a Plazos */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <Clock className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Pagos a Plazos
                </h3>
                <p className="text-gray-600 text-sm">
                  Planes de pago flexibles
                </p>
              </div>
            </div>
          </Card>

          {/* Tarjeta de Proceso de Compra */}
          <Card className="p-6 bg-white/80 backdrop-blur-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#A2C2F4]/50">
            <div className="flex items-start space-x-4">
              <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-full border-2">
                <ShoppingBag className="w-6 h-6 text-[#0E1D35]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0E1D35] mb-2">
                  Proceso de Compra
                </h3>
                <p className="text-gray-600 text-sm">
                  Checkout simple y seguro
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}