"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { onLogout } from "@/utils/auth";
import { usePrivy } from "@privy-io/react-auth";

export const Logout = ({ text = "Disconnect" }: { text?: string }) => {
  const { logout } = usePrivy();

  const handleLogout = async () => {
    await logout();
    onLogout();

    window.location.href = "/";
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="h-max border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
};
