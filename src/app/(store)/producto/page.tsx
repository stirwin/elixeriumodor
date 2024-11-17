import ProductGrid from "@/components/productos/ProductGrid";
import { Producto, Category } from "../../../../sanity.types";
import ProductFilter from "@/components/productos/ProductFilter";
import { CategorySelectorComponent } from "@/components/productos/CategorySelectorComponent";
import { getAllProducts } from "@/sanity/lib/products/getAllProsucts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
    const allProducts: Producto[] = await getAllProducts();
    const allCategories: Category[] = await getAllCategories();

    // Esperar a que se resuelvan los searchParams
    const params = await searchParams;
    const query = params.query || "";
    const selectedCategory = params.category || "";
    const minPrice = parseFloat(params.minPrice || "0");
    const maxPrice = parseFloat(params.maxPrice || "Infinity");
    const sortOrder = params.sortOrder || "name";

    // Filtrar productos por nombre, categoría y precio
    let filteredProducts = allProducts.filter(product => {
        const matchesQuery = query ? product.name.toLowerCase().includes(query.toLowerCase()) : true;
        const matchesCategory = selectedCategory ? product.categories?.some(cat => cat.slug === selectedCategory) : true;
        const matchesPrice = product.price && product.price >= minPrice && product.price <= maxPrice;
        return matchesQuery && matchesCategory && matchesPrice;
    });

    // Ordenar productos según el orden seleccionado
    filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === "price-asc") {
            return (a.price || 0) - (b.price || 0);
        } else if (sortOrder === "price-desc") {
            return (b.price || 0) - (a.price || 0);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold font-mono text-[#0E1D35] mb-8">
                    Nuestra colección
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-1/4">
                    <h2 className="text-xl font-semibold mb-2 font-mono">Categorías</h2>
                       <CategorySelectorComponent 
                            categories={allCategories} 
                            value={selectedCategory} 
                            isLandingPage={true} 
                        />
                          <ProductFilter />
                       
                    </aside>

                    <section className="w-full lg:w-3/4">
                        <ProductGrid productos={filteredProducts} gridCols={3} />
                    </section>
                </div>
            </main>
        </div>
    );
}