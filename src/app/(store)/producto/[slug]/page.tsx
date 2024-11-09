import AddToBasketButton from "@/components/productos/AddToBasketButton";
import { formatPrice } from "@/lib/formatPrice";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";


export const dynamic = "force-static";
export const revalidate = 60;



async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const product = await getProductBySlug(slug);
    
    console.log( crypto.randomUUID().slice(0, 5) +
    `referencia el productor page cache con ${slug}`);

    if (!product) {
        notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={` relative aspect-square w-full h-full overflow-hidden rounded-lg ,
                    ${isOutOfStock ? "opacity-50" : ""}`}>
                    {product.image && (
                        <Image src={imageUrl(product.image).url()}
                            alt={product.name || "imagen del producto"}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                        //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">Sin stock</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <div className="text-xl font-semibold mb-4">
                            {formatPrice(product.price || 0)}
                        </div>
                        <div className="prose max-w-none mb-4">
                            {Array.isArray(product.description) && (
                                <PortableText value={product.description} />
                            )

                            }
                        </div>
                    </div>
                    <div className="mt-6">
                        <AddToBasketButton product={product} disabled={isOutOfStock}/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;