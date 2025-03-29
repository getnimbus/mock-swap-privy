"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useDeviceType } from "../hooks/use-device-type";

interface SidebarContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const deviceType = useDeviceType();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedSidebarState = localStorage.getItem("isSidebarOpen");
    setTimeout(() => {
      if (savedSidebarState !== null) {
        setIsSidebarOpen(savedSidebarState === "true");
      } else {
        setIsSidebarOpen(deviceType === "desktop");
      }
    }, 0);
  }, [deviceType]);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
