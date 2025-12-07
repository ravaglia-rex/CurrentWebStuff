import React from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '@/components/SeoHelmet';

const Terms = () => {
  return (
    <>
      <SeoHelmet
        title="Terms of Service"
        description="Review AUSA's terms of service for using our website and participating in our programs."
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
              Terms of Service
            </h1>
            
            <div className="prose lg:prose-lg max-w-none text-slate-600">
                <p><strong>Last updated: October 17, 2025</strong></p>

                <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ausa.io website (the "Service") operated by Access USA ("AUSA", "us", "we", or "our").</p>

                <h2>Agreement to Terms</h2>
                <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This is a legally binding agreement.</p>

                <h2>Use of Our Service</h2>
                <p>You agree to use our Service for lawful purposes only. You must not use our Service in any way that is unlawful, fraudulent, or harmful, or in connection with any unlawful, fraudulent, or harmful purpose or activity.</p>
                
                <h2>Intellectual Property</h2>
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Access USA and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.</p>

                <h2>Program Fees and Payments</h2>
                <p>Certain programs and services offered by AUSA require payment. All fees are due as per the terms specified for each program. Failure to pay fees may result in suspension or termination of your access to the program.</p>

                <h2>Limitation of Liability</h2>
                <p>In no event shall Access USA, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                <h2>Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.</p>

                <h2>Changes to These Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@ausa.io">info@ausa.io</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Terms;