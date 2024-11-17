import ProductGrid from "@/components/productos/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/getProductsByName";
import { Producto } from "../../../../sanity.types";

async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{
        query: string;
    }>;
}) {

    const {query} = await searchParams;
    const products = await searchProductsByName(query);

    if (!products.length) {
        return <div>No se encontraron productos</div>;
    }



    return (
        <div>
            <h1>Resultados de la busqueda: {query}</h1>
            <ProductGrid productos={products as Producto[]} />
        </div>
    );
}

export default SearchPage;