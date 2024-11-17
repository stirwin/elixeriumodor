'use client';

import { motion } from "framer-motion";
import ProductsView from "@/components/productos/ProductsView";
import { Category } from "../../sanity.types";
import { Producto } from "../../sanity.types";

interface FeaturedProductsProps {
  products: Producto[];
  categories: Category[];
}

export default function FeaturedProducts({ products, categories }: FeaturedProductsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ProductsView
        productos={products}
        categories={categories}
        maxProducts={4}
      />
    </motion.div>
  );
} 