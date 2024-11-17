
import AboutOurBrand from "@/components/AboutOurBrand";
import DecorativeCircles from "@/components/DecorativeCircles";
import FeaturedImage from "@/components/FeaturedImage";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import IntroSection from "@/components/IntroSection";
import ServiceSection from "@/components/ServiceSection";

import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProsucts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Page() {

  
  const products = await getAllProducts();
  const categories = await getAllCategories();

  



  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Círculos decorativos de neón */}
      <DecorativeCircles />
      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <IntroSection />
          <FeaturedImage />
        </div>

        {/* Sección de Productos Destacados */}
       <FeaturedProducts products={products} categories={categories} />

        {/* About Our Brand Section */}
       <AboutOurBrand />
        <ServiceSection />
       </main>

       <Footer />
    </div>
  );
}