"use client"

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useBasketStore from "../../../../store/store"
import { useState, useEffect, use } from "react";
import AddToBasketButton from "@/components/productos/AddToBasketButton";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import { createCheckoutSession, Metadata } from "../../../../actions/createCheckoutSession";

const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        // Multiplicamos por 1000 para convertir a miles
        }).format(price * 1000);
};

function basketPage() {

    const groupItems = useBasketStore((state) => state.getGroupedItems());
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <Loader />;
    }

    if (groupItems.length === 0) {
        return (
            <div className="container mx-auto p-4 max-w-6xl">
                <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            </div>
        );
    }

    const handleCheckout = async () => {
        if (!isSignedIn) return;
        setIsLoading(true);

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
                clerkUserId: user!.id,
            };

            const checkoutUrl = await createCheckoutSession(groupItems, metadata);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            }
        } catch (error) {
            console.error("Error al finalizar la compra:", error);
        } finally {
            setIsLoading(false);
        }
    }   

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {groupItems?.map((item) => (
                        <div key={item.producto._id}
                            className="mb-4 p-4 border rounded-md flex items-center justify-between">
                            <div className="flex items-center cursor-pointer flex-1 min-w-0"
                                onClick={() => router.push(`/producto/${item.producto?.slug?.current}`)}
                            >
                                <div className="w-20 h-20 sm:h-24 flex-shrink-0 mr-4">
                                    {item.producto.image && (
                                        <Image
                                            src={imageUrl(item.producto.image).url()}
                                            alt={item.producto.name ?? "imagen del producto"}
                                            width={96}
                                            height={96}
                                            className="object-cover w-full h-full rounded"
                                        />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg font-semibold truncate">{item.producto.name}</h2>
                                    <p className="text-gray-500">Precio: 
                                        {formatPrice((item.producto.price ?? 0) * item.cantidad)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToBasketButton product={item.producto} />
                            </div>
                        </div>

                    ))}
                </div>

                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit border rounded p-6
                                order-first lg:order-last fixed bottom-0 left-0 lg:left-auto ">
                    <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items:</span>
                            <span>{groupItems.reduce((total, item) => total + item.cantidad, 0)}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Total:</span>
                            <span>
                                {formatPrice(useBasketStore.getState().getTotalPrice())}
                            </span>
                        </p>
                    </div>  
                    {isSignedIn ? (
                        <button
                         onClick={handleCheckout}
                         disabled={isLoading}
                         className="w-full bg-black text-white p-2 rounded mt-4"
                        >
                            {isLoading ? "Procesando..." : "Finalizar compra"}
                        </button>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="w-full bg-black text-white p-2 rounded mt-4">
                                Iniciar sesión para continuar
                            </button>
                        </SignInButton>
                    )}              
                </div>


            </div>
        </div>
    )
}

export default basketPage