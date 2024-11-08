import { Producto } from "../sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasketItem {
    producto: Producto;
    cantidad: number;
}

interface BasketState {
    items: BasketItem[];
    addItem: (producto: Producto) => void;
    removeItem: (productoId: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productoId: string) => number;
    getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            // Función para añadir un producto al carrito
            addItem: (producto) => 
              set((state) => {
                // Busca si el producto ya existe en el carrito
                const existingItem = state.items.find(
                    (item) => item.producto._id === producto._id
                );

                // Si el producto ya existe en el carrito
                if (existingItem) {
                    return {
                        // Mapea todos los items
                        items: state.items.map((item) =>
                            // Si encuentra el producto, incrementa su cantidad en 1
                            item.producto._id === producto._id
                                ? { ...item, cantidad: item.cantidad + 1 }
                                // Si no es el producto buscado, lo deja igual
                                : item
                        ),
                    };
                } else {
                    // Si el producto no existe, lo añade al carrito con cantidad 1
                    return {
                        items: [...state.items, { producto, cantidad: 1 }]};
                }
            }),
            removeItem: (productoId) => set((state) => ({
                items: state.items.reduce((acc, item) => {
                    if (item.producto._id === productoId) {
                        if (item.cantidad > 1) {
                            acc.push({ ...item, cantidad: item.cantidad - 1 });
                        }
                    } else {
                        acc.push(item);
                    }
                    return acc;
                }, [] as BasketItem[])
            })),
            clearBasket: () => set({ items: [] }),
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.producto.price ?? 0) * item.cantidad, 0);
            },
            getItemCount: (productoId) => {
                const item = get().items.find(item => item.producto._id === productoId);
                return item ? item.cantidad : 0;
            },
            getGroupedItems: () => get().items,
        }),
        {
            name: "basket_storage"
        }
    )
);

export default useBasketStore;