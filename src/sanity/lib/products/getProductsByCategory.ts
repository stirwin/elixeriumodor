import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";
import { Producto } from "../../../../sanity.types";

type ProductQueryResult = {
    _id: string;
    _type: string;
    name?: string;
    slug?: { current: string };
    image?: { asset: { _ref: string } };
    description?: string;
    price?: number;
    stock?: number;
    categories?: Array<{ _ref: string }>;
};

export const  getProductsByCategory = async (categorySlug: string): Promise<Producto[]> => {

     const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
       *[
        _type == "producto"
         && references(*[_type == "category" && slug.current == $categorySlug]._id)
         ] | order(name asc)
     `);

     try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categorySlug
            },
        });

        return (products.data || []).map((product: ProductQueryResult) => ({
            _id: product._id,
            _type: product._type,
            name: product.name || "Nombre no disponible",
            slug: product.slug,
            image: product.image,
            description: product.description || "Descripción no disponible",
            price: product.price || 0,
            stock: product.stock || 0,
            categories: product.categories || [],
        })) as Producto[];
     } catch (error) {
        console.error("Error al obtener productos por categoria:", error);
        return [];
     }
}
