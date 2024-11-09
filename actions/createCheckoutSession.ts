'use server';

import stripe from "@/lib/stripe";
import { BasketItem } from "../store/store";
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedBasketItem = {
    producto: BasketItem["producto"];
    cantidad: number;
}

export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: Metadata
) {
    try {
        const itemsWithotPrice = items.filter((item) => !item.producto.price);

        if (itemsWithotPrice.length > 0) {
            throw new Error("No se puede crear una orden sin precio");
        }

        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });

        let customerId: string | undefined;

        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }


      const baseUrl =
       process.env.NODE_ENV === "production"
       ? `https://${process.env.VERCEL_URL}`
       : process.env.NEXT_PUBLIC_BASE_URL;

       const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

       const cancelUrl = `${baseUrl}/basket`;
      
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "COP",
                    unit_amount: Math.round((item.producto.price! * 100)),
                    product_data: {
                        name: item.producto.name || "Producto sin nombre",
                        description: `Product ID: ${item.producto._id}`,
                        metadata: {
                            id: item.producto._id,
                        },
                        images: item.producto.image
                        ? [imageUrl(item.producto.image).url()]
                        : undefined,
                    },
                },
                quantity: item.cantidad,
            })),
        });
        
        return session.url;
    } catch (error) {
        console.error("Error al crear la sesión de checkout:", error);
    }

}