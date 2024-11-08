export const COUPON_CODES = {
    BFRYDAY: "BFRYDAY",
    XMAS2024: "XMAS2024",
    CYBERMONDAY: "CYBERMONDAY",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;