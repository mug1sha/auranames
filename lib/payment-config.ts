export const PAYMENT_METHODS = {
  USDT_TRC20: {
    name: "USDT (TRC20)",
    network: process.env.NEXT_PUBLIC_USDT_NETWORK || "TRC20",
    symbol: process.env.NEXT_PUBLIC_USDT_SYMBOL || "USDT",
    address: process.env.NEXT_PUBLIC_USDT_RECEIVING_ADDRESS ?? "",
  }
}

export const PLANS = {
  starter: {
    name: "Starter",
    price: 19,
    usdtAmount: 19,
  },
  pro: {
    name: "Pro",
    price: 49,
    usdtAmount: 49,
  },
  business: {
    name: "Business",
    price: 99,
    usdtAmount: 99,
  }
}

export type PaymentStatus = "PENDING" | "UNDER_REVIEW" | "VERIFIED" | "REJECTED";
