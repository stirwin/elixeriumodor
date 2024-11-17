import { formatPrice } from "@/lib/formatPrice";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { Order, OrderItem } from "@/types/order";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

async function Orders() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold font-mono text-[#0E1D35] mb-8">Mis Pedidos</h1>

            {!orders || orders.length === 0 ? (
                <div className="text-center text-gray-500 p-8 bg-white rounded-lg shadow-sm">
                    No hay pedidos disponibles
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order: Order) => (
                        <Card key={order._id} 
                            className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardHeader className="bg-gray-50 p-6">
                                <CardTitle className="flex justify-between items-center text-[#0E1D35]">
                                    <span className="text-lg">
                                        Pedido #{order.numeroPedido?.slice(0, 8) || 'N/A'}
                                    </span>
                                    <span className="text-sm font-normal text-gray-500">
                                        {order.fechaPedido
                                            ? new Date(order.fechaPedido).toLocaleDateString('es-CO', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : "Fecha no disponible"}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <Package className="w-5 h-5 mr-2 text-[#A2C2F4]" />
                                        <span className="font-medium text-gray-700">{order.estado || 'Pendiente'}</span>

                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-4 mb-4">
                                    {order.productos?.map((item: OrderItem) => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            {item.producto.imageUrl && (
                                                <div className="relative w-[60px] h-[60px] flex-shrink-0">
                                                    <Image
                                                        src={item.producto.imageUrl}
                                                        alt={item.producto.name}
                                                        fill
                                                        sizes="60px"
                                                        className="rounded-md object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-[#0E1D35]">
                                                    {item.producto.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Cantidad: {item.cantidad} x {formatPrice(item.producto.price)}
                                                </p>
                                            </div>
                                            <span className="font-medium text-[#0E1D35]">
                                                {formatPrice(item.cantidad * item.producto.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2 text-right">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Subtotal original: </span>
                                        {formatPrice((order.precioTotal || 0) + (order.descuentoCantidad || 0))}
                                    </p>
                                    {(order.descuentoCantidad || 0) > 0 && (
                                        <p className="text-green-600">
                                            <span className="font-medium">Descuento: </span>
                                            -{formatPrice(order.descuentoCantidad ?? 0)}
                                        </p>
                                    )}
                                    <p className="text-xl font-bold text-[#0E1D35]">
                                        <span className="font-medium">Total: </span>
                                        {formatPrice(order.precioTotal || 0)}
                                    </p>
                                </div>                                                                                                             
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Orders;


