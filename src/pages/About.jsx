import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';

const leadership = [
  {
    name: 'Sheila Bauer',
    title: 'CEO & Co-Founder',
    bio: 'A serial education entrepreneur, Sheila serves on the boards of the International Automotive Hall of Fame & Michigan Colleges Alliance. She is a graduate, Magna Cum Laude, of the Cornell Hotel School (SC Johnson College of Business).',
    imageDescription: 'Headshot of Sheila Bauer, CEO & Co-Founder of AUSA.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/bsghead.jpeg',
  },
  {
    name: 'Raymond Ravaglia',
    title: 'Chairman & Co-Founder',
    bio: 'Former Stanford University Dean and founder of innovative programs like Stanford Online High School, Dwight Global Online School, The School of The New York Times, and the Education Program for Gifted Youth.',
    imageDescription: 'Headshot of Raymond Ravaglia, Chairman & Co-Founder of AUSA.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/rrhead.jpeg',
  },
];

const teamMembers = [
  {
    name: 'Samir Khot',
    title: 'Director, India Operations',
    bio: 'Known for his dynamic and passionate approach, Samir has consistently inspired students to push their limits and reach their full potential.',
    imageDescription: 'Headshot of Samir Khot.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/samir2.png',
  },
  {
    name: 'Tejal Shah',
    title: 'Registrar and Bursar',
    bio: 'A passionate, knowledgeable educator with advanced degrees from Shivaji University and JDBIMS, SNDT University, and over two decades of experience in pivotal school roles.',
    imageDescription: 'Headshot of Tejal Shah.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/tejal2.png',
  },
  {
    name: 'Jacob Keeley',
    title: 'Lead Instructor and Director MUN',
    bio: 'Many-time world MUN champion and professor specializing in public presentation, global leadership, and analytical writing.',
    imageDescription: 'Headshot of Jacob Keeley.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/jacob2.png',
  },
  {
    name: 'Hiera Fathman',
    title: 'Instructor',
    bio: 'Celebrated professor specializing in leadership, public speaking, acting, and legal studies.',
    imageDescription: 'Headshot of Hiera Fathman.',
    image:
      'https://amshrzyuoxgmwdekjgts.supabase.co/storage/v1/object/public/ausaweb/hf.png',
  },
];

const About = () => {
  const { toast } = useToast();

  const socialLinks = [
    { icon: Facebook, name: 'Facebook' },
    { icon: Instagram, name: 'Instagram' },
    { icon: Linkedin, name: 'LinkedIn' },
    { icon: Twitter, name: 'Twitter' },
  ];

  return (
    <>
      <SeoHelmet
        title="About Access USA – Mission, Principles & Leadership"
        description="Access USA prepares purpose-driven students for global academic success by connecting them with world-class faculty, rigorous programs, and real university experiences."
      />

      <div className="bg-white text-slate-gray">
        {/* MISSION */}
        <section className="bg-gradient-to-br from-electric-blue/5 via-white to-warm-gold/5 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-midnight-navy">
                Our Mission
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-4">
                Access USA prepares purpose-driven students for global academic success by
                connecting them with world-class faculty, rigorous programs, and real university
                experiences.
              </p>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We believe that students thrive when they have structure, opportunity, and a
                clear sense of purpose.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-10 text-center">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                What We Do
              </h2>
              <p className="text-lg text-slate-600">
                Access USA builds practical pathways between motivated students, schools, and
                universities.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-700">
                  • Deliver high-quality workshops across India.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-700">
                  • Offer synchronous credit courses from U.S. universities.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-700">
                  • Run summer programs on American campuses.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-5">
                <p className="text-slate-700">
                  • Support schools and universities through academic partnerships.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-5 md:col-span-2">
                <p className="text-slate-700">
                  • Help students build skills that set them apart globally—through real work,
                  not shortcuts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Our Principles
              </h2>
              <p className="text-lg text-slate-600">
                These principles shape every course, workshop, and advisory conversation we
                offer.
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft">
                <p className="text-sm font-semibold text-warm-gold mb-1">1. Merit First</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Performance over promises
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Every pathway is performance-based. Students advance through achievement,
                  effort, and readiness—not guarantees or inflated claims.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft">
                <p className="text-sm font-semibold text-warm-gold mb-1">2. Academic Honesty</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  No exaggerated outcomes
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We do not inflate results or exaggerate outcomes. We focus on real courses,
                  real grades, and real faculty feedback.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft">
                <p className="text-sm font-semibold text-warm-gold mb-1">3. Purpose Matters</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Mission-driven students
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Students who can articulate their mission—whatever it may be—become the
                  strongest applicants and leaders. We help them connect their work to a larger
                  sense of purpose.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-soft">
                <p className="text-sm font-semibold text-warm-gold mb-1">4. Global Readiness</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Skills that last a lifetime
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our programs build lifelong skills—critical thinking, communication,
                  collaboration—not just application checklists or one-time credentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Our Leadership
              </h2>
              <p className="text-lg text-slate-600">
                Our founding team brings decades of experience in building rigorous, innovative
                programs at leading universities and schools around the world.
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              {leadership.map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <img
                      loading="lazy"
                      className="rounded-full w-full h-full object-cover shadow-2xl"
                      alt={leader.imageDescription}
                      src={leader.image}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-midnight-navy">{leader.name}</h3>
                  <p className="text-electric-blue font-semibold mb-3">{leader.title}</p>
                  <p className="text-slate-600 leading-relaxed">{leader.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Our Team
              </h2>
              <p className="text-lg text-slate-600">
                Behind every course, workshop, and advising call is a team of educators and
                program leaders committed to meaningful academic growth.
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img
                      loading="lazy"
                      className="rounded-full w-full h-full object-cover shadow-lg"
                      alt={member.imageDescription}
                      src={member.image}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy">{member.name}</h3>
                  <p className="text-electric-blue text-sm font-semibold mb-2">
                    {member.title}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-r from-midnight-navy to-indigo rounded-2xl p-12 text-white max-w-4xl mx-auto shadow-2xl shadow-indigo/20"
            >
              <h2 className="font-serif text-4xl font-bold mb-4">
                Join a Community Focused on Real Academic Growth
              </h2>
              <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
                Whether you are a student, parent, school leader, or university partner, we
                would love to explore how Access USA can support your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-warm-gold text-midnight-navy hover:bg-warm-gold/90 w-full sm:w-auto"
                >
                  <Link to="/contact">
                    Contact Form <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <a
                  href="mailto:info@ausa.io"
                  className="text-lg font-semibold flex items-center gap-2 hover:text-warm-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md focus-visible:ring-offset-midnight-navy"
                >
                  <Mail className="w-5 h-5" /> info@ausa.io
                </a>
              </div>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ scale: 1.2, y: -2 }}
                    href="#"
                    aria-label={`Access USA on ${social.name}`}
                    className="text-indigo-200 hover:text-warm-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md focus-visible:ring-offset-midnight-navy"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: `🚧 ${social.name} link coming soon!`,
                        description:
                          "This channel isn't live yet, but we’re building it. For now, email or the contact form are the best ways to reach us.",
                      });
                    }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;