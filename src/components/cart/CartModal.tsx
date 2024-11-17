'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useBasketStore from "../../../store/store"
import { formatPrice } from "@/lib/formatPrice"
import { imageUrl } from "@/lib/imageUrl"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import { useState } from "react"
import { createCheckoutSession, Metadata } from "../../../actions/createCheckoutSession"
import AddToBasketButton from "../productos/AddToBasketButton"

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
    const router = useRouter()
    const groupItems = useBasketStore((state) => state.getGroupedItems())
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)

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
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-mono font-bold text-[#0E1D35]">
                        Tu Carrito
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-grow mt-8 h-[65vh] pr-4">
                    {groupItems.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            Tu carrito está vacío
                        </div>
                    ) : (
                        groupItems.map((item) => (
                            <div key={item.producto._id} 
                                className="mb-6 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col  gap-4">
                                    <div 
                                        className="flex items-center cursor-pointer flex-grow"
                                        onClick={() => {
                                            router.push(`/producto/${item.producto?.slug?.current}`)
                                            onClose()
                                        }}
                                    >
                                        <div className="relative w-24 h-24 flex-shrink-0">
                                            {item.producto.image && (
                                                <Image
                                                    src={imageUrl(item.producto.image).url()}
                                                    alt={item.producto.name ?? "imagen del producto"}
                                                    fill
                                                    className="rounded-md object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="ml-4 flex-grow">
                                            <h3 className="font-semibold text-lg text-[#0E1D35] mb-1">
                                                {item.producto.name}
                                            </h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                                                <span>Precio unitario: {formatPrice(item.producto.price ?? 0)}</span>
                                                <span className="hidden sm:block">•</span>
                                                <span>Total: {formatPrice((item.producto.price ?? 0) * item.cantidad)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end sm:justify-center flex-shrink-0">
                                        <AddToBasketButton 
                                            product={item.producto} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </ScrollArea>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
                    <Separator className="mb-4" />
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-gray-600">
                            <span>Cantidad de productos:</span>
                            <span className="font-medium">
                                {groupItems.reduce((total, item) => total + item.cantidad, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-[#0E1D35]">
                            <span>Total:</span>
                            <span>
                                {formatPrice(useBasketStore.getState().getTotalPrice())}
                            </span>
                        </div>
                    </div>
                    
                    {isSignedIn ? (
                        <Button 
                            className="w-full bg-[#0E1D35] hover:bg-[#0E1D35]/90 text-white h-12 text-lg"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? "Procesando..." : "Finalizar compra"}
                        </Button>
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="w-full bg-[#0E1D35] hover:bg-[#0E1D35]/90 text-white h-12 text-lg">
                                Iniciar sesión para continuar
                            </Button>
                        </SignInButton>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
} 