"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useDeviceType } from "../hooks/use-device-type";

interface SidebarWalletContextType {
  isSidebarWalletOpen: boolean;
  setIsSidebarWalletOpen: (value: boolean) => void;
}

const SidebarWalletContext = createContext<
  SidebarWalletContextType | undefined
>(undefined);

export function SidebarWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const deviceType = useDeviceType();
  const [isSidebarWalletOpen, setIsSidebarWalletOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const savedWalletSidebarState = localStorage.getItem("isSidebarWalletOpen");
    setTimeout(() => {
      if (savedWalletSidebarState !== null) {
        setIsSidebarWalletOpen(savedWalletSidebarState === "true");
      } else {
        setIsSidebarWalletOpen(deviceType === "desktop");
      }
    }, 0);
  }, [deviceType]);

  return (
    <SidebarWalletContext.Provider
      value={{ isSidebarWalletOpen, setIsSidebarWalletOpen }}
    >
      {children}
    </SidebarWalletContext.Provider>
  );
}

export function useSidebarWallet() {
  const context = useContext(SidebarWalletContext);
  if (context === undefined) {
    throw new Error(
      "useSidebarWallet must be used within a SidebarWalletProvider",
    );
  }
  return context;
}
