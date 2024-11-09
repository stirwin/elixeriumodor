import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";


export const salesType = defineType({
    name: "sale",
    title: "Ventas",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Titulo",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Descripcion",
            type: "text",
        }),
        defineField({
            name: "discountAmount",
            title: "Descuento en cantidad",
            type: "number",
            description: "Cantidad en porcentaje o valor fijo",
        }),
        defineField({
            name: "cuponCode",
            title: "Codigo de cupon",
            type: "string",
            description: "Codigo de cupon para aplicar descuento",
        }),
        defineField({
            name: "validFrom",
            title: "Vigente desde",
            type: "datetime",
        }),
        defineField({
            name: "validUntil",
            title: "Vigente hasta",
            type: "datetime",
        }),
        defineField({
            name: "isActive",
            title: "Activo",
            type: "boolean",
            description: "Palanca para activar o desactivar la venta",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: "discountAmount",
            cuponCode: "cuponCode",
            isActive: "isActive",
        },
        prepare(selection) {
            const { title, discountAmount, cuponCode, isActive } = selection;
            const status = isActive ? "Activo" : "Inactivo";
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${cuponCode} - ${status}`,
            };
        },
    },
})