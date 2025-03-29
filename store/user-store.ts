import { LinkedAccount, UserData } from "@/api/agent.d";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist } from "zustand/middleware";

interface UserState {
  isDelegated: boolean;
  activeWallet: string | null;
  primaryWallet: string | null;
  delegatedWallet: string | null;

  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;

  setShowDelegateModal: (showDelegateModal: boolean) => void;
  showDelegateModal: boolean;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isDelegated: false,
        activeWallet: null,
        primaryWallet: null,
        delegatedWallet: null,

        userData: null,
        setUserData: (userData) => {
          const delegatedWallet = userData?.linkedAccounts?.find(
            (account): account is LinkedAccount =>
              account.type === "wallet" && !!account.delegated,
          );

          return set({
            userData,
            isDelegated: !!delegatedWallet,
            activeWallet:
              delegatedWallet?.address || userData?.wallet?.address || null,
            primaryWallet: userData?.wallet?.address || null,
            delegatedWallet: delegatedWallet?.address || null,
          });
        },

        setShowDelegateModal: (showDelegateModal) => set({ showDelegateModal }),
        showDelegateModal: false,
      }),
      {
        name: "user-storage",
      },
    ),
  ),
);
