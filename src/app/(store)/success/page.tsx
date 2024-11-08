'use client';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useBasketStore from "../../../../store/store";


function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearBasket = useBasketStore((state) => state.clearBasket);

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [orderNumber, clearBasket]);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
                <div className="mb-6">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Gracias por tu compra!</h1>
                    {orderNumber && (
                        <div className="bg-gray-50 p-4 rounded-md mt-4">
                            <p className="text-lg text-gray-600">
                                Tu número de orden es: <br/>
                                <span className="font-mono font-bold text-gray-800 text-xl">{orderNumber}</span>
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-2">
                            Seguir comprando
                        </Button>
                    </Link>
                    <Link href="/orders">
                        <Button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-2">
                            Ver mis ordenes
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;