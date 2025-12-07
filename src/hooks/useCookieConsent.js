import React, { useState, useEffect } from 'react';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie_consent');
    if (storedConsent) {
      setConsent(JSON.parse(storedConsent));
    } else {
      setConsent({ given: false });
    }
  }, []);

  const giveConsent = () => {
    const newConsent = { given: true, timestamp: new Date().toISOString() };
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
  };
  
  const declineConsent = () => {
    const newConsent = { given: false, timestamp: new Date().toISOString() };
    localStorage.setItem('cookie_consent', JSON.stringify(newConsent));
    setConsent(newConsent);
  };

  return { consent, giveConsent, declineConsent };
};