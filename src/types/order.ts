export interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    slug: {
        current: string;
    };
}

export interface OrderItem {
    id: string;
    cantidad: number;
    producto: Product;
}

export interface Order {
    _id: string;
    numeroPedido: string | null;
    customerName: string | null;
    customerEmail: string | null;
    precioTotal: number | null;
    moneda: string | null;
    descuentoCantidad: number | null;
    estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado' | null;
    fechaPedido: string | null;
    productos: OrderItem[] | null;
    stripeCheckoutSessionId?: string;
    stripeCustomerId?: string;
    stripePaymentIntentId?: string;
    clerkUserId?: string;
} 