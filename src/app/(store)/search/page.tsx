import ProductGrid from "@/components/productos/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/getProductsByName";

async function SearchPage({
    searchParams,
}: {
    searchParams: {
        query: string;
    };
}) {

    const {query} = await searchParams;
    const products = await searchProductsByName(query);

    if (!products.length) {
        return <div>No se encontraron productos</div>;
    }



    return (
        <div>
            <h1>Resultados de la busqueda: {query}</h1>
            <ProductGrid productos={products} />
        </div>
    );
}

export default SearchPage;