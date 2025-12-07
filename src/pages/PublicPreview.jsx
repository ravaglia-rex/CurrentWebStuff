import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import SeoHelmet from '@/components/SeoHelmet';
    import { ArrowRight } from 'lucide-react';

    const links = [
      { to: '/', text: 'Home' },
      { to: '/workshops', text: 'Workshops' },
      { to: '/credit-courses', text: 'Credit Courses' },
      { to: '/diploma-program', text: 'Diploma Program' },
      { to: '/summer-programs', text: 'Summer Programs' },
      { to: '/results', text: 'Results' },
      { to: '/for-schools', text: 'For Schools' },
      { to: '/for-universities', text: 'For Universities' },
      { to: '/about', text: 'About' },
      { to: '/faqs', text: 'FAQs' },
      { to: '/contact', text: 'Contact' },
      { to: '/apply', text: 'Apply' },
    ];

    const PublicPreview = () => {
      return (
        <>
          <SeoHelmet
            title="Public Preview"
            description="A preview index of the AUSA website pages. Content is subject to change."
            noIndex={false}
          />
          <div className="min-h-screen bg-gray-50">
            <div className="bg-yellow-300 text-yellow-900 text-center p-3 font-semibold">
              Public Preview — content subject to change.
            </div>
            <div className="container mx-auto px-4 py-12 md:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-midnight-navy mb-4">
                  AUSA Website Preview
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  This page provides quick access to all major sections of the website.
                </p>
              </motion.div>

              <motion.div 
                className="mt-12 max-w-lg mx-auto"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {links.map((link) => (
                  <motion.div
                    key={link.to}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link to={link.to}>
                       <Button
                        variant="ghost"
                        className="w-full justify-between items-center text-left p-6 my-2 text-lg font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo"
                      >
                        {link.text}
                        <ArrowRight className="w-5 h-5 opacity-50" />
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </>
      );
    };

    export default PublicPreview;