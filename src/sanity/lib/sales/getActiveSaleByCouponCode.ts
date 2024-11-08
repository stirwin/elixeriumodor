import { defineQuery } from "next-sanity";
import { CouponCode } from "../sales/couponCode";
import { sanityFetch } from "../live";

export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {

    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(
        `*[_type == "sale" 
           && isActive == true
           && cuponCode == $couponCode
        ] | order(validFrom desc)[0]
        `);
        
        try {
            const activeSale = await sanityFetch({
                query: ACTIVE_SALE_BY_COUPON_QUERY,
                params: {
                    couponCode,
                },
            });//LE PASA EL CODIGO DE CUPON A LA QUERY

            return activeSale ? activeSale.data : null;
        } catch (error) {
            console.error("Error al obtener la venta activa por codigo de cupon", error);
            return null;
        }
}