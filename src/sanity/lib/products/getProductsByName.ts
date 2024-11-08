import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"; 


export const searchProductsByName = async (searchParam: string) => {
    
    const PRODUCTS_SEARCH_QUERY = defineQuery(`
     *[_type == "producto" 
        && name match $searchParam
        ] | order(name asc)
    `);

    try {
        const products = await sanityFetch({
            query: PRODUCTS_SEARCH_QUERY,
            params: {
                searchParam: `${searchParam}*`, // para que busque productos que contengan el parametro de busqueda
            },
        });
        
        return products.data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}