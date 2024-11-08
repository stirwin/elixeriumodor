import ProductsView from '@/components/productos/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
 
    const {slug} = await params;

    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    
    

    
    return (
        <div className='flex flex-col items-center justify-top min-h-screen p-4 bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-4xl'>
                <h1 className='text-2xl font-bold mb-4'>
                    Categoria {slug
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}{""}
                    
                   
                </h1>
                <ProductsView productos={products} categories={categories} />
            </div>
        </div>
  )
}

export default CategoryPage;
