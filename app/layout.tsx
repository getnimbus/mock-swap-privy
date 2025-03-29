import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { AppLayout } from "@/components/layout";
import { Providers } from "@/providers/providers";
import { LoadingPage } from "@/components/ui/loading";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LP Agent",
  description: "AI-Powered Liquidity Management",
  keywords:
    "liquidity management, AI trading, cryptocurrency, DeFi, trading bot, automated trading",
  authors: [{ name: "LP Agent Team" }],
  openGraph: {
    title: "LP Agent - AI-Powered Liquidity Management",
    description:
      "Optimize your liquidity management with advanced AI technology. Efficient, secure, and automated trading solutions.",
    type: "website",
    locale: "en_US",
    siteName: "LP Agent",
  },
  twitter: {
    card: "summary_large_image",
    title: "LP Agent - AI-Powered Liquidity Management",
    description: "Maximizing Liquidity Profits with AI Automation 🤖",
    creator: "@lpagent_io",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="Optimize your liquidity management with advanced AI technology. Efficient, secure, and automated trading solutions."
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<LoadingPage />}>
            <AppLayout>{children}</AppLayout>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
