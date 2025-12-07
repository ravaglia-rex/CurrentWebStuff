import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Users, Video, FileText, Star, ArrowRight, Phone, CheckCircle, Calculator, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import SeoHelmet from '@/components/SeoHelmet';
import { supabase } from '@/lib/customSupabaseClient';

// Inline icon helpers
const Code = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>;
const Puzzle = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2v-2h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4"></path>
  </svg>;
const BrainCog = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M2.5 7.56A4.5 4.5 0 0 1 7.1 3.5h0a4.5 4.5 0 0 1 4.52 4.49" />
    <path d="M16.9 3.5h0a4.5 4.5 0 0 1 4.6 4.06" />
    <path d="M21.5 7.56A4.5 4.5 0 0 0 16.9 3.5" />
    <path d="M9 13H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4" />
    <path d="M15 13h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4" />
    <path d="M5.5 13.5A4.5 4.5 0 0 0 10 18h4a4.5 4.5 0 0 0 4.5-4.5" />
    <path d="M5.5 13.5A4.5 4.5 0 0 1 1 9h0" />
    <path d="M18.5 13.5A4.5 4.5 0 0 0 23 9h0" />
    <circle cx="12" cy="18" r="3" />
    <circle cx="12" cy="9" r="1" />
  </svg>;
const Dna = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.6,4.6a5,5,0,0,1,7.07,0L13.1,6.1a2,2,0,0,0,2.83,0l1.41-1.41a5,5,0,0,1,7.07,7.07l-1.41,1.41a2,2,0,0,0,0,2.83l1.41,1.41a5,5,0,0,1-7.07,7.07l-1.41-1.41a2,2,0,0,0-2.83,0l-1.41,1.41a5,5,0,0,1-7.07-7.07l1.41-1.41a2,2,0,0,0,0-2.83Z" />
  </svg>;
const Lightbulb = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8c0-2.2-1.8-4-4-4-1.2 0-2.3.5-3.1 1.4-1.2 1.2-2.3 3.3-2.3 5.6C8.6 12 9 13.4 10 14h5z" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>;
const MicIcon = props => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>;

