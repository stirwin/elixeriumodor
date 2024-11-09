import stripe from "@/lib/stripe";
import { backedClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Metadata } from "../../../../actions/createCheckoutSession";



export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    


    if (!sig) {
        return NextResponse.json({ error: "No se pudo verificar la solicitud" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log("No se pudo obtener el secreto del webhook");
        return NextResponse.json({ error: "No se pudo obtener el secreto del webhook" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.log("Error al verificar el evento de Stripe", err);
        return NextResponse.json({ error: `Error al verificar el evento de Stripe: ${err}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;


        try {
            const order = await createOrderInSanity(session);
            console.log("Orden creada en Sanity", order);
        } catch (error) {
            console.log("Error al crear la orden en Sanity", error);
            return NextResponse.json({ error: "Error al crear la orden en Sanity" }, { status: 500 });
        }
    }
    return NextResponse.json({ message: "Evento de Stripe procesado correctamente" }, { status: 200 });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer_details,
        total_details
    } = session;


    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"]
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }));

    const order = await backedClient.create({
        _type: "pedido",
        numeroPedido: orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer_details?.name,
        customerEmail: customerEmail,
        moneda: currency,
        descuentoCantidad: total_details?.amount_discount
            ? total_details.amount_discount / 100
            : 0,
        productos: sanityProducts.map(product => ({
            _key: product._key,
            producto: product.product,
            cantidad: product.quantity
        })),
        precioTotal: amount_total ? amount_total / 100 : 0,
        estado: "pagado",
        fechaPedido: new Date().toISOString(),
        clerkUserId: clerkUserId
    });

    return order;


}