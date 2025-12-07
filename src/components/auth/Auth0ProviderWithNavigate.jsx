import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE; // e.g. 'https://ausa.io/api'

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!domain || !clientId) {
    console.warn(
      '[Auth0] VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID is missing – Auth0 integration disabled.'
    );
    // Render children without Auth0 so the public site still works
    return <>{children}</>;
  }

  if (!audience) {
    console.warn(
      '[Auth0] VITE_AUTH0_AUDIENCE is missing – API access tokens will fail with "Invalid token".'
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        // 👇 this is CRITICAL: tells Auth0 which API the access token is for
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
