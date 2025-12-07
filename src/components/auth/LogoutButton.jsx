import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-red-600 transition-all w-full justify-start"
    >
      <LogOut className="w-4 h-4" />
      Log Out
    </Button>
  );
};

export default LogoutButton;