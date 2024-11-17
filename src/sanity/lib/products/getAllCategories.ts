import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";
import { Category } from "../../../../sanity.types";

export const getAllCategories = async (): Promise<Category[]> => {
    const ALL_CATEGORIES_QUERY = defineQuery(
        `*[_type == "category"] {
            _id,
            _type,
            title,
            slug,
            description
        } | order(title asc)`
    );

    try {
        const categories = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });
        return categories.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
