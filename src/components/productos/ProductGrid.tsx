"use client";
import { Producto } from "../../../sanity.types";
import { AnimatePresence, motion, } from "framer-motion";
import ProductThumbnail from "./ProductThumbnail";

interface ProductGridProps {
    productos: Producto[];
    maxProducts?: number;
    gridCols?: 3 | 4;
}

function ProductGrid({ productos, maxProducts, gridCols = 3 }: ProductGridProps) {
    const displayProducts = maxProducts ? productos.slice(0, maxProducts) : productos;

    const gridColsClass = gridCols === 4 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" 
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    return (
        <div className={`mt-5 lg:col-span-3 grid ${gridColsClass} gap-6`}>
           {displayProducts?.map((producto) => {
            return (
                <AnimatePresence key={producto._id}>
                    <motion.div
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0}}
                        className="flex justify-center"
                    >
                        <ProductThumbnail key={producto._id} producto={producto} />
                    </motion.div>
                </AnimatePresence>
           );
        })}
        </div>
    )
}

export default ProductGrid;