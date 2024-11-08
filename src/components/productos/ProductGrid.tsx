"use client";
import { Producto } from "../../../sanity.types";
import { AnimatePresence, motion, } from "framer-motion";
import ProductThumbnail from "./ProductThumbnail";



function ProductGrid({ productos }: { productos: Producto[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {productos?.map((producto) => {
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