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
    numeroPedido: string;
    customerName: string;
    customerEmail: string;
    precioTotal: number;
    moneda: string;
    descuentoCantidad: number;
    estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cancelado';
    fechaPedido: string;
    productos: OrderItem[];
    stripeCheckoutSessionId?: string;
    stripeCustomerId: string;
    stripePaymentIntentId: string;
    clerkUserId: string;
} 