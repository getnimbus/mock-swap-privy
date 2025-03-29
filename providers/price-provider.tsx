import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNativePrice } from "@/api/agent";
import { queryKeys } from "@/api/queryKey";

interface PriceContextType {
  nativePrice: number | null;
  isLoading: boolean;
  error: Error | null;
}

const PriceContext = createContext<PriceContextType>({
  nativePrice: null,
  isLoading: false,
  error: null,
});

export const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const {
    data: nativePrice,
    isLoading,
    error,
  } = useQuery({
    queryKey: [queryKeys.nativePrice],
    queryFn: async () => {
      return getNativePrice();
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  return (
    <PriceContext.Provider
      value={{
        nativePrice: nativePrice || null,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
}
