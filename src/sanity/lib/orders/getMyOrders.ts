import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
    const MI_ORDERS_QUERY = defineQuery(`
    *[_type == "pedido" && clerkUserId == $userId] | order(fechaPedido desc) {
        _id,
        numeroPedido,
        customerName,
        customerEmail,
        precioTotal,
        moneda,
        descuentoCantidad,
        estado,
        fechaPedido,
        stripeCheckoutSessionId,
        stripeCustomerId,
        stripePaymentIntentId,
        clerkUserId,
        "productos": productos[]{
            "id": _key,
            cantidad,
            "producto": producto->{
                _id,
                name,
                price,
                "imageUrl": image.asset->url,
                slug
            }
        }
    }
    `);

    try {
        const orders = await sanityFetch({
            query: MI_ORDERS_QUERY,
            params: { userId },
        });

        return orders.data || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}