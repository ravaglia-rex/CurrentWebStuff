import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const CookieConsentBanner = ({ consent, onAccept, onDecline }) => {
    const showBanner = consent && !consent.given && !consent.timestamp;

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="fixed bottom-0 left-0 right-0 z-[100] bg-midnight-navy/95 backdrop-blur-sm text-white p-4 shadow-2xl"
                >
                    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-start gap-4 text-center md:text-left">
                            <Cookie className="w-8 h-8 text-warm-gold mt-1 shrink-0 hidden sm:block" />
                            <p className="text-sm text-indigo-200">
                                We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. By clicking "Accept All", you agree to our use of cookies. To learn more, read our{' '}
                                <Link to="/cookies" className="font-bold underline hover:text-warm-gold">Cookie Policy</Link>.
                            </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                            <Button variant="outline" size="sm" onClick={onDecline} className="text-white border-white/50 hover:bg-white/10">
                                Decline
                            </Button>
                            <Button size="sm" onClick={onAccept} className="bg-electric-blue hover:bg-electric-blue/90">
                                Accept All
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsentBanner;