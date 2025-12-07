import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SeoHelmet from '@/components/SeoHelmet';

const faqs = [
  {
    question: 'Who teaches AUSA programs?',
    answer:
      'Workshops and credit courses are taught by U.S. university faculty or experienced academic professionals. Summer programs and advanced offerings are also faculty-led, with support from trained teaching assistants. All courses happen live, whether in-person or online.',
  },
  {
    question: 'Are credit courses real university courses?',
    answer:
      'Yes. Students take official live, synchronous courses taught by university faculty and may request an official university transcript after completion. These are the same courses—delivered to the same standards—that the university offers its own students.',
  },
  {
    question: 'How do workshops work?',
    answer:
      'Workshops may be delivered in-person at your school, online intensively over 5 days, or online weekly for 5 weeks. Each workshop has a clear syllabus, defined learning outcomes, and a final artifact (such as a presentation, project, or reflection) that students can use in their portfolios.',
  },
  {
    question: 'Who can apply for credit courses?',
    answer:
      'Students in grades 9–12 with strong academic performance and recommendations are eligible to apply. We review transcripts, teacher comments, and (where relevant) writing samples to make sure students are ready for university-level work.  Younger students may be considered on a case-by-case basis.',
  },
  {
    question: 'Where are summer programs held?',
    answer:
      'Summer programs are hosted at participating U.S. universities on their main campuses. In addition, AUSA hosts summer program on campuses in Singapore and Dubai for students who are unable to travel to the United States in a given year.',
  },
  {
    question: 'How do credits transfer?',
    answer:
      'Students request transcripts directly from the partner university and submit them as part of university applications or credit transfer requests. The decision to award transfer credit is made by the receiving institution, based on its own policies.',
  },
  {
    question: 'Does AUSA guarantee university admission?',
    answer:
      'While there are guaranteed admissions pathways for certain diploma programs, all admission decisions are made by universities. Our role is to help students build legitimate academic readiness—through real courses, evaluated work, and clearly documented achievements—so they can present a strong, honest profile.',
  },
  {
    question: 'What makes AUSA different?',
    answer:
      'We are academic-first, merit-driven, and focused on measurable performance—not shortcuts or inflated claims. Students advance through genuine work, faculty feedback, and visible growth in skills, not through purchased credentials or guarantees.',
  },
];

const FAQs = () => {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SeoHelmet
        title="Frequently Asked Questions (FAQs)"
        description="Find answers to common questions about Access USA workshops, credit courses, summer programs, and how our academic-first model works."
        jsonLd={faqJsonLd}
      />
      <div className="bg-white">
        <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                Have a question? We&apos;ve got answers. If you don&apos;t see what you&apos;re
                looking for, feel free to contact us.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`item-${index}`}
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-midnight-navy hover:text-electric-blue py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQs;