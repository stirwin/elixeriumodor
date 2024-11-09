
import BlackFrydayBanner from "@/components/BlackFrydayBanner";
import ProductsView from "@/components/productos/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProsucts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log( crypto.randomUUID().slice(0, 5) +
  `referencia el home page cache con ${products.length} productor y ${categories.length} categorias`);
  
  return (
    <div className="">
      
     <BlackFrydayBanner />
      
     {/* todos los productos */}
     <div className="flex flex-col items-center justify-top min-h-screen p-4 bg-gray-100">
        <ProductsView productos={products} categories={categories} />
     </div>
    </div>
  );
}
