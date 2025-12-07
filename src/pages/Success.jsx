import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PartyPopper, ArrowRight, MessageCircle } from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';

const TYPE_COPY = {
  inquiry: {
    heading: 'If you requested information or sent a general inquiry:',
    body:
      'We will review your message and respond with suggestions tailored to your goals and questions.',
  },
  school: {
    heading: 'If you inquired about workshops or school partnerships:',
    body:
      'A member of our school partnership team will respond with available dates, delivery models, and faculty options for your school.',
  },
  university: {
    heading: 'If you inquired about university partnerships:',
    body:
      'Our partnerships team will follow up to explore online courses, summer programs, or faculty-led workshops that align with your priorities.',
  },
  application: {
    heading: 'If you submitted an application:',
    body:
      'We will contact you with next steps and may request additional information—such as transcripts, recommendations, or placement details for credit courses.',
  },
  newsletter: {
    heading: 'If you subscribed for updates:',
    body:
      'You will receive occasional updates on workshops, credit courses, and summer programs. You can unsubscribe at any time.',
  },
  default: {
    heading: 'What happens next:',
    body:
      'Our team will review your information and get in touch shortly with next steps or answers to your questions.',
  },
};

function buildWhatsAppHref({ type }) {
  const rawNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
  const base = rawNumber ? `https://wa.me/${rawNumber}` : `https://wa.me/`;
  const text = encodeURIComponent(
    `Hi AUSA team — I just submitted a ${type || 'form'} on ausa.io. Could we schedule a quick call?`
  );
  return `${base}?text=${text}`;
}

const Success = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const typeParam = (params.get('type') || '').toLowerCase();

  const stateHeading = location.state?.heading;
  const stateBody = location.state?.body;

  const baseCopy =
    TYPE_COPY[typeParam] ||
    (stateHeading || stateBody
      ? {
          heading: stateHeading || TYPE_COPY.default.heading,
          body: stateBody || TYPE_COPY.default.body,
        }
      : TYPE_COPY.default);

  const whatsappHref = buildWhatsAppHref({ type: typeParam || 'submission' });

  return (
    <>
      <SeoHelmet
        title="Submission Received"
        description="Thank you for your interest in Access USA. Your submission has been received and our team will follow up with next steps."
      />
      <div className="min-h-[80vh] bg-gradient-to-br from-warm-gold/10 to-orange-400/10 flex items-center justify-center text-center py-16 md:py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="bg-white p-10 sm:p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto"
        >
          <PartyPopper className="w-16 h-16 sm:w-20 sm:h-20 text-warm-gold mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-midnight-navy">
            Thank You — Your Submission Has Been Received
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-6 max-w-prose mx-auto">
            We appreciate your interest in Access USA. Our team will review your information and
            get in touch shortly.
          </p>

          <div className="bg-blue-50/70 p-6 rounded-lg text-left mb-6 space-y-3">
            <p className="font-bold text-midnight-navy">{baseCopy.heading}</p>
            <p className="text-sm text-slate-600">{baseCopy.body}</p>
          </div>

          <div className="bg-blue-50/70 p-6 rounded-lg text-left mb-8 space-y-3">
            <p className="font-bold text-midnight-navy">
              If you requested information:
            </p>
            <p className="text-sm text-slate-600">
              We look forward to helping you explore the best opportunities for your goals—whether
              that means workshops, credit courses, summer programs, or longer-term diploma
              pathways.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-2xl font-bold text-midnight-navy mb-3">
              Continue Exploring
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              While you wait to hear from us, you can learn more about the different ways Access
              USA supports students, schools, and universities.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/workshops">
                  Workshops <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/credit-courses">
                  Credit Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/diploma">
                  Diploma Program <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/summer-programs">
                  Summer Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/for-schools">
                  For Schools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/for-universities">
                  For Universities <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Button asChild size="lg" className="bg-electric-blue text-white">
              <Link to="/">Return to Homepage</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <p className="text-sm text-slate-500">
            Your global academic journey starts here.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Success;