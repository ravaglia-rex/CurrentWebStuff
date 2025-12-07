import React from 'react';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import CookieConsentBanner from '@/components/CookieConsentBanner';
    import { useCookieConsent } from '@/hooks/useCookieConsent';
    
    const Layout = ({ children }) => {
      const { consent, giveConsent, declineConsent } = useCookieConsent();
    
      return (
        <div className="min-h-screen flex flex-col">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[101] focus:top-0 focus:left-0 focus:m-4 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-lg focus:ring-2 focus:ring-ring focus:ring-offset-2">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsentBanner 
            consent={consent} 
            onAccept={giveConsent}
            onDecline={declineConsent}
          />
        </div>
      );
    };
    
    export default Layout;