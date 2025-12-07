import React from 'react';
import { motion } from 'framer-motion';
import SeoHelmet from '@/components/SeoHelmet';

const Privacy = () => {
  return (
    <>
      <SeoHelmet
        title="Privacy Policy"
        description="Read AUSA's privacy policy to understand how we protect and handle your personal information."
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
              Privacy Policy
            </h1>
            
            <div className="prose lg:prose-lg max-w-none text-slate-600">
                <p><strong>Last updated: October 17, 2025</strong></p>

                <p>Access USA ("AUSA", "we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ausa.io, and use our services.</p>

                <h2>Information Collection</h2>
                <p>We collect information that you provide directly to us when you fill out forms, apply for programs, or otherwise communicate with us. This may include:</p>
                <ul>
                    <li>Personal Identification Information (Name, email address, phone number, etc.)</li>
                    <li>Parent/Guardian Contact Information</li>
                    <li>Academic Information (School, grade, interests, etc.)</li>
                    <li>Any other information you choose to provide.</li>
                </ul>
                <p>We practice minimal data collection and only ask for information that is necessary for the provision of our services, with explicit consent required.</p>

                <h2>Use of Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, operate, and maintain our services.</li>
                    <li>Process applications and enrollments.</li>
                    <li>Communicate with you, including responding to inquiries and sending program updates.</li>
                    <li>Improve our website and services.</li>
                    <li>Comply with legal obligations.</li>
                </ul>

                <h2>Data Storage and Security</h2>
                <p>Your information is stored securely. For contact and application forms, data is sent to <a href="mailto:info@ausa.io">info@ausa.io</a> and a temporary record may be stored as a CSV for administrative purposes. We implement a variety of security measures to maintain the safety of your personal information.</p>
                
                <h2>Your Data Protection Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                    <li>The right to access – You have the right to request copies of your personal data.</li>
                    <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                    <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:info@ausa.io">info@ausa.io</a>.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@ausa.io">info@ausa.io</a>.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Privacy;