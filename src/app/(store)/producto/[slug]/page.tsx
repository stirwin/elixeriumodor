import { ArrowLeft, Heart, Share2, Star } from "lucide-react"
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AddToBasketButton from "@/components/productos/AddToBasketButton"
import { imageUrl } from "@/lib/imageUrl"
import { formatPrice } from "@/lib/formatPrice"
import { PortableText } from "next-sanity"
import { Producto } from "../../../../../sanity.types"

export const dynamic = "force-static"
export const revalidate = 60

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
        notFound()
    }

    const isOutOfStock = product.stock != null && product.stock <= 0

    return (
        <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
              {/* Decorative neon circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#A2C2F4]/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0E1D35]/20 rounded-full blur-3xl hidden md:block" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#A2C2F4]/20 rounded-full blur-2xl" />

            <Link href="/producto" className="inline-flex items-center text-[#0E1D35] hover:text-[#A2C2F4] mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Productos
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Imagen del producto */}
                <div className="relative">
                    {product.image && (
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name || "imagen del producto"}
                            width={600}
                            height={600}
                            className="rounded-lg shadow-lg object-cover"
                        />
                    )}
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <Button size="icon" variant="secondary" className="bg-white/80 hover:bg-white">
                            <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="bg-white/80 hover:bg-white">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                    {isOutOfStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                            <span className="text-white text-lg font-bold">Sin stock</span>
                        </div>
                    )}
                </div>

                {/* Información del producto */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold font-mono text-[#0E1D35]">{product.name}</h1>
                    <div className="prose max-w-none text-gray-600 text-lg">
                        {Array.isArray(product.description) && (
                            <PortableText value={product.description} />
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">(0 reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-[#0E1D35]">
                        {formatPrice(product.price || 0)}
                    </div>

                    
                        <AddToBasketButton
                            product={product as Producto}
                            disabled={isOutOfStock}
                        />
                   

                    {/* Características del producto */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">¿Por qué elegir Elixerium Odor?</h2>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Star className="w-5 h-5 text-[#A2C2F4] mr-2" />
                                <span>Fragancias lujosas y duraderas</span>
                            </li>
                            <li className="flex items-center">
                                <Star className="w-5 h-5 text-[#A2C2F4] mr-2" />
                                <span>Ingredientes de origen ético</span>
                            </li>
                            <li className="flex items-center">
                                <Star className="w-5 h-5 text-[#A2C2F4] mr-2" />
                                <span>Empaque elegante y sostenible</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductPage