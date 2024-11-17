import { Category, Producto } from "../../../sanity.types";
import { CategorySelectorComponent } from "./CategorySelectorComponent";

import ProductGrid from "./ProductGrid";
import Link from "next/link";

interface ProductsViewProps {
    productos: Producto[];
    categories: Category[];
    maxProducts?: number;
    gridCols?: 3 | 4;
}

const ProductsView = ({ productos, categories, maxProducts, gridCols = 4 }: ProductsViewProps) => {
    return (
        <>
            <section className="w-full mt-24  mb-8 bg-white ">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-[#0E1D35] leading-tight font-mono text-center md:text-left">
                        FEATURED
                        <br />
                        FRAGRANCES
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
                        <CategorySelectorComponent categories={categories} isLandingPage={true}/>
                        <Link href="/producto" className="text-sm text-nowrap bg-[#0E1D35] text-white hover:bg-[#0E1D35]/90 rounded-md px-2 py-2 font-semibold transition-colors duration-300 w-full sm:w-auto text-center">
                            Ver todos
                        </Link>
                    </div>
                </div>
                {/*productos*/}

               
                    <ProductGrid 
                        productos={productos} 
                        maxProducts={maxProducts} 
                        gridCols={gridCols}
                    />
                    

            </section>
        </>
    )
}

export default ProductsView;