import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      onClick={() => loginWithRedirect()}
      variant="default"
      className="flex items-center gap-2 bg-electric-blue hover:bg-blue-700 text-white transition-all shadow-md hover:shadow-lg"
    >
      <LogIn className="w-4 h-4" />
      Log In
    </Button>
  );
};

export default LoginButton;