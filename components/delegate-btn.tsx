"use client";

import { useSolanaWallets, useDelegatedActions } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKey";

interface DelegateBtnProps {
  addressTitle?: string;
  onClose: () => void;
}

export default function DelegateBtn({
  addressTitle,
  onClose,
}: DelegateBtnProps) {
  const { ready, wallets } = useSolanaWallets();
  const { delegateWallet } = useDelegatedActions();
  const queryClient = useQueryClient();

  // Find the embedded wallet to delegate from the array of the user's wallets
  const walletToDelegate = wallets.find(
    (wallet) => wallet.walletClientType === "privy",
  );

  const onDelegate = async () => {
    if (!walletToDelegate || !ready) return; // Button is disabled to prevent this case
    await delegateWallet({
      address: walletToDelegate.address,
      chainType: "solana",
    }); // or chainType: 'ethereum'
    onClose();
    if (addressTitle) {
      localStorage.removeItem(addressTitle);
    }
    // Invalidate userMe query to refresh user data
    queryClient.invalidateQueries({
      queryKey: [queryKeys.userMe],
    });
  };

  return (
    <Button
      className="w-max text-sm bg-green-600 hover:bg-green-700 px-4 rounded-md text-white"
      onClick={onDelegate}
    >
      Delegate
    </Button>
  );
}
