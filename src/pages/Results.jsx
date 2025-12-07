import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3, FolderGit2, Award, ArrowRight, UserCheck, Globe2, MapPin, X } from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';
const impactAreas = [{
  icon: BookOpen,
  title: 'Academic Achievement',
  description: 'Student performance in workshops, credit-bearing courses, summer programs, and written and oral presentations.'
}, {
  icon: BarChart3,
  title: 'Skill Development',
  description: 'Growth in critical thinking, communication, leadership, research, and collaboration—measured through real assignments and feedback.'
}, {
  icon: FolderGit2,
  title: 'University Opportunities',
  description: 'University credits, faculty recommendations, invitations to advanced programs, and significant academic achievements earned over time.'
}, {
  icon: Award,
  title: 'Global Readiness',
  description: 'Confidence in academic environments, ability to engage with international peers, and a clear understanding of university expectations.'
}];
const placementRegions = [{
  region: 'United States',
  icon: MapPin,
  blurb: 'AUSA experts have supported students receiving offers from many of the most selective private universities and flagship public institutions in the U.S. The Diamond and Platinum Diplomas are natural pathways to these institutions.',
  groups: [{
    label: 'Highly selective private universities',
    items: ['Massachusetts Institute of Technology', 'Harvard University', 'Stanford University', 'University of Chicago', 'University of Pennsylvania', 'Cornell University', 'Columbia University', 'Yale University', 'Princeton University', 'Duke University', 'Johns Hopkins University', 'Brown University', 'Dartmouth College', 'Carnegie Mellon University', 'Rice University', 'New York University']
  }, {
    label: 'Major public research universities',
    items: ['University of California, Berkeley', 'University of California, Los Angeles', 'University of California, San Diego', 'University of California, Davis', 'University of Michigan', 'Georgia Institute of Technology', 'University of Illinois Urbana–Champaign', 'University of Texas at Austin', 'University of Southern California', 'University of Washington', 'Pennsylvania State University', 'University of Wisconsin–Madison', 'Purdue University', 'Boston University']
  }, {
    label: 'Liberal arts & specialized institutions',
    items: ['Alma College', 'Hope College', 'University of Detroit Mercy', 'Hillsdale College', 'California Institute of the Arts', 'Harvey Mudd College', 'College for Creative Studies']
  }]
}, {
  region: 'United Kingdom',
  icon: MapPin,
  blurb: 'Students have also found success across the UK’s historic and modern research-intensive universities.',
  groups: [{
    label: 'Leading British universities',
    items: ['University of Cambridge', 'University of Oxford', 'Imperial College London', 'University College London', 'London School of Economics', 'King’s College London', 'University of Edinburgh', 'University of Manchester', 'University of Bristol', 'University of Warwick', 'University of Leeds', 'University of Glasgow', 'Durham University', 'University of Southampton', 'University of Birmingham', 'University of Nottingham', 'Heriot-Watt University']
  }]
}, {
  region: 'Canada & Australia',
  icon: MapPin,
  blurb: 'AUSA pathways also connect to high-quality options in Canada and Australia, where international students often thrive. These locations are also good starting points for students looking to ultimately transfer to U.S. universities.',
  groups: [{
    label: 'Canada',
    items: ['University of Toronto', 'McGill University', 'University of British Columbia', 'University of Alberta', 'University of Waterloo', 'Western University', 'McMaster University', 'University of Ottawa', 'University of Calgary', 'Queen’s University']
  }, {
    label: 'Australia',
    items: ['University of Melbourne', 'University of Sydney', 'University of New South Wales', 'Australian National University', 'Monash University', 'University of Adelaide', 'University of Technology Sydney', 'Macquarie University']
  }]
}, {
  region: 'Ireland, India & Other Destinations',
  icon: MapPin,
  blurb: 'For some students, the best fit is closer to home or in emerging global hubs with strong subject depth.',
  groups: [{
    label: 'Ireland',
    items: ['Trinity College Dublin', 'University College Dublin', 'University of Galway', 'University College Cork', 'University of Limerick', 'Dublin City University', 'Maynooth University']
  }, {
    label: 'India – new-age & liberal arts universities',
    items: ['Ashoka University', 'Shiv Nadar University', 'OP Jindal Global University', 'FLAME University', 'Krea University', 'Plaksha University', 'Ahmedabad University', 'Symbiosis International University']
  }, {
    label: 'Other international destinations',
    items: ['National University of Singapore', 'Nanyang Technological University', 'Delft University of Technology', 'University of Amsterdam', 'Technical University of Munich', 'University of Auckland', 'Selected universities in Switzerland & Dubai']
  }]
}];
const studentSpotlights = [{
  title: 'From Workshop to University Credits',
  description: 'A Grade 10 student began with an AUSA leadership workshop, then completed a university-level personal finance course with an A grade and used that transcript as part of a successful application to a highly selective U.S. university.'
}, {
  title: 'Research that Turned into Results',
  description: 'An AUSA summer participant in medical research methods co-authored a conference-style poster, earned a faculty recommendation, and later received offers from multiple research-intensive universities.'
}, {
  title: 'Building Confidence in Global Classrooms',
  description: 'A student who had never studied outside India completed two online credit courses and a summer program, gaining the confidence to contribute actively in seminars and thrive in a diverse campus environment.'
}];
const Results = () => {
  const [showAdvisorModal, setShowAdvisorModal] = useState(false);
  const handleAdvisorClick = () => {
    setShowAdvisorModal(true);
  };
  return <>
      <SeoHelmet title="Results & Outcomes" description="See how AUSA students turn performance, skills, and authentic academic work into global university outcomes." />

      <div className="bg-white text-slate-gray">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16 md:py-20 lg:py-24">
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
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                Measuring What Matters
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                Access USA does not rely on promises or inflated claims. We measure success
                through student performance, academic readiness, and authentic outcomes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Impact Areas – How We Evaluate Results */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-midnight-navy">
                How We Evaluate Results
              </h2>
              <p className="text-lg text-slate-600">
                Every student’s journey is different, but the way we measure progress is
                consistent: performance, skills, opportunities, and readiness for the next level.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactAreas.map((area, index) => <motion.div key={area.title} initial={{
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
                      <area.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-midnight-navy mb-3">{area.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{area.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Student Spotlights */}
        <section className="bg-gray-50/70 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-midnight-navy">
                Student Spotlights
              </h2>
              <p className="text-lg text-slate-600">
                Behind every placement list are real students, with real work, evaluated by real
                faculty. Here are examples of the kinds of outcomes AUSA students achieve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {studentSpotlights.map(spotlight => <motion.div key={spotlight.title} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.4
            }} className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-soft">
                  <h3 className="text-lg font-semibold text-midnight-navy mb-3">
                    {spotlight.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {spotlight.description}
                  </p>
                  <p className="text-xs text-slate-500 italic mt-4">
                    (Schools and families working with AUSA receive specific details: course
                    grades, summer achievements, faculty comments, and more.)
                  </p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Global placements summary band */}
        <section className="bg-midnight-navy py-16 md:py-20 text-white">
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
            duration: 0.5
          }} className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-warm-gold text-midnight-navy rounded-full p-4">
                  <Globe2 className="w-8 h-8" />
                </div>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                AUSA Students Have Gained Admission to Leading Universities Worldwide
              </h2>
              <p className="text-indigo-100 text-lg mb-4">
                While every student’s path is different, students working with AUSA advisors have
                secured offers from many of the world’s most respected universities in the United
                States, the United Kingdom, Canada, Australia, Ireland, India, and beyond.
              </p>
              <p className="text-indigo-200 text-sm">We do not claim to guarantee admission to all of these institutions. We help students build credible academic evidence, a clear personal narrative, and a realistic application strategy so they can compete for places at these institutions.</p>
            </motion.div>
          </div>
        </section>

        {/* Region-by-region placements */}
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                University Outcomes Around the World
              </h2>
              <p className="text-lg text-slate-600">
                Below are representative universities where students working with AUSA advisors
                have earned admission. These lists illustrate the range of possibilities when
                strong preparation meets informed guidance.
              </p>
            </div>

            <div className="space-y-10">
              {placementRegions.map((region, index) => <motion.div key={region.region} initial={{
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
            }} className="bg-white rounded-2xl border border-slate-200/70 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-electric-blue text-white rounded-full p-3">
                        <region.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-midnight-navy">
                          {region.region}
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base mt-1">
                          {region.blurb}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      Representative list based on student placements; not an exhaustive roster.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {region.groups.map(group => <div key={group.label} className="bg-gray-50 rounded-xl border border-slate-200 p-4">
                        <p className="text-sm font-semibold text-midnight-navy mb-2">
                          {group.label}
                        </p>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {group.items.map(u => <li key={u} className="leading-snug">
                              • {u}
                            </li>)}
                        </ul>
                      </div>)}
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* The Access USA Difference */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-midnight-navy">
                The Access USA Difference
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Our model is built on performance, transparency, and merit. We focus on what
                students actually do—their coursework, projects, and behavior in academic
                settings—not on shortcuts or inflated promises.
              </p>
              <p className="text-slate-600">
                Students succeed because they develop the skills and habits that global
                universities value most: consistent effort, intellectual curiosity, academic
                honesty, and the ability to contribute meaningfully in demanding classrooms.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 lg:py-24 bg-electric-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Your Results Begin With the Right Preparation
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
              Join Access USA programs and start building real achievements—measured through your
              performance, not marketing claims.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-electric-blue hover:bg-gray-100" onClick={handleAdvisorClick}>
                <UserCheck className="w-5 h-5 mr-3" />
                Talk to an Advisor
              </Button>
              <Link to="/apply">
                <Button size="lg" variant="secondary" className="bg-warm-gold hover:bg-warm-gold/90 text-midnight-navy">
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
      </div>
    </>;
};
export default Results;