// Catalog structure
const courseCatalog = [{
  slug: 'stem',
  name: 'STEM, Engineering & Computing',
  icon: Dna,
  blurb: 'For future engineers, doctors, scientists, and technologists who want a rigorous STEM foundation.',
  courses: [{
    name: 'Biotechnology and Synthetic Biology',
    summary: 'Explore biotech applications in medicine, agriculture, and sustainability through virtual labs and project work.'
  }, {
    name: 'Physics of the Human Body',
    summary: 'Connect core physics concepts to anatomy, biomechanics, and medical technologies using interactive case examples.'
  }, {
    name: 'Neuropsychology',
    level: 'Beginner · No prerequisites',
    summary: 'Study how brain function relates to behavior, cognition, and emotion—ideal preparation for psychology or neuroscience.'
  }, {
    name: 'Introduction to Human Anatomy (2026–27)',
    level: 'Intermediate · Basic biology recommended',
    summary: 'Build essential anatomy knowledge for health and medical careers using visual tools and structured modules.'
  }, {
    name: 'Interdisciplinary Design and Manufacturing',
    summary: 'Experience the fundamentals of engineering design and manufacturing processes through hands-on projects.'
  }, {
    name: 'Principles of Electrical and Computer Engineering',
    summary: 'Gain a broad introduction to circuits, systems, and computing hardware as a foundation for further engineering study.'
  }, {
    name: 'Introduction to Programming – Python and AI',
    summary: 'Learn core programming concepts in Python (with exposure to Java) and practice algorithmic thinking with AI-assisted tools.'
  }, {
    name: 'Introduction to Robotics / Python',
    summary: 'Combine coding and hardware concepts to design and program simple robots, with an emphasis on creativity and problem-solving.'
  }, {
    name: 'Introduction to Data Science / Python',
    summary: 'Use Python to analyze, visualize, and interpret data, preparing for more advanced data science and analytics work.'
  }, {
    name: 'Environmental Science & Sustainability',
    summary: 'Study climate, ecosystems, and sustainability practices through projects and case studies guided by industry perspectives.'
  }, {
    name: 'Cybersecurity I (Beginner)',
    level: 'Beginner',
    summary: 'Learn fundamentals of cybersecurity, threat identification, and safe practices using guided mock scenarios.'
  }, {
    name: 'Cybersecurity II (Intermediate)',
    level: 'Intermediate · Cybersecurity I recommended',
    summary: 'Develop ethical hacking and defense strategies to understand how modern systems are attacked and secured.'
  }, {
    name: 'Higher Mathematics and Proof',
    summary: 'Learn to think like a mathematician by working with rigorous reasoning and proof, bridging into higher-level math.'
  }]
}, {
  slug: 'humanities',
  name: 'Humanities & Communication',
  icon: BookOpen,
  blurb: 'For students who love reading, writing, speaking, and understanding people and cultures.',
  courses: [{
    name: 'Creative Writing',
    summary: 'Experiment with fiction and non-fiction while building a digital portfolio of polished pieces.'
  }, {
    name: 'Public Speaking and Presentation',
    summary: 'Develop confident speaking, persuasive communication, and digital storytelling through structured practice.'
  }, {
    name: 'Research Writing',
    summary: 'Master thesis development, academic argumentation, and citation skills essential for university coursework.'
  }, {
    name: 'Global Citizenship & Cross-Cultural Communication',
    summary: 'Build intercultural awareness and communication skills through collaborative, globally-focused projects.'
  }, {
    name: 'Digital Media & Journalism',
    summary: 'Explore modern media creation and reporting while producing portfolio-ready digital journalism pieces.'
  }, {
    name: 'Philosophy & Critical Thinking',
    summary: 'Sharpen reasoning and analytical skills through guided discussions of ethics, logic, and contemporary issues.'
  }]
}, {
  slug: 'social-sciences',
  name: 'Social Sciences & Law',
  icon: Users,
  blurb: 'For students interested in economics, politics, law, psychology, and global affairs.',
  courses: [{
    name: 'Economics Principles',
    summary: 'Study micro and macroeconomics with real-world applications in finance, business, and public policy.'
  }, {
    name: 'Global History & Politics',
    summary: 'Survey major historical events and current political issues using simulations and global case studies.'
  }, {
    name: 'Introduction to the Law & Jurisprudence',
    summary: 'Explore foundational legal principles, legal reasoning, and landmark cases using primary-source readings.'
  }, {
    name: 'International Relations & Model United Nations',
    summary: 'Practice diplomacy, negotiation, and policy analysis through immersive Model UN-style simulations.'
  }, {
    name: 'Political Science – International Relations & the Global Order',
    summary: 'Go deeper into political theory and global governance with advanced debate and policy analysis.'
  }, {
    name: 'Psychology',
    summary: 'Investigate human behavior and mental processes through cognitive psychology case studies and discussions.'
  }]
}, {
  slug: 'business',
  name: 'Business & Management',
  icon: Calculator,
  blurb: 'For future founders, managers, analysts, and leaders in the world of commerce and enterprise.',
  courses: [{
    name: 'Leadership',
    summary: 'Build practical leadership skills using case studies and interactive exercises focused on teams and projects.'
  }, {
    name: 'Introduction to Business and Management',
    summary: 'Gain a broad overview of how organizations work, from strategy and structure to operations.'
  }, {
    name: 'Personal Finance',
    summary: 'Learn to budget, save, and invest wisely as you build strong lifelong financial literacy.'
  }, {
    name: 'Marketing',
    summary: 'Study how to understand customers and design campaigns that communicate value and drive growth.'
  }, {
    name: 'Business Visuals & Media Technology',
    summary: 'Use visual tools and media to present business ideas clearly and persuasively.'
  }, {
    name: 'Business Analytics / Python',
    summary: 'Apply Python and data analysis techniques to business problems and decision-making.'
  }, {
    name: 'Organizational Behavior',
    summary: 'Examine how individuals and teams behave in organizations to improve leadership and culture.'
  }, {
    name: 'Business Ethics',
    summary: 'Work through real-world ethical dilemmas in business and learn frameworks for sound decisions.'
  }, {
    name: 'Entrepreneurship & Small Business Management',
    summary: 'Walk through the lifecycle of starting and growing a small business, from idea to sustainable operation.'
  }]
}];
const deliveryFeatures = [{
  name: 'Live Synchronous Classes',
  icon: Video,
  description: 'Attend real-time sessions with professors and peers, mirroring the pace and expectations of a U.S. university classroom.'
}, {
  name: 'Taught by U.S. Professors',
  icon: Users,
  description: 'Learn directly from faculty at accredited American universities who understand global admissions expectations.'
}, {
  name: 'Small, Interactive Cohorts',
  icon: Users,
  description: 'Benefit from meaningful discussion, regular feedback, and active participation—not just recorded lectures.'
}, {
  name: 'University-Level Assessments',
  icon: BookOpen,
  description: 'Engage with readings, assignments, projects, and exams that reflect real university coursework.'
}];
const outcomes = [{
  name: 'Official University Transcripts',
  icon: FileText,
  description: 'Receive a formal transcript from a university. This is one of the strongest signals of academic readiness you can present.'
}, {
  name: 'Graded Academic Work',
  icon: Star,
  description: 'Build a portfolio of graded essays, projects, and exams that demonstrate your ability to perform in a real university course.'
}, {
  name: 'Faculty Recommendations',
  icon: Award,
  description: 'Exceptional performance can lead to letters from U.S. professors who have directly taught and evaluated you.'
}];
const PREFERRED_TERMS = ['April–June 2025', 'July–September 2025', 'October–December 2025', 'January–March 2026', 'April-May 2026', 'Later / Not sure yet'];
const CreditCourses = () => {
  const {
    toast
  } = useToast();
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const [showPreregModal, setShowPreregModal] = useState(false);
  const [preRegSubmitting, setPreRegSubmitting] = useState(false);
  const [preRegError, setPreRegError] = useState('');
  const [preRegForm, setPreRegForm] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentEmail: '',
    studentPhone: '',
    schoolName: '',
    schoolCity: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredTerm: '',
    interestedCourses: []
  });
  const handleAdvisorClick = () => {
    setShowAdvisorModal(true);
  };
  const handlePreRegClick = () => {
    setPreRegError('');
    setShowPreregModal(true);
  };
  const handlePreRegChange = e => {
    const {
      id,
      value
    } = e.target;
    setPreRegForm(prev => ({
      ...prev,
      [id]: value
    }));
  };
  const handleCourseToggle = courseName => {
    setPreRegForm(prev => {
      const exists = prev.interestedCourses.includes(courseName);
      return {
        ...prev,
        interestedCourses: exists ? prev.interestedCourses.filter(c => c !== courseName) : [...prev.interestedCourses, courseName]
      };
    });
  };
  const handlePreRegSubmit = async e => {
    e.preventDefault();
    setPreRegError('');
    if (!preRegForm.studentFirstName.trim() || !preRegForm.studentEmail.trim()) {
      setPreRegError('Please provide at least your name and email so we can contact you.');
      return;
    }
    if (!preRegForm.parentName.trim() || !preRegForm.parentEmail.trim()) {
      setPreRegError('Please provide a parent/guardian name and email.');
      return;
    }
    try {
      setPreRegSubmitting(true);
      const payload = {
        student_first_name: preRegForm.studentFirstName.trim(),
        student_last_name: preRegForm.studentLastName.trim() || null,
        student_email: preRegForm.studentEmail.trim(),
        student_phone: preRegForm.studentPhone.trim() || null,
        school_name: preRegForm.schoolName.trim() || null,
        school_city: preRegForm.schoolCity.trim() || null,
        parent_name: preRegForm.parentName.trim(),
        parent_email: preRegForm.parentEmail.trim(),
        parent_phone: preRegForm.parentPhone.trim() || null,
        preferred_term: preRegForm.preferredTerm || null,
        interested_courses: preRegForm.interestedCourses.length ? preRegForm.interestedCourses : null,
        source_page: 'credit-courses',
        status: 'new'
      };
      const {
        error
      } = await supabase.from('course_preregistrations').insert(payload);
      if (error) {
        console.error(error);
        setPreRegSubmitting(false);
        setPreRegError('Could not save your pre-registration. Please try again.');
        return;
      }

      // 🔔 Best-effort email notification via Edge Function (non-blocking)
      ;
      (async () => {
        try {
          await supabase.functions.invoke('notify-new-lead', {
            body: {
              kind: 'course_prereg',
              sourceTable: 'course_preregistrations',
              id: 'not-available-from-anon-client',
              main: {
                name: `${payload.student_first_name} ${payload.student_last_name || ''}`.trim() || null,
                email: payload.student_email || null,
                school: payload.school_name || null,
                country: null,
                // you can add a country field later if you collect it
                sourcePage: window.location.pathname,
                status: payload.status || null,
                // 'new'
                extraSummary: Array.isArray(payload.interested_courses) ? payload.interested_courses.join(', ') : null
              }
            }
          });
        } catch (e) {
          // Optional: log, but never bother the user
          // console.warn('notify-new-lead (course_prereg) failed', e);
        }
      })();
      setPreRegSubmitting(false);
      setShowPreregModal(false);
      setPreRegForm({
        studentFirstName: '',
        studentLastName: '',
        studentEmail: '',
        studentPhone: '',
        schoolName: '',
        schoolCity: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        preferredTerm: '',
        interestedCourses: []
      });
      toast({
        title: 'Pre-registration received',
        description: 'Thank you! We will notify you when new credit courses are scheduled that match your interests.'
      });
    } catch (err) {
      console.error(err);
      setPreRegSubmitting(false);
      setPreRegError('Could not save your pre-registration. Please try again.');
    }
  };

  // JSON-LD for catalog
  const courseJsonLd = courseCatalog.flatMap(group => group.courses.map(course => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.summary,
    provider: {
      '@type': 'Organization',
      name: 'Access USA (AUSA)'
    },
    courseCode: group.slug
  })));
  return <>
      <SeoHelmet title="Credit Courses" description="Earn real U.S. university credit while still in school. Take live online courses taught by American professors and build a powerful academic record for global admissions." type="website" jsonLd={courseJsonLd} />

      <div className="bg-white text-slate-gray">
        {/* Hero */}
        <section className="bg-midnight-navy py-16 md:py-20 lg:py-24 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
                Earn U.S. University Credit in High School
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto">
                Take live, transcripted courses from accredited American universities. Show admissions committees that you
                can already succeed in a real university classroom.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sticky CTA bar */}
        <section className="bg-white py-8 border-b border-slate-200 sticky top-[73px] z-20 backdrop-blur-sm bg-white/80">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="default" className="bg-electric-blue text-white hover:bg-electric-blue/90" onClick={handlePreRegClick}>
                Pre-Register for Courses
              </Button>
              <Button size="default" variant="secondary" className="bg-warm-gold hover:bg-warm-gold/90 text-midnight-navy" onClick={handleAdvisorClick}>
                Talk to an Advisor
              </Button>
              <Link to="/apply">
                <Button size="default" variant="outline" className="text-midnight-navy border-slate-300 hover:bg-slate-100">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The AUSA Advantage */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Why Take University Credit Courses with Access USA?
              </h2>
              <p className="text-lg text-slate-600">Our credit courses give you authentic experiences with U.S. university teaching, expectations, and assessment before you ever set foot on campus.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {deliveryFeatures.map((feature, index) => <motion.div key={feature.name} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              amount: 0.5
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo text-white rounded-full p-4">
                      <feature.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-2">{feature.name}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Credit transfer & advising */}
        <section className="bg-indigo text-white">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Credit Transfer & Advising</h2>
                <p className="text-indigo-200 mb-6 leading-relaxed">
                  Credits earned through Access USA appear on an official U.S. university transcript. Many universities
                  will consider these credits for transfer or advanced standing, especially when they align with their
                  own curriculum. Because each institution has its own rules, our advisors help you research and plan
                  how to present your academic record effectively.
                </p>
                <Button size="lg" className="bg-warm-gold text-midnight-navy hover:bg-warm-gold/90" onClick={handleAdvisorClick}>
                  <Phone className="w-5 h-5 mr-3" /> Talk to an Advisor
                </Button>
              </div>
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="font-bold text-lg mb-4">Key Considerations</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-warm-gold mr-3 mt-1 shrink-0" />
                    <span>Each university sets its own policy on accepting outside credits.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-warm-gold mr-3 mt-1 shrink-0" />
                    <span>
                      Credits are often used toward electives, prerequisites, or placement into higher-level courses.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-warm-gold mr-3 mt-1 shrink-0" />
                    <span>Strong performance in these courses strengthens your academic profile, even when credits do not transfer directly.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">Tangible Outcomes for Your Future</h2>
              <p className="text-lg text-slate-600">
                Completing a credit course is more than just “extra work.” It produces concrete, verifiable results that
                admissions officers can see and evaluate.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {outcomes.map((outcome, index) => <motion.div key={outcome.name} initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-8 text-center">
                  <div className="flex justify-center mb-5">
                    <div className="bg-warm-gold text-white rounded-full p-4">
                      <outcome.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-3">{outcome.name}</h3>
                  <p className="text-slate-600 leading-relaxed">{outcome.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Catalog browse section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">Browse the Credit Course Catalog</h2>
              <p className="text-lg text-slate-600">
                Explore courses by category—STEM, humanities, social sciences, and business—and begin shaping a university
                path that fits your interests and goals.
              </p>
            </div>

            <div className="space-y-10">
              {courseCatalog.map((group, groupIndex) => <motion.div key={group.slug} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: groupIndex * 0.1
            }} className="bg-gray-50/80 border border-slate-200/70 rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-electric-blue text-white rounded-full p-3">
                        <group.icon className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-midnight-navy">{group.name}</h3>
                        <p className="text-slate-600 text-sm md:text-base mt-1">{group.blurb}</p>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 italic">
                      Many students complete 1–3 credit courses over their AUSA journey.
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {group.courses.map(course => <div key={course.name} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col h-full">
                        <h4 className="font-semibold text-midnight-navy mb-1">{course.name}</h4>
                        {course.level && <p className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full inline-block px-2 py-0.5 mb-2">
                            {course.level}
                          </p>}
                        <p className="text-sm text-slate-600 flex-1">{course.summary}</p>
                      </div>)}
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 lg:py-24 bg-electric-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Ready to Earn Credit?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
              Pre-register for courses, connect with an advisor, or start your application to secure your place in the next
              cohort.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-electric-blue hover:bg-gray-100" onClick={handlePreRegClick}>
                Pre-Register for Courses
              </Button>
              <Button size="lg" variant="secondary" className="bg-warm-gold hover:bg-warm-gold/90 text-midnight-navy" onClick={handleAdvisorClick}>
                Talk to an Advisor
              </Button>
              <Link to="/apply">
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10">
                  Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Advisor Zoom scheduler modal */}
        {showAdvisorModal && <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 py-6 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full relative max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-midnight-navy">
                  Schedule a Meeting with the AUSA Team
                </h3>
                <button type="button" onClick={() => setShowAdvisorModal(false)} className="p-1 rounded-full hover:bg-slate-100" aria-label="Close">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-4 flex-1">
                <div className="w-full h-full overflow-hidden rounded-xl border border-slate-200">
                  <iframe src="https://scheduler.zoom.us/ausa-team/ausa-meeting-with-samir?embed=true" title="Schedule a meeting with the AUSA Team" frameBorder="0" style={{
                width: '100%',
                height: '560px'
              }} allow="microphone; camera; fullscreen" />
                </div>
              </div>
            </div>
          </div>}

        {/* Pre-registration modal */}
        {showPreregModal && <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 py-6 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full relative max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-midnight-navy">Pre-Register for Credit Courses</h3>
                <button type="button" onClick={() => setShowPreregModal(false)} className="p-1 rounded-full hover:bg-slate-100" aria-label="Close">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handlePreRegSubmit} className="p-4 space-y-4 overflow-y-auto">
                <p className="text-sm text-slate-600 mb-2">
                  Use this form to indicate your interest in upcoming courses. This is{' '}
                  <span className="font-semibold">not</span> a firm commitment, but it ensures we notify you when courses
                  that match your interests are next offered.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentFirstName" className="block text-sm font-medium text-slate-700">
                      Student First Name
                    </label>
                    <input id="studentFirstName" type="text" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.studentFirstName} onChange={handlePreRegChange} required />
                  </div>
                  <div>
                    <label htmlFor="studentLastName" className="block text-sm font-medium text-slate-700">
                      Student Last Name
                    </label>
                    <input id="studentLastName" type="text" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.studentLastName} onChange={handlePreRegChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentEmail" className="block text-sm font-medium text-slate-700">
                      Student Email
                    </label>
                    <input id="studentEmail" type="email" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.studentEmail} onChange={handlePreRegChange} required />
                  </div>
                  <div>
                    <label htmlFor="studentPhone" className="block text-sm font-medium text-slate-700">
                      Student Phone (WhatsApp preferred)
                    </label>
                    <input id="studentPhone" type="tel" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.studentPhone} onChange={handlePreRegChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="schoolName" className="block text-sm font-medium text-slate-700">
                      School Name
                    </label>
                    <input id="schoolName" type="text" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.schoolName} onChange={handlePreRegChange} />
                  </div>
                  <div>
                    <label htmlFor="schoolCity" className="block text-sm font-medium text-slate-700">
                      School City
                    </label>
                    <input id="schoolCity" type="text" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.schoolCity} onChange={handlePreRegChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-slate-700">
                      Parent/Guardian Name
                    </label>
                    <input id="parentName" type="text" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.parentName} onChange={handlePreRegChange} required />
                  </div>
                  <div>
                    <label htmlFor="parentEmail" className="block text-sm font-medium text-slate-700">
                      Parent/Guardian Email
                    </label>
                    <input id="parentEmail" type="email" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.parentEmail} onChange={handlePreRegChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentPhone" className="block text-sm font-medium text-slate-700">
                      Parent/Guardian Phone
                    </label>
                    <input id="parentPhone" type="tel" className="mt-1 w-full border rounded-md px-3 py-2 text-sm" value={preRegForm.parentPhone} onChange={handlePreRegChange} />
                  </div>
                  <div>
                    <label htmlFor="preferredTerm" className="block text-sm font-medium text-slate-700">
                      Preferred Term to Take Courses
                    </label>
                    <select id="preferredTerm" className="mt-1 w-full border rounded-md px-3 py-2 text-sm bg-white" value={preRegForm.preferredTerm} onChange={handlePreRegChange}>
                      <option value="">Select…</option>
                      {PREFERRED_TERMS.map(term => <option key={term} value={term}>
                          {term}
                        </option>)}
                    </select>
                  </div>
                </div>

                {/* Course interest selection */}
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    Which courses are you most interested in?
                  </p>
                  <p className="text-xs text-slate-500 mb-3">
                    Select 1–4 courses that sound most interesting. This helps us notify you when those specific courses
                    open.
                  </p>
                  <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-md p-3">
                    {courseCatalog.map(group => <div key={group.slug} className="mb-3 last:mb-0">
                        <p className="text-xs font-semibold text-slate-700 mb-1">{group.name}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {group.courses.map(course => {
                      const id = `course-${group.slug}-${course.name}`;
                      const checked = preRegForm.interestedCourses.includes(course.name);
                      return <label key={course.name} htmlFor={id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                <input id={id} type="checkbox" className="h-3 w-3" checked={checked} onChange={() => handleCourseToggle(course.name)} />
                                <span className="truncate">{course.name}</span>
                              </label>;
                    })}
                        </div>
                      </div>)}
                  </div>
                </div>

                {preRegError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                    {preRegError}
                  </p>}

                <div className="mt-4 flex justify-end gap-3 pb-2">
                  <Button type="button" variant="outline" onClick={() => setShowPreregModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={preRegSubmitting}>
                    {preRegSubmitting ? 'Submitting…' : 'Submit Pre-Registration'}
                  </Button>
                </div>
              </form>
            </div>
          </div>}
      </div>
    </>;
};
export default CreditCourses;