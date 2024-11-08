'use client';
import { useEffect, useState } from "react";
import { Producto } from "../../../sanity.types";
import useBasketStore from "../../../store/store";

interface AddToBasketButtonProps {
    product: Producto;
    disabled?: boolean;
}

function AddToBasketButton({product, disabled}: AddToBasketButtonProps) {
 
    const {addItem, removeItem, getItemCount} = useBasketStore();
    const itemCount = getItemCount(product._id);

    const [isClient, setIsClient] = useState(false);

    useEffect(()=>{
        setIsClient(true);
    }, []);

    if(!isClient) return null;
 
    return (
    <div className="flex items-center justify-center space-x-2">
        <button 
         onClick={()=> removeItem(product._id)}
         className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${itemCount == 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"}`}
              disabled={itemCount === 0 || disabled}
        >
            <span className={`text-xl font-bold ${itemCount === 0 ? "text-gray-500" : "text-white"}`}>
                -
            </span>
        </button>
        <span className="w-8 text-center">{itemCount}</span>
        <button 
         onClick={()=> addItem(product)}
         className={`w-8 h-8 rounded-full flex items-center justify-center
            ${disabled 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-black text-white hover:bg-gray-800 active:bg-gray-900"}`}
         disabled={disabled}
        >
            <span className={`text-xl font-bold ${disabled ? "text-gray-500" : "text-white"}`}>
                +
            </span>
        </button>
    </div>
  )
}

export default AddToBasketButton