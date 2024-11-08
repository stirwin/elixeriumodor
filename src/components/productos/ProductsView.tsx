import { Category, Producto } from "../../../sanity.types";
import { CategorySelectorComponent } from "./CategorySelectorComponent";

import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
    productos: Producto[];
    categories: Category[];
}

const ProductsView = ({ productos, categories }: ProductsViewProps) => {
    return (
        <div className="flex flex-col">
            {/*categorias*/}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />
            </div>

            {/*productos*/}
            <div className="flex-1">
                <div>
                    <ProductGrid productos={productos}  />

                    <hr className="w-1/2 sm:w-3/4 my-4" />
                </div>
            </div>

        </div>
    )
}

export default ProductsView;