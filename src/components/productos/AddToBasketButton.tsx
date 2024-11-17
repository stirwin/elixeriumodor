'use client';
import { useEffect, useState } from "react";
import { Producto } from "../../../sanity.types";
import useBasketStore from "../../../store/store";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToBasketButtonProps {
    product: Producto;
    disabled?: boolean;
    simple?: boolean;
}

function AddToBasketButton({ product, disabled, simple }: AddToBasketButtonProps) {
    const { addItem, removeItem, getItemCount } = useBasketStore();
    const itemCount = getItemCount(product._id);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    if (simple) {
        return (
            <Button
                onClick={() => addItem(product)}
                disabled={disabled}
                className={`${
                    disabled 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                        : "bg-[#0E1D35] text-white hover:bg-[#0E1D35]/90 p-3"
                }`}
            >
                <span>Añadir</span>
                <ShoppingCart className="w-5 h-5 mr-2" />
                
            </Button>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(product._id)}
                    disabled={itemCount === 0 || disabled}
                    className={`${itemCount === 0 ? "text-gray-500 cursor-not-allowed" : "text-black hover:bg-gray-100"}`}
                >
                    <Minus className="w-4 h-4" />
                </Button>

                <input
                    type="number"
                    min="0"
                    value={itemCount}
                    readOnly
                    className="w-16 text-center border-none"
                />

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => addItem(product)}
                    disabled={disabled}
                    className={`${disabled ? "text-gray-500 cursor-not-allowed" : "text-black hover:bg-gray-100"}`}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <Button 
                onClick={() => addItem(product)}
                disabled={disabled}
                className={`flex-1 ${
                    disabled 
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                        : "bg-[#0E1D35] text-white hover:bg-[#0E1D35]/90 w-full"
                }`}
            >
               <ShoppingCart className="w-5 h-5 mr-2" /> 
               <span>Añadir a</span>
            </Button>
        </div>
    );
}

export default AddToBasketButton;