import Link from "next/link";
import { Producto } from "../../../sanity.types";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import { Card } from "@/components/ui/card"
import {  } from "@/components/ui/button"
import {  Star } from "lucide-react"
import AddToBasketButton from "./AddToBasketButton";


function ProductThumbnail({ producto }: { producto: Producto }) {
    const isOutOfStock = producto.stock != null && producto.stock <= 0;

    return (
        <Card className="overflow-hidden rounded-xl transition-shadow duration-300 hover:shadow-lg">
            <Link
                href={`/producto/${producto.slug?.current}`}
                className={`cursor-pointer ${isOutOfStock ? "opacity-50" : ""}`}
            >
                <div className="relative h-64">
                    {producto.image && (
                        <Image
                            src="/img/miniper.png"
                            //src={imageUrl(producto.image).url()} 
                            alt={producto.name || " imagen del producto"}
                            fill
                            objectFit="cover"
                            className="rounded-t-xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    <div className="absolute inset-0  to-transparent rounded-t-xl" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 bg-[#A2C2F4] text-[#0E1D35] px-3 py-1 rounded-full font-semibold text-xs shadow">
                        New
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/80 text-[#0E1D35] px-3 py-1 rounded-full font-semibold text-xs shadow">
                        {Array.isArray(producto.categories) && producto.categories.length > 0
                            ? producto.categories
                                .filter(cat => cat && typeof cat === 'object' && 'title' in cat)
                                .map(cat => cat.title)
                                .join(", ")
                            : "Sin categoría"
                        }
                    </div>

                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">Sin stock</span>
                        </div>
                    )}
                </div>

                <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-xl text-[#0E1D35] mb-2 truncate">
                        {producto.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-tight truncate h-4">
                        {producto.description
                            ?.map((block) =>
                                block._type === "block"
                                    ? block.children?.map((child) => child.text).join("")
                                    : "")
                            .join("") || "No descripción disponible"}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 3
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">
                            (0 reviews)
                        </span>
                    </div>
                </div>
            </Link>

            {/* Price and CTA - Fuera del Link para que el botón sea independiente */}
            <div className="px-6 pb-6">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-[#0E1D35]">
                        {formatPrice(producto.price || 0)}
                    </span>
                    <AddToBasketButton product={producto} disabled={isOutOfStock} simple />
                </div>
            </div>
        </Card>
    )
}

export default ProductThumbnail;