import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 p-2 text-sm text-slate-500 bg-white/90 rounded-lg border border-slate-200">
        <Loader2 className="w-4 h-4 animate-spin" /> 
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-lg animate-in slide-in-from-top-2 duration-300 min-w-[200px]">
      <div className="flex items-center gap-3">
        {user?.picture ? (
          <img 
            src={user.picture} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
        <div className="flex flex-col overflow-hidden">
          <span className="font-bold text-sm text-midnight-navy truncate">{user?.name}</span>
          <span className="text-xs text-slate-500 truncate max-w-[120px]" title={user?.email}>{user?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;