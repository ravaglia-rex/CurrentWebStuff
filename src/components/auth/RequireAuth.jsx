import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-slate-500">Checking your session…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // loginWithRedirect will have been called; render nothing for now
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;