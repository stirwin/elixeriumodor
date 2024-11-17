import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"
import { Producto } from "../../../../sanity.types";

export const getAllProducts = async (): Promise<Producto[]> => {
    const ALL_PRODUCTS_QUERY = defineQuery(
        `*[_type == "producto"] {
            _id,
            _type,
            name,
            slug,
            image,
            description,
            price,
            stock,
            "categories": categories[]-> {
                _id,
                _type,
                title,
                "slug": slug.current,
                description
            }
        } | order(name asc)`
    );

    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY
        });
        return products.data || [];
    } catch (error) {
        console.error("Error fetching products:", error)
        return []
    }
}