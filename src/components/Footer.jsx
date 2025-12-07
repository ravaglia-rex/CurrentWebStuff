import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Facebook, Instagram, Linkedin, Twitter, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive marketing communications.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const trimmedEmail = email.trim();

    const { error: insertError } = await supabase
      .from('newsletter_subscriptions')
      .insert({
        email: trimmedEmail,
        first_seen_page: window.location.pathname,
        confirmed: false,
      });

    setLoading(false);

    if (insertError) {
      if (insertError.message.includes('duplicate key')) {
        setSuccess(true);
        toast({
          title: "Already Subscribed!",
          description: "You're already on our newsletter list. Thanks for being with us!",
        });
        setEmail('');
        setConsent(false);
      } else {
        console.error(insertError);
        setError('Could not subscribe. Please try again.');
        toast({
          title: "Subscription Failed",
          description: "There was a problem with your request. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setSuccess(true);
      toast({
        title: "Subscription Successful!",
        description: "Thanks for joining our newsletter. Keep an eye on your inbox!",
      });
      setEmail('');
      setConsent(false);
    }
  }

  const socialLinks = [
    { icon: Facebook, name: "Facebook" },
    { icon: Instagram, name: "Instagram" },
    { icon: Linkedin, name: "LinkedIn" },
    { icon: Twitter, name: "Twitter" },
  ];

  const focusRingClass =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md focus-visible:ring-offset-midnight-navy";

  return (
    <footer className="bg-midnight-navy text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-4 text-white">
              AUSA
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Building holistic profiles for university admissions success.
            </p>
            <div className="flex items-center space-x-3 text-gray-300">
              <Mail className="w-5 h-5 text-indigo-300" />
              <a
                href="mailto:info@ausa.io"
                className={`hover:text-warm-gold transition-colors ${focusRingClass}`}
              >
                info@ausa.io
              </a>
            </div>
          </div>

          <div>
            <p className="font-bold text-lg mb-4 text-gray-200">Programs</p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/workshops"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/credit-courses"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Credit Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/diploma-program"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Diploma Program
                </Link>
              </li>
              <li>
                <Link
                  to="/summer-programs"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Summer Programs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-lg mb-4 text-gray-200">Quick Links</p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Results & Outcomes
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`text-gray-300 hover:text-warm-gold transition-colors ${focusRingClass}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-lg mb-4 text-gray-200">Supported By</p>
            <div className="space-y-4">
              <a
                href="https://www.educationworld.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/logo-ew-black.webp"
                  alt="Education World Logo"
                  className="h-16 w-auto object-contain"
                />
              </a>
              <a
                href="https://idreamcareer.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/iDC-White-Horizontal@4x-8.webp"
                  alt="iDreamCareer Logo"
                  className="h-12 w-auto object-contain invert"
                />
              </a>
              <br />
            </div>
          </div>

          <div>
            <p className="font-bold text-lg mb-4 text-gray-200">Stay Connected</p>
            <form onSubmit={handleNewsletterSubmit} className="mb-6">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-warm-gold"
                  required
                  aria-label="Email for newsletter"
                />
                <Button type="submit" variant="secondary" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="footer-consent"
                  checked={consent}
                  onCheckedChange={setConsent}
                  className="border-gray-400"
                />
                <Label htmlFor="footer-consent" className="text-xs text-gray-400">
                  I agree to receive marketing communications from AUSA.
                </Label>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Access USA (AUSA). All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                to="/privacy"
                className={`text-gray-400 hover:text-warm-gold transition-colors ${focusRingClass}`}
              >
                Privacy Policy
              </Link>

              {/* NEW ADMIN LINK */}
              <Link
                to="/admin/login"
                className={`text-gray-400 hover:text-warm-gold transition-colors ${focusRingClass}`}
              >
                Admin
              </Link>

              <Link
                to="/terms"
                className={`text-gray-400 hover:text-warm-gold transition-colors ${focusRingClass}`}
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className={`text-gray-400 hover:text-warm-gold transition-colors ${focusRingClass}`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;