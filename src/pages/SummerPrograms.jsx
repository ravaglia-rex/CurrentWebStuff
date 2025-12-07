import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Widget } from '@typeform/embed-react';
import {
  Calendar,
  School,
  FlaskConical,
  Building,
  Presentation,
  ShieldCheck,
  MessageCircle,
  Home,
  FileText,
  PenSquare,
  Award,
  Users,
  Dna,
  Brain,
  Code,
  Briefcase,
  ChevronsRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';

const summerProgramsData = [
  {
    title: 'Medical Research Methods',
    grades: '9–12',
    learn: [
      'Understanding the replication crisis in medical science',
      'Robust design principles including preregistration and open-science reforms',
      'Hands-on replication of studies following precise protocols',
      'Mock peer review process for giving and receiving scientific criticism',
    ],
    formats: ['12-day residential program'],
    artifact:
      'Preregistration documents, protocol-true analysis, defended interpretations, and outcomes demonstrating scientific integrity.',
    creditPath: 'Up to 3 university credits',
    delivery: 'In-person in USA, Singapore, or Dubai',
    prereqs: 'None',
    icon: Dna,
  },
  {
    title: 'Experimental Psychology & Neuropsychology',
    grades: '9–12',
    learn: [
      'Brain-behavior connections using tools like fMRI and EEG',
      'Designing rigorous behavioral studies with controls and ethical considerations',
      'Interpreting statistical results and understanding limitations',
      'Presenting findings with clear acknowledgment of limitations',
    ],
    formats: ['12-day residential program'],
    artifact:
      'Original study design, statistical interpretation of results, and presented findings acknowledging limitations.',
    creditPath: 'Up to 3 university credits',
    delivery: 'In-person in USA, Singapore, or Dubai',
    prereqs: 'None',
    icon: Brain,
  },
  {
    title: 'Artificial Intelligence (ML, GenAI & Robotics)',
    grades: '9–12',
    learn: [
      'Machine learning basics progressing to deep learning and robotics applications',
      'Ethics, bias mitigation, privacy protection, and AI’s impact on the future of work',
      'Building responsible AI systems with data foundations',
      'Capstone including prototype, risk assessment, and demonstration',
    ],
    formats: ['12-day residential program'],
    artifact:
      'Working prototype or system outline, risk assessment with mitigations, public demonstration, and design documentation.',
    creditPath: 'Up to 3 university credits',
    delivery: 'In-person in USA, Singapore, or Dubai',
    prereqs: 'None',
    icon: Code,
  },
  {
    title: 'Entrepreneurship & Innovation: Mobility',
    grades: '9–12',
    learn: [
      'Understanding the mobility landscape, emerging technologies, and market gaps',
      'Customer discovery, validation, and testing assumptions',
      'Market sizing, economics, and business models (TAM/SAM/SOM)',
      'Designing pilots, considering regulations and policy implications',
    ],
    formats: ['12-day residential program'],
    artifact:
      'Venture brief, financial projections, pitch deck with demonstration, and polished pitch presentation.',
    creditPath: 'Up to 3 university credits',
    delivery: 'In-person in USA, Singapore, or Dubai',
    prereqs: 'None',
    icon: Briefcase,
  },
  {
    title: 'Experiential Leadership',
    grades: '9–12',
    learn: [
      'Inclusive teamwork that leverages diverse perspectives',
      'Ethical decision-making under pressure',
      'Persuasive presentations that move audiences',
      'Conflict resolution that preserves relationships',
    ],
    formats: ['12-day residential program'],
    artifact:
      'Documented evidence of growth in soft skills, including simulations, capstone team initiative, and feedback records.',
    creditPath: 'Up to 3 university credits',
    delivery: 'In-person in USA, Singapore, or Dubai',
    prereqs: 'None',
    icon: Users,
  },
];

const highlights = [
  { icon: School, text: 'University Classrooms & Maker Spaces' },
  { icon: FlaskConical, text: 'Hands-On Lab Tours & Experiments' },
  { icon: Building, text: 'Industry Visits to Tech, Health & Mobility Hubs' },
  { icon: Presentation, text: 'Final Showcase with Expert Feedback' },
];

const outcomes = [
  {
    icon: FileText,
    title: 'Portfolio Artifacts',
    description: 'Tangible projects from your coursework to showcase your skills.',
  },
  {
    icon: PenSquare,
    title: 'Guided Reflection Essay',
    description: 'A structured essay to articulate your growth and learnings.',
  },
  {
    icon: Award,
    title: 'Potential Recommendation Letters',
    description:
      'Opportunity to earn a letter of recommendation for standout performance.',
  },
];

const SummerPrograms = () => {
  const { toast } = useToast();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const timerRef = useRef(null);

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel || !carousel.children || !carousel.children.length) return;

    const firstChild = carousel.children[0];
    const itemWidth = firstChild.offsetWidth + 24; // width + gap
    carousel.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
  };

  // Sync activeIndex with scroll position
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const currentCarousel = carouselRef.current;
      if (!currentCarousel || !currentCarousel.children || !currentCarousel.children.length) {
        return;
      }

      const firstChild = currentCarousel.children[0];
      const itemWidth = firstChild.offsetWidth + 24;
      const scrollPosition = currentCarousel.scrollLeft;
      const newIndex = Math.round(scrollPosition / itemWidth);

      setActiveIndex((prev) =>
        newIndex >= 0 && newIndex < summerProgramsData.length ? newIndex : prev
      );
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => {
      carousel.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Autoplay carousel with reduced-motion + interaction awareness
  useEffect(() => {
    if (!isAutoplayEnabled) return;

    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
    }

    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % summerProgramsData.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isAutoplayEnabled]);

  const scrollLeft = () => {
    setIsAutoplayEnabled(false);
    setActiveIndex((prev) => {
      const next = prev > 0 ? prev - 1 : summerProgramsData.length - 1;
      scrollToIndex(next);
      return next;
    });
  };

  const scrollRight = () => {
    setIsAutoplayEnabled(false);
    setActiveIndex((prev) => {
      const next = (prev + 1) % summerProgramsData.length;
      scrollToIndex(next);
      return next;
    });
  };

  const handleDotClick = (index) => {
    setIsAutoplayEnabled(false);
    setActiveIndex(index);
    scrollToIndex(index);
  };

  const handleCTA = () => {
    toast({
      title: '🚧 Feature Coming Soon!',
      description:
        'Our team contact form is in the works. For now, use the application form below and we’ll follow up directly. 🚀',
    });
  };

  const handleApplyClick = () => {
    window.open(
      'https://3cr104nr5wm.typeform.com/ausaidc2026',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleExploreClick = () => {
    window.open(
      'http://access-usa-lmb0f5a.gamma.site/',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'AUSA Summer Programs',
    description:
      "Experience U.S. campuses, labs, and industry visits with focused coursework through AUSA's transformative summer programs.",
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: [
      {
        '@type': 'Place',
        name: 'Partner Universities – United States',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'Place',
        name: 'Partner Universities – Singapore',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'SG',
        },
      },
      {
        '@type': 'Place',
        name: 'Partner Universities – Dubai',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'AE',
        },
      },
    ],
    organizer: {
      '@type': 'Organization',
      name: 'Access USA (AUSA)',
      url: 'https://www.ausa.io',
    },
  };

  return (
    <>
      <SeoHelmet
        title="Summer Programs"
        description="Experience U.S. campuses, labs, and industry visits with focused coursework through AUSA's transformative summer programs."
        type="website"
        jsonLd={eventJsonLd}
      />
      <div className="bg-white text-slate-gray">
        {/* HERO + PRIMARY CTA */}
        <section className="bg-gradient-to-r from-warm-gold to-orange-400 py-16 md:py-20 lg:py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                Immersive U.S. Summer Programs
              </h1>
              <p className="text-xl md:text-2xl text-slate-800 max-w-3xl mx-auto">
                Experience U.S. campuses, labs, and industry visits with focused coursework
                that brings your learning to life.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleApplyClick}
                  className="rounded-full px-8 text-base font-semibold shadow-lg"
                >
                  Apply for Summer 2026
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleExploreClick}
                  className="rounded-full px-8 text-base font-semibold border-white/70 text-midnight-navy bg-white/10 backdrop-blur hover:bg-white/20"
                >
                  View Detailed Program Overview
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STRUCTURE STRIP */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col items-center"
              >
                <Calendar className="w-12 h-12 text-electric-blue mb-4" />
                <h3 className="text-xl font-bold text-midnight-navy mb-2">
                  12-Day Immersive Structure
                </h3>
                <p className="text-slate-600">
                  Intensive, focused programs designed for deep immersion and impact.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <School className="w-12 h-12 text-electric-blue mb-4" />
                <h3 className="text-xl font-bold text-midnight-navy mb-2">
                  Classes & Site Visits
                </h3>
                <p className="text-slate-600">
                  A dynamic blend of university-level classes and exclusive visits to leading
                  companies.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <Award className="w-12 h-12 text-electric-blue mb-4" />
                <h3 className="text-xl font-bold text-midnight-navy mb-2">Optional Credit</h3>
                <p className="text-slate-600">
                  Clearly labeled opportunities to earn university credit are available for
                  select programs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="bg-gray-50/70 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Program Highlights
              </h2>
              <p className="text-lg text-slate-600">
                Go beyond the classroom and engage with innovation where it happens.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center border border-slate-200/60 shadow-soft"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo text-white rounded-full p-4">
                      <highlight.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <p className="font-semibold text-midnight-navy">{highlight.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TRACKS CAROUSEL */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-center mb-2 text-midnight-navy">
              Explore the Program Tracks
            </h2>
            <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
              Choose a track aligned with your interests in science, technology, business, or
              leadership. All tracks share the same rigorous, project-based design.
            </p>
            <div className="relative">
              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                onMouseEnter={() => setIsAutoplayEnabled(false)}
                onMouseLeave={() => setIsAutoplayEnabled(true)}
                tabIndex={0}
                aria-roledescription="carousel"
                aria-label="Summer program tracks"
              >
                {summerProgramsData.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-6 flex flex-col hover:shadow-lg transition-shadow duration-300 min-w-[320px] md:min-w-[360px] snap-start"
                    aria-label={program.title}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-midnight-navy pr-4">
                        {program.title}
                      </h3>
                      <div className="bg-indigo text-white rounded-lg p-3 shrink-0">
                        <program.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="font-bold text-sm text-slate-500 mb-2">
                      Grades: {program.grades}
                    </p>
                    <div className="space-y-4 mb-6 flex-grow">
                      <p className="font-bold text-sm text-slate-600">
                        What you&apos;ll learn:
                      </p>
                      <ul className="space-y-2 list-inside">
                        {program.learn.slice(0, 5).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronsRight className="w-4 h-4 text-warm-gold mr-2 mt-1 shrink-0" />
                            <span className="text-slate-gray text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-sm space-y-3 pt-4 mt-auto border-t border-slate-200">
                      <p>
                        <strong className="text-slate-500">Format:</strong>{' '}
                        {program.formats.join(', ')}
                      </p>
                      <p>
                        <strong className="text-slate-500">Outcomes:</strong>{' '}
                        {program.artifact}
                      </p>
                      <p>
                        <strong className="text-slate-500">Credit:</strong>{' '}
                        {program.creditPath}
                      </p>
                      <p>
                        <strong className="text-slate-500">Delivery:</strong>{' '}
                        {program.delivery}
                      </p>
                      {program.prereqs !== 'None' && (
                        <p>
                          <strong className="text-slate-500">Prerequisites:</strong>{' '}
                          {program.prereqs}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={scrollLeft}
                variant="ghost"
                className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                aria-label="Previous program"
              >
                <ArrowLeft className="w-6 h-6 text-midnight-navy" />
              </Button>
              <Button
                onClick={scrollRight}
                variant="ghost"
                className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                aria-label="Next program"
              >
                <ArrowRight className="w-6 h-6 text-midnight-navy" />
              </Button>
              <div className="flex justify-center mt-4 gap-2">
                {summerProgramsData.map((program, index) => (
                  <button
                    key={program.title}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeIndex === index ? 'bg-midnight-navy' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to ${program.title}`}
                    aria-pressed={activeIndex === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PEDAGOGY & DAILY SCHEDULE */}
        <section className="bg-gray-50/70 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Pedagogy & Delivery Model
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Active Learning, Not Passive Lectures
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-slate-600 mb-6">
                Course materials are released approximately one month before the program
                begins, with required pre-arrival sessions to ensure all students start with
                foundational knowledge. Once on campus, there are no traditional lectures—instead,
                you&apos;ll engage in live seminars, hands-on labs, and coached project work.
              </p>
              <p className="text-slate-600 mb-6">
                Students dedicate approximately 5 hours per day to intensive academic work,
                supplemented by site visits and cultural exchange activities. Multiple cohorts
                run concurrently across partner institutions, creating a vibrant international
                learning community.
              </p>
              <p className="text-slate-600">
                Final presentations are livestreamed publicly, and the best projects from each
                track advance to a head-to-head showcase competition—an opportunity to
                demonstrate your growth to a global audience.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto overflow-x-auto"
            >
              <h3 className="text-2xl font-bold text-midnight-navy mb-6 text-center">
                Daily Schedule
              </h3>
              <table className="w-full text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-slate-200 p-4">Time</th>
                    <th className="border border-slate-200 p-4">Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 p-4">08:30–09:00</td>
                    <td className="border border-slate-200 p-4">
                      Community stand-up (daily updates, logistics, peer support)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">09:00–10:30</td>
                    <td className="border border-slate-200 p-4">
                      Seminar/Lab 1 (applied content with faculty)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">10:30–10:45</td>
                    <td className="border border-slate-200 p-4">Break</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">10:45–12:00</td>
                    <td className="border border-slate-200 p-4">
                      Lab 2 / Project work (coached development)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">12:00–13:15</td>
                    <td className="border border-slate-200 p-4">Lunch</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">13:15–14:15</td>
                    <td className="border border-slate-200 p-4">
                      Skills mini-workshop (data visualization, pitching, feedback)
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">14:15–15:00</td>
                    <td className="border border-slate-200 p-4">Team sprint preparation</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">15:00–18:30</td>
                    <td className="border border-slate-200 p-4">
                      Team sprint sessions / TA office hours
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">19:30–20:30</td>
                    <td className="border border-slate-200 p-4">
                      Cultural/recreational activities and field visits
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 p-4">22:30</td>
                    <td className="border border-slate-200 p-4">Quiet hours</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Note: 1–2 field days may include substantive visits to companies or partner
                organizations, integrating real-world context into your learning.
              </p>
            </motion.div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Key Features
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Authenticity, Recognition, Continuity, and Growth
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-midnight-navy mb-4">
                  Authenticity & Recognition
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Multi-Campus Global Community: Program is not dependent on successfully
                    obtaining US Visa, learn in one of many international settings.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Real Faculty, Real Credit: Taught by university professors, not high school
                    teachers—with official credit documented on university transcripts.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Recognized Certificates: Co-branded certificates from Access USA and
                    participating universities that carry institutional weight.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Portfolio-Building Finals: Final presentations livestreamed with recordings
                    available for student portfolios and future applications.
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-midnight-navy mb-4">
                  Continuity & Growth
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Research Continuation: Online colloquia after the program to develop and
                    refine your work with faculty guidance - build on top of what you begin this
                    summer.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    Publication Pathways: Support for students who complete substantial research
                    projects to pursue publication opportunities.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    International Recognition: Competitions, showcases, and opportunities for
                    exceptional work to gain broader visibility.
                  </li>
                  <li className="flex items-start">
                    <ChevronsRight className="w-5 h-5 text-warm-gold mr-2 mt-1 shrink-0" />
                    AUSA Diploma Progression: Structured pathways with scholarships and fee caps
                    for continued engagement in AUSA programs.
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section className="bg-gray-50/70 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Admissions Process
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Who Should Apply and How
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-200/80"
              >
                <h3 className="text-xl font-bold text-midnight-navy mb-4">Student Profile</h3>
                <p className="text-slate-600">
                  High school students in Grades 9–12 who are ready for university-level work
                  and want to explore their passions deeply.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-200/80"
              >
                <h3 className="text-xl font-bold text-midnight-navy mb-4">
                  Admissions Process
                </h3>
                <p className="text-slate-600">
                  We review academic records, thoughtful essays, and teacher recommendations to
                  identify students who will thrive. Holistic evaluation considers motivation,
                  curiosity, and readiness.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-soft border border-slate-200/80"
              >
                <h3 className="text-xl font-bold text-midnight-navy mb-4">Visa Support</h3>
                <p className="text-slate-600">
                  Visa review integrated into the application process with full support through
                  documentation and consulate procedures and alternative locations not requiring
                  visa. Comprehensive guidance every step of the way. Program is offered in USA,
                  Singapore, and Dubai, not dependent on successfully obtaining US Visa.
                </p>
              </motion.div>
            </div>
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                onClick={handleCTA}
                className="rounded-full px-8 text-sm font-semibold"
              >
                Have a question? Talk to our team
              </Button>
            </div>
          </div>
        </section>

        {/* SAFETY & SUPERVISION */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                  Safety & Supervision
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Your well-being is our top priority. We ensure a safe, supportive, and
                  structured environment for all participants.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-electric-blue/10 text-electric-blue rounded-full p-3 mr-4">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-midnight-navy">
                        Clear Safety Policies
                      </h3>
                      <p className="text-slate-600">
                        Comprehensive protocols and 24/7 on-site staff ensure a secure
                        experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-electric-blue/10 text-electric-blue rounded-full p-3 mr-4">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-midnight-navy">
                        Parent Communications
                      </h3>
                      <p className="text-slate-600">
                        Regular updates and a dedicated contact line for parents provide peace
                        of mind.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-electric-blue/10 text-electric-blue rounded-full p-3 mr-4">
                      <Home className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-midnight-navy">Secure Housing</h3>
                      <p className="text-slate-600">
                        Students are housed in supervised dormitories on or near university
                        campuses.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <img
                  loading="lazy"
                  className="rounded-2xl shadow-xl w-full h-auto"
                  alt="A diverse group of happy students working together on a project in a modern, sunlit classroom."
                  src="https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/labscene2.png"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="bg-gray-50/70 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Valuable Outcomes
              </h2>
              <p className="text-lg text-slate-600">
                Leave with more than just memories. Our programs deliver tangible assets for
                your university applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-slate-200/60 shadow-soft text-center"
                >
                  <div className="flex justify-center mb-5">
                    <div className="bg-warm-gold text-white rounded-full p-4">
                      <outcome.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-slate-600">{outcome.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl mb-4">Get Started with AUSA</h2>
              <p className="text-xl text-slate-gray max-w-3xl mx-auto">
                Fill out the form below to apply. Our team will review your application and
                follow up with next steps.
              </p>
            </motion.div>
            <Widget
              id="l7hioZPU"
              style={{ width: '100%', height: '600px' }}
              className="my-form"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default SummerPrograms;