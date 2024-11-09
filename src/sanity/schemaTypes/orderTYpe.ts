import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: "pedido",
    title: "Pedido",
    type: "document", 
    icon: BasketIcon,
    fields: [
        defineField({
            name: "numeroPedido",
            title: "Número de Pedido",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "ID de Sesión de Pago de Stripe",
            type: "string",
        }),
        defineField({
            name: "stripeCustomerId", 
            title: "ID de Cliente de Stripe",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clerkUserId",
            title: "ID de Usuario de Clerk",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Nombre del Cliente",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:"customerEmail",
            title: "Email del Cliente",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "ID de Pago de Stripe",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name:"productos",
            title: "Productos",
            type: "array",
            of: [
                defineArrayMember({
                    type:"object",
                    fields: [
                       defineField({
                        name: "producto",
                        title:"Producto comprado",
                        type: "reference",
                        to: [{type: "producto"}]
                       }),
                       defineField({
                        name: "cantidad",
                        title: "Cantidad comprada",
                        type: "number",
                       })
                    ],
                    preview: {
                        select: {
                            producto: "producto.name",
                            cantidad: "cantidad",
                            imagen: "producto.image",
                            precio: "producto.price",
                            moneda: "producto.moneda",
                        },
                        prepare(select){
                            return{
                                title: `${select.producto} x ${select.cantidad}`,
                                subtitle: `${select.precio * select.cantidad} ${select.moneda}`,
                                media: select.imagen,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "precioTotal",
            title: "Precio Total",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name:"moneda",
            title: "Moneda",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "descuentoCantidad",
            title: "Descuento por Cantidad",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "estado",
            title: "Estado del Pedido",
            type: "string",
            options: {
                list: [
                    {title: "Pendiente", value: "pendiente"},
                    {title: "Pagado", value: "pagado"},
                    {title: "Enviado", value: "enviado"},
                    {title: "Entregado", value: "entregado"},
                    {title: "Cancelado", value: "cancelado"},
                ],
            },
        }),
        defineField({
            name: "fechaPedido",
            title: "Fecha del Pedido",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            email: "customerEmail",
            moneda: "moneda",
            orderId: "numeroPedido",
            cantidad:"precioTotal",
        },
        prepare(select){
            // Asegurarnos de que orderId sea string antes de usar slice
            const orderIdString = String(select.orderId);
            const orderIdSnippet = orderIdString.length > 10 
            ? `${orderIdString.slice(0, 5)}...${orderIdString.slice(-5)}`
            : orderIdString
            return{
                title: `${select.name}(${orderIdSnippet})`,
                subtitle: `${select.cantidad} ${select.moneda}, ${select.email}`,
                media: BasketIcon,
            };
        },
    },
})

