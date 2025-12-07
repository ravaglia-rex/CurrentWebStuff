import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookMarked, Mic, FolderKanban, Compass, Check, ArrowRight, Users, Search, Shield, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeoHelmet from '@/components/SeoHelmet';
const components = [{
  icon: BookMarked,
  title: 'Academic Core',
  description: 'A curated sequence of workshops and credit courses in STEM, Commerce, Humanities, or Pre-Med—aligned with your evolving interests and performance.'
}, {
  icon: Mic,
  title: 'Communication & Leadership',
  description: 'Structured development of speaking, writing, and leadership through public speaking, debate, group projects, and seminar-style discussion.'
}, {
  icon: FolderKanban,
  title: 'Portfolio & Profile',
  description: 'A coherent academic and personal narrative built from graded work, capstone projects, and evidence of real-world impact.'
}, {
  icon: Compass,
  title: 'Personalized Advising',
  description: 'Regular check-ins focused on purpose, course selection, exams, recommenders, and long-term planning—not just a one-time counseling session.'
}];
const signals = [{
  icon: Search,
  name: 'Curiosity',
  description: 'Curious students ask better questions, choose challenging courses, and make the most of faculty. Admissions teams see this as intellectual vitality.'
}, {
  icon: Shield,
  name: 'Resilience',
  description: 'Resilience shows you can handle setbacks, culture shock, and academic pressure without giving up when the work becomes demanding.'
}, {
  icon: Zap,
  name: 'Initiative',
  description: 'Initiative tells universities you do more than follow instructions—you launch projects, seek feedback, and use campus opportunities actively.'
}, {
  icon: Heart,
  name: 'Contribution',
  description: 'Contribution signals that you improve the communities you join, aligning with universities’ focus on campus culture, service, and peer impact.'
}];
const holisticFitItems = [{
  text: 'Curiosity & Intellectual Vitality'
}, {
  text: 'Resilience & Growth Mindset'
}, {
  text: 'Initiative & Leadership Potential'
}, {
  text: 'Community Contribution & Impact'
}];
const DiplomaProgram = () => {
  const [selectedTrack, setSelectedTrack] = useState('undergrad');
  const diplomaProgramJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'The AUSA Diploma Program',
    description: 'A performance-based pathway that combines workshops, university credit courses, leadership, and advising into a coherent record of purpose and achievement.',
    provider: {
      '@type': 'Organization',
      name: 'Access USA (AUSA)'
    }
  };
  const handleTrackSelect = track => {
    setSelectedTrack(track);
    const targetId = track === 'undergrad' ? 'undergraduate-components' : 'pathways-masters';
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <>
      <SeoHelmet title="Diploma Program" description="The AUSA Diploma Program is a structured, performance-based pathway that stacks workshops, credit courses, leadership, and advising into a coherent academic record for university admissions." jsonLd={diplomaProgramJsonLd} />

      <div className="bg-white text-slate-gray">
        <section className="bg-gradient-to-br from-indigo to-midnight-navy py-16 md:py-20 lg:py-24 text-white">
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
              <p className="font-semibold text-indigo-300 mb-2">
                STRUCTURED, PERFORMANCE-BASED PATHWAY
              </p>
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
                The AUSA Diploma Program
              </h1>
              <p className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto mb-6">
                A multi-year pathway for purpose-driven students to build a real record
                of achievement—through workshops, credit courses, leadership, and
                advising—that top universities can see and trust.
              </p>

              {/* Track selector */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Button size="sm" variant={selectedTrack === 'undergrad' ? 'default' : 'outline'} className="rounded-full" onClick={() => handleTrackSelect('undergrad')}>
                  Undergraduate Admission
                </Button>
                <Button size="sm" variant={selectedTrack === 'postgrad' ? 'default' : 'outline'} className="rounded-full" onClick={() => handleTrackSelect('postgrad')}>
                  Postgraduate Admission
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Undergraduate-focused content */}
        <section id="undergraduate-components" className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Program Components (Undergraduate Focus)
              </h2>
              <p className="text-lg text-slate-600">
                For students in grades 8–12 who want to move from potential to proof. The
                Diploma Program weaves together four pillars to create a clear,
                performance-based story for admissions.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mb-12">
  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-6 md:p-8">
    <div className="flex flex-col md:flex-row gap-6 md:gap-10">
      {/* Left column: explainer */}
      <div className="md:w-1/3">
        <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase mb-2">
          How the diploma tiers work
        </p>
        <h3 className="text-lg font-semibold text-midnight-navy mb-2">
          A pathway, not a label
        </h3>
        <p className="text-sm text-slate-600">
          Students may enter at different points and progress at different speeds.
          In practice, our diploma tiers often look like this:
        </p>
      </div>

      {/* Right column: tier cards */}
      <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-gray-50/70 p-4">
          <p className="text-sm font-semibold text-midnight-navy mb-1">
            Targeted
          </p>
          <p className="text-xs text-slate-600">
            Early engagement through workshops and foundational skills.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-gray-50/70 p-4">
          <p className="text-sm font-semibold text-midnight-navy mb-1">
            Platinum
          </p>
          <p className="text-xs text-slate-600">
            Workshops plus one or more university credit courses and growing leadership.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-gray-50/70 p-4">
          <p className="text-sm font-semibold text-midnight-navy mb-1">
            Diamond
          </p>
          <p className="text-xs text-slate-600">
            Multiple credits, summer programs, and substantial portfolio work.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-gray-50/70 p-4">
          <p className="text-sm font-semibold text-midnight-navy mb-1">
            Ivy (invitation only)
          </p>
          <p className="text-xs text-slate-600">
            Students who demonstrate clear purpose, consistent excellence, and the
            ability to articulate a mission bigger than admission itself.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {components.map((component, index) => <motion.div key={component.title} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} className="bg-gray-50/70 rounded-2xl p-8 text-center border border-slate-200/60">
                  <div className="flex justify-center mb-5">
                    <div className="bg-electric-blue text-white rounded-full p-4">
                      <component.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-3">
                    {component.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {component.description}
                  </p>
                </motion.div>)}
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mt-16 bg-indigo/5 border-2 border-indigo/10 rounded-2xl p-8">
              <h3 className="text-center text-2xl font-bold text-midnight-navy mb-6">Signals We Cultivate and Why They Matter</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {signals.map(signal => <div key={signal.name} className="flex flex-col items-center text-center">
                    <div className="bg-white border border-slate-200 rounded-full p-3 mb-3">
                      <signal.icon className="w-6 h-6 text-indigo" />
                    </div>
                    <p className="font-semibold text-slate-800 mb-2">
                      {signal.name}
                    </p>
                    <p className="text-sm text-slate-600 leading-snug">
                      {signal.description}
                    </p>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-warm-gold/10 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.7
            }}>
                <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                  Demonstrate Your Holistic Fit
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Selective universities look far beyond grades and test scores. The
                  Diploma Program helps you show, with evidence, the personal qualities
                  that indicate you will thrive on campus and contribute meaningfully to
                  your community.
                </p>
                <ul className="space-y-4">
                  {holisticFitItems.map((item, index) => <li key={index} className="flex items-center text-lg">
                      <Check className="w-6 h-6 text-electric-blue mr-3 shrink-0" />
                      <span className="font-semibold text-slate-700">
                        {item.text}
                      </span>
                    </li>)}
                </ul>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.7
            }} className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-2 bg-gradient-to-br from-electric-blue to-indigo rounded-2xl opacity-20 blur-xl"></div>
                  <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-warm-gold text-white p-3 rounded-full mr-4">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xl text-midnight-navy">
                        Admissions Officer View
                      </h3>
                    </div>
                    <p className="text-slate-600 italic">
                      &quot;This student shows clear initiative and a sustained sense of
                      purpose. The AUSA Diploma connects their courses, projects, and
                      leadership into a coherent story—not just a list of activities.&quot;
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pathways to Masters (Postgraduate focus) */}
        <section id="pathways-masters" className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-midnight-navy">
                Pathways to Masters
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Many Indian students complete strong bachelor&apos;s degrees, yet arrive at
                international masters programs at a disadvantage—not because they lack
                ability, but because typical undergraduate programs rarely teach the
                seminar, research, and communication skills that U.S. universities assume.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="bg-gray-50 rounded-2xl border border-slate-200 p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-midnight-navy mb-3">
                  Why the Gap Exists
                </h3>
                <p className="text-slate-600 mb-4">
                  Most bachelor&apos;s programs emphasize content coverage, examinations,
                  and technical depth. What they rarely provide is continuous practice in
                  seminar discussion, open-ended projects, research writing, and
                  professional communication—the daily language of U.S. graduate programs.
                </p>
                <p className="text-slate-600">
                  As a result, even high-performing graduates can feel they are catching
                  up on classroom norms, group work, and independent study expectations—
                  precisely when they should be focused on making the most of their
                  masters degree.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="bg-gray-50 rounded-2xl border border-slate-200 p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-midnight-navy mb-3">
                  How Pathways to Masters Helps
                </h3>
                <p className="text-slate-600 mb-4">
                  Pathways to Masters rounds out a typical undergraduate education by
                  closing the skills gap with top U.S. universities. Through short,
                  intensive modules and, where appropriate, credit-bearing courses,
                  students build the abilities that matter most:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4 text-sm md:text-base">
                  <li>Seminar-style discussion, debate, and presentation.</li>
                  <li>Graduate-level academic writing, research design, and citation.</li>
                  <li>Team-based projects and cross-cultural collaboration.</li>
                  <li>Independent learning strategies for heavy reading and fast-paced coursework.</li>
                </ul>
                <p className="text-slate-600">
                  The goal is a level playing field: you arrive with the confidence and
                  classroom experience of a U.S. undergraduate—and a clear advantage over
                  many other international students encountering these expectations for
                  the first time.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24 bg-midnight-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Start Building Your Future
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
              Whether you are aiming for undergraduate or postgraduate admission, the
              AUSA Diploma Program is designed for students with purpose and ambition who
              are ready to turn effort into evidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/apply">
                <Button size="lg" variant="default" className="bg-electric-blue hover:bg-electric-blue/90">
                  Apply to the Program <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default DiplomaProgram;