import React from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '@/components/SeoHelmet';

const Cookies = () => {
  return (
    <>
      <SeoHelmet
        title="Cookie Policy"
        description="Learn about AUSA's cookie policy and how we use cookies on our website to improve your experience."
      />

      <div className="bg-white text-slate-gray">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-xl p-8 lg:p-12 shadow-soft border border-gray-200"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-midnight-navy">
              Cookie Policy
            </h1>
            
            <div className="prose lg:prose-lg max-w-none text-slate-600">
                <p><strong>Last updated: October 17, 2025</strong></p>

                <p>This Cookie Policy explains how Access USA ("AUSA", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website at ausa.io ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>

                <h2>What are cookies?</h2>
                <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>

                <h2>Why do we use cookies?</h2>
                <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. For example, we use cookies for:</p>
                <ul>
                    <li><strong>Functionality:</strong> To remember your settings and preferences, such as your cookie consent choices.</li>
                    <li><strong>Performance and Analytics:</strong> To collect information about how you interact with our Website and help us improve it. This may include cookies from third-party analytics services like Google Analytics.</li>
                    <li><strong>Marketing:</strong> To help us deliver marketing campaigns and track their performance (if applicable).</li>
                </ul>
                
                <h2>Your choices regarding cookies</h2>
                <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by using our cookie consent banner. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>

                <h2>Changes to this Cookie Policy</h2>
                <p>We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:info@ausa.io">info@ausa.io</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Cookies;