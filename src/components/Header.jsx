import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const location = useLocation();
  const { toast } = useToast();

  // Auth0
  const {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  // Fetch logo from Supabase
  useEffect(() => {
    const fetchLogo = async () => {
      const { data, error } = await supabase
        .from('site_config')
        .select('value')
        .eq('key', 'logo_url')
        .single();

      if (data && data.value) {
        // cache bust
        setLogoUrl(`${data.value}?t=${new Date().getTime()}`);
      }
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);

  const programLinks = [
    { name: 'Workshops', path: '/workshops' },
    { name: 'Credit Courses', path: '/credit-courses' },
    { name: 'Diploma Program', path: '/diploma-program' },
    { name: 'Summer Programs', path: '/summer-programs' },
  ];

  const mainLinks = [
    { name: 'Results & Outcomes', path: '/results' },
    { name: 'About', path: '/about' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setAuthMenuOpen(false);
    logout({
      logoutParams: {
        returnTo:
          import.meta.env.VITE_AUTH0_LOGOUT_RETURN_TO ||
          window.location.origin,
      },
    });
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
  };

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: '/diploma' }, // after login, drop them in the Diploma portal
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-900/10">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} className="h-10 flex items-center">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="AUSA Logo"
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <img
                    alt="AUSA Logo"
                    className="h-8 w-auto object-contain"
                    src="https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/small%20AUSA.jpg"
                  />
                )}
              </motion.div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-slate-gray hover:text-indigo transition-colors font-semibold"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                <span>Programs</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>
              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-soft py-2 border border-slate-200"
                    onMouseEnter={() => setProgramsOpen(true)}
                    onMouseLeave={() => setProgramsOpen(false)}
                  >
                    {programLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block px-4 py-2.5 text-sm font-semibold hover:bg-indigo/10 transition-colors ${isActive(link.path) ? 'text-indigo' : 'text-slate-gray'
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-colors text-sm ${isActive(link.path)
                    ? 'text-indigo'
                    : 'text-slate-gray hover:text-indigo'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right-side actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link to="/for-schools">
                <Button variant="outline" size="sm">
                  For Schools
                </Button>
              </Link>
              <Link to="/for-universities">
                <Button variant="outline" size="sm">
                  For Universities
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="sm">
                  Request Info
                </Button>
              </Link>
              <Link to="/apply">
                <Button size="sm">
                  Apply
                </Button>
              </Link>
              {/* Optional sign-in CTA on desktop */}
              {!isLoading && !isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Auth avatar menu (desktop) */}
            {!isLoading && isAuthenticated && (
              <div className="relative hidden lg:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setAuthMenuOpen((open) => !open)}
                >
                  <UserCircle className="w-6 h-6 text-slate-gray" />
                </Button>
                <AnimatePresence>
                  {authMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-soft py-2 border border-slate-200"
                      onMouseLeave={() => setAuthMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-semibold text-slate-gray truncate">
                          {user?.email || user?.name || 'Signed in'}
                        </p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-500 hover:bg-rose-500/10"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-slate-gray"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4"
            >
              <div className="space-y-3">
                <div className="font-semibold text-slate-gray mb-2">
                  Programs
                </div>
                {programLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block pl-4 py-2 ${isActive(link.path)
                        ? 'text-indigo font-bold'
                        : 'text-slate-gray'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {mainLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block py-2 ${isActive(link.path)
                        ? 'text-indigo font-bold'
                        : 'text-slate-gray'
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile CTAs */}
                <div className="pt-4 space-y-3">
                  <Link
                    to="/for-schools"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      For Schools
                    </Button>
                  </Link>
                  <Link
                    to="/for-universities"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      For Universities
                    </Button>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" className="w-full">
                      Request Info
                    </Button>
                  </Link>
                  <Link
                    to="/apply"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">
                      Apply
                    </Button>
                  </Link>

                  {/* Mobile sign-in / sign-out */}
                  {!isLoading && !isAuthenticated && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogin();
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                  {!isLoading && isAuthenticated && (
                    <Button
                      variant="ghost"
                      className="w-full text-rose-500 hover:bg-rose-500/10"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;