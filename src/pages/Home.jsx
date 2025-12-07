import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  GraduationCap,
  Globe,
  Zap,
  Target,
  GitBranch,
  ChevronsRight,
  ChevronsLeft,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeoHelmet from '@/components/SeoHelmet';

const Home = () => {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);

  const handleScrollToPrograms = () => {
    const programsSection = document.getElementById('programs');
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fourPillars = [
    {
      icon: BookOpen,
      title: 'Workshops',
      description:
        'High-engagement programs delivered online or in-person at your school. Leadership, communication, entrepreneurship, psychology, AI, public speaking, and more—designed to build foundational skills that matter. Suitable for students Grade 6 and higher.',
      path: '/workshops',
    },
    {
      icon: Award,
      title: 'University Credit Courses',
      description:
        'Earn real U.S. university credits while still in school. Courses are taught synchronously by faculty from accredited American universities. Students who complete courses successfully request official transcripts directly from the university.',
      path: '/credit-courses',
    },
    {
      icon: GraduationCap,
      title: 'Diploma Program',
      description:
        'Structured pathways for academically serious students seeking significant U.S. university opportunities. Multiple tiers allow each student to advance at a pace aligned with their purpose and ambitions. Supports driven students seeking elite university admissions at the undergraduate or postgraduate level.',
      path: '/diploma-program',
    },
    {
      icon: Globe,
      title: 'Summer Programs',
      description:
        'Study on U.S., Singapore, or Dubai campuses, build confidence, and prepare for university life. Courses from top-rated U.S. professors. Get hands-on learning in business, engineering, computer science, medicine, psychology, and more.',
      path: '/summer-programs',
    },
  ];

  const whyAusaWorks = [
    {
      icon: Zap,
      title: 'Authentic University Experiences',
      description:
        'No generic "international programs." Students learn directly from university professors, following real academic expectations.',
    },
    {
      icon: GitBranch,
      title: 'Performance-Based Pathways',
      description:
        'Admissions, letters, support, and placement are tied to student merit and performance, not promises.',
    },
    {
      icon: Target,
      title: 'Designed for Global Competition',
      description:
        'Our programs prepare students to excel—not just to apply. Students develop the skills that selective universities and future employers value most.',
    },
    {
      icon: ArrowUp,
      title: 'Trusted by Schools and Universities',
      description:
        'AUSA partners with leading Indian schools and U.S. universities to create a smooth, transparent, academically grounded pathway.',
    },
  ];

  const studentSpotlights = [
    {
      image:
        'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/samiksha.png',
      alt: 'Samiksha Y at Hillsdale College.',
      quote:
        "Access USA gave me my first real experience studying with American professors. I learned how to think, ask better questions, and manage university-level expectations.",
      name: 'Samiksha Y.',
      achievement: 'Accepted with substantial scholarship at Hillsdale College',
    },
    {
      image:
        'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/apanda.png',
      alt: 'Aarish P at UC Santa Cruz',
      quote:
        'The diploma program challenged me throughout high school to be my best. The advisors helped me find the path that led to admission at the University of California. I felt supported at every step, from course selection to application essays.',
      name: 'Aarish P.',
      achievement:
        'Admitted to the University of California for Computer Science.',
    },
    {
      image: 'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/ditee.png',
      alt: 'Ditee M.',
      quote:
        'The summer program was a life-changing experience. I made friends from around the world and found the path to my career.',
      name: 'Ditee M.',
      achievement:
        'Multiple offer at top universities for International Law',
    },
    {
      image: 'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/gallatin.png',
      alt: 'A D.',
      quote:
        'Thanks to AUSA leadership I am now at my dream university - the Gallatin School of Individual Study at New York University!',
      name: 'Arham D.',
      achievement:
        'Admitted early to first choice university.',
    },
  ];

  const handleCarouselNav = (direction) => {
    setSpotlightIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % studentSpotlights.length;
      } else {
        return (prevIndex - 1 + studentSpotlights.length) % studentSpotlights.length;
      }
    });
  };

  const variants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  const handleAdvisorClick = () => {
    setShowAdvisorModal(true);
  };

  // Using the hero image for the Open Graph preview
  const ogImage = "https://images.unsplash.com/photo-1557989048-03456d01a26e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80";

  return (
    <>
      <SeoHelmet
        title="Access USA (AUSA) — Workshops, Credit Courses, Diploma & U.S. Summer Programs"
        description="Build a profile universities notice. AUSA delivers workshops, transcripted credit courses, a structured diploma pathway, and U.S. campus summer programs."
        image={ogImage}
        noIndex={false}
      />

      <div className="bg-white">
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight-navy text-white">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-33"
              alt="Bright, modern U.S. classroom with students engaged in discussion."
              src="https://images.unsplash.com/photo-1557989048-03456d01a26e"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy/60 via-midnight-navy/30 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-md">
                Build A Profile That Opens Global University Doors
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto drop-shadow-sm">
                Unlock world-class opportunities through high-impact workshops, credit-bearing courses, and summer programs taughts by U.S. faculty. Where purpose-driven students build real academic achievements and stand out globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleScrollToPrograms}>
                  Explore Programs
                </Button>
                <Link to="/apply">
                  <Button size="lg" variant="secondary">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="programs" className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-4">Four Pathways to Success</h2>
              <p className="text-xl text-slate-gray max-w-3xl mx-auto">
                Our integrated programs create a powerful, coherent narrative for your university applications.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {fourPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200/80 flex flex-col"
                >
                  <div className="bg-indigo text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <pillar.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl mb-3">{pillar.title}</h3>
                  <p className="text-slate-gray mb-6 flex-grow">{pillar.description}</p>
                  <Link
                    to={pillar.path}
                    className="text-indigo font-bold hover:text-electric-blue inline-flex items-center group mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-4">Why Students Choose AUSA</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {whyAusaWorks.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center p-8"
                >
                  <div className="flex justify-center mb-6">
                    <div className="bg-warm-gold/20 text-warm-gold rounded-full p-4">
                      <item.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-slate-gray">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl mb-4">Real Students.  Real Outcomes.</h2>
              <p className="text-xl text-slate-gray max-w-2xl mx-auto">
                Every student featured on this page has completed AUSA programs and demonstrated the qualities we value most: drive, discipline, and the desire to make an impact.
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden relative h-96 flex items-center justify-center">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={spotlightIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-full absolute"
                  >
                    <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft border border-slate-200/80 text-center">
                      <img
                        loading="lazy"
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                        alt={studentSpotlights[spotlightIndex].alt}
                        src={studentSpotlights[spotlightIndex].image}
                      />
                      <p className="text-lg text-slate-gray mb-4">
                        "{studentSpotlights[spotlightIndex].quote}"
                      </p>
                      <p className="font-bold text-midnight-navy text-lg">
                        {studentSpotlights[spotlightIndex].name}
                      </p>
                      <p className="text-indigo">
                        {studentSpotlights[spotlightIndex].achievement}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-0 sm:-left-16 sm:-right-16 -left-8 -right-8">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-white/50 backdrop-blur-sm shadow-md"
                  onClick={() => handleCarouselNav('prev')}
                  aria-label="Previous testimonial"
                >
                  <ChevronsLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-white/50 backdrop-blur-sm shadow-md"
                  onClick={() => handleCarouselNav('next')}
                  aria-label="Next testimonial"
                >
                  <ChevronsRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 bg-electric-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-10">
                Start your journey today.
              </h2>
              <p className="text-xl text-white max-w-2xl mx-auto mb-8">
              Whether you're a student, parent, counselor, or school leader, AUSA gives you a clear, performance-driven path to global academic success.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/apply">
                  <Button size="lg" className="bg-white text-electric-blue hover:bg-gray-100">
                    Apply
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-white text-electric-blue hover:bg-gray-100"
                  onClick={handleAdvisorClick}
                >
                  Talk to an Advisor
                </Button>
                <Link to="/for-schools">
                  <Button size="lg" className="bg-white text-electric-blue hover:bg-gray-100">
                    Invite AUSA to Your School
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Advisor Zoom scheduler modal */}
        {showAdvisorModal && (
          <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 py-6 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-midnight-navy">
                  Schedule a Meeting with the AUSA Team
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAdvisorModal(false)}
                  className="p-1 rounded-full hover:bg-slate-100"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-4 flex-1">
                <div className="w-full h-full overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    src="https://scheduler.zoom.us/ausa-team/ausa-meeting-with-samir?embed=true"
                    title="Schedule a meeting with the AUSA Team"
                    frameBorder="0"
                    style={{ width: '100%', height: '560px' }}
                    allow="microphone; camera; fullscreen"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;