import { COUPON_CODES } from "@/sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFrydayBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRYDAY);

    if (!sale?.isActive){
        return <>hola</>;
    }
    
    return (
        <div className="bg-gradient-to-r from-red-600 to-black text-white
        px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-semibold mb-3">{sale.title}</h1>
                    <p className="text-left  text-lg mb-4">{sale.description}</p>
                
                     <div className="flex">
                        <div className="bg-white text-black px-6 py-4 mr-2 rounded-full shadow-sm">
                            Usa el cupon <span className="font-bold text-red-600">{sale.cuponCode}</span>
                            <span className="ml-2 font-bold">¡{sale.discountAmount}% de descuento!</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default BlackFrydayBanner;