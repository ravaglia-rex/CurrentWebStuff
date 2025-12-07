import React from "react";
import { useEffect } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
// Example: VITE_GA_MEASUREMENT_ID = "G-XXXXXXX"

export default function AnalyticsProvider() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent?.given) return; // ↩️ Do nothing unless user consented

    // Prevent injecting script repeatedly
    if (document.getElementById("ga-script")) return;

    // 1. Load GA script
    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Initialize GA
    const configScript = document.createElement("script");
    configScript.id = "ga-config";
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
    `;
    document.head.appendChild(configScript);
  }, [consent]);

  return null;
}