import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export default function AnalyticsRouterListener() {
  const location = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent?.given) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });
  }, [location, consent]);

  return null;
}