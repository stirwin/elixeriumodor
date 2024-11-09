import Link from "next/link";
import { Producto } from "../../../sanity.types";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { formatPrice } from "@/lib/formatPrice";


function ProductThumbnail({ producto }: { producto: Producto }) {
    const isOutOfStock = producto.stock != null && producto.stock <= 0;

    return (
        <Link href={`/producto/${producto.slug?.current}`}
            className={`group flex flex-col bg-white rounded-lg border overflow-hidden
       ${isOutOfStock ? "opacity-50" : ""}`}
        >
            <div className="relative  aspect-square w-full h-full overflow-hidden">
                {producto.image && (
                    <Image src={imageUrl(producto.image).url()} alt={producto.name || " imagen del producto"} fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Sin stock</span>
                    </div>
                )}
            </div>

            <div className="p-4" >
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {producto.name} </h2>
            
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {producto.description
                    ?.map((block)=>
                    block._type==="block"
                    ? block.children?.map((child)=>child.text).join("")
                :"")
                .join("") || "No descripción disponible"}
                </p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                   {formatPrice(producto.price || 0)}
                </p>
            
            </div>

        </Link>
    )
}

export default ProductThumbnail;