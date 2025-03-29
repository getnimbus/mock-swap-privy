"use client";

import { QueryProvider } from "@/providers/query-provider";
import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { SidebarWalletProvider } from "@/providers/sidebar-wallet-provider";
import { PriceProvider } from "./price-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const solanaConnectors = toSolanaWalletConnectors();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
        config={{
          appearance: {
            theme: "dark",
            accentColor: "#22c55e", // Using green-500 to match your theme
            logo: "/logo/logo.jpeg", // Add your logo file to the public directory
            walletChainType: "solana-only",
          },
          loginMethods: ["wallet"],
          externalWallets: {
            solana: { connectors: solanaConnectors },
          },
          solanaClusters: [
            {
              name: "mainnet-beta",
              rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
            },
          ],
          embeddedWallets: {
            solana: {
              createOnLogin: "all-users", // "users-without-wallets" => mean off
            },
            ethereum: {
              createOnLogin: "off",
            },
          },
        }}
      >
        <PriceProvider>
          <TooltipProvider delayDuration={100}>
            <SidebarProvider>
              <SidebarWalletProvider>
                {children}
                <Toaster />
              </SidebarWalletProvider>
            </SidebarProvider>
          </TooltipProvider>
        </PriceProvider>
      </PrivyProvider>
    </QueryProvider>
  );
}
