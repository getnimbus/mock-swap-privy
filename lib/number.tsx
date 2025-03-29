import Image from "next/image";
import { formatNumber } from "@/lib/utils";

const nativeLogo = {
  SOL: {
    src: "https://s2.coinmarketcap.com/static/img/coins/64x64/16116.png",
    alt: "SOL",
  },
  BASE: {
    src: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    alt: "ETH",
  },
};

export function formatCurrency(
  value: number | null | undefined,
  currency: "USD" | "Native" = "USD",
) {
  if (value === null || value === undefined) {
    value = 0;
  }
  const chain = (process.env.NEXT_PUBLIC_CHAIN ||
    "SOL") as keyof typeof nativeLogo;

  if (currency === "Native") {
    return (
      <div className="inline-flex items-center gap-2">
        {formatNumber(value ?? 0)}
        <Image
          src={
            // SOL logo
            nativeLogo[chain].src
          }
          style={{
            borderRadius: "50%",
          }}
          alt={nativeLogo[chain].alt}
          width={16}
          height={16}
        />
      </div>
    );
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}
