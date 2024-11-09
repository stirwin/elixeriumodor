import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { Order, OrderItem } from "@/types/order";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";


async function Orders() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const orders = await getMyOrders(userId);

   
    return (
        <div className="flex flex-col items-center justify-center p-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Mis Pedidos</h1>

            {orders.length === 0 ? (
                <div className="text-center text-gray-500">
                    No hay pedidos
                </div>
            ) : (
                <div className="space-y-4 w-full max-w-2xl">
                    {orders.map((order: Order) => (
                        <div
                            key={order._id}
                            className="p-4 border rounded-lg shadow-sm">
                            <p className="font-semibold">
                                Numero de pedido: <span className="text-green-400">{order.numeroPedido}</span>
                            </p>
                            <p>
                                Fecha de pedido: {order.fechaPedido
                                    ? new Date(order.fechaPedido).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : "No disponible"}
                            </p>
                            <div className="flex items-center gap-2">
                                Estado:
                                <span className={cn(
                                    "px-2 py-1 rounded-full text-sm",
                                    {
                                        "bg-green-100 text-green-800": order.estado === "pagado",
                                        "bg-yellow-100 text-yellow-800": order.estado === "pendiente",
                                        "bg-blue-100 text-blue-800": order.estado === "enviado",
                                        "bg-gray-100 text-gray-800": order.estado === "entregado",
                                        "bg-red-100 text-red-800": order.estado === "cancelado",
                                    }
                                )}>
                                    {order.estado}
                                </span>
                            </div>
                            <p className="font-bold mt-2">
                                Total: {formatPrice(order.precioTotal || 0)}
                            </p>
                            {order.descuentoCantidad > 0 && (
                                <div className="text-sm mt-1">
                                    <p className="text-red-500">
                                        Descuento: -{formatPrice(order.descuentoCantidad)}
                                    </p>
                                    <p className="text-gray-500">
                                        Subtotal original: {formatPrice((order.precioTotal + order.descuentoCantidad))}
                                    </p>
                                </div>
                            )}
                            
                            <div className="mt-4">
                                <h2 className="text-lg font-bold mb-2">Productos</h2>
                                <div className="space-y-2">
                                    {order.productos?.map((item: OrderItem) => (
                                        <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                                            {item.producto.imageUrl && (
                                                <Image
                                                    src={item.producto.imageUrl}
                                                    alt={item.producto.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            )}
                                            <div>
                                                <p className="font-medium">{item.producto.name}</p>
                                                <p className="text-sm text-gray-600">
                                                    Cantidad: {item.cantidad} x {formatPrice(item.producto.price)}
                                                </p>
                                                <p className="text-sm font-semibold">
                                                    Subtotal: {formatPrice(item.cantidad * item.producto.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default Orders;


