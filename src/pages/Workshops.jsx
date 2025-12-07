import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BrainCircuit,
  Mic,
  ChevronsRight,
  Users,
  PenTool,
  Shield,
  Globe,
  Award,
  Target,
  Briefcase,
  TrendingUp,
  Megaphone,
  LineChart,
  Code,
  Brain,
  BarChart2,
  ShieldCheck,
  Lock,
  Gamepad2,
  Puzzle,
  Theater,
  Film,
  BrainCog,
  Dna,
  Lightbulb,
  Calendar,
  Clock,
  IndianRupee,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/customSupabaseClient';

const workshopsData = [
  {
    subject: 'Leadership, Communication & College Readiness',
    title: 'Global Leadership & Public Presentation',
    grades: '6–12',
    learn: ['Teamwork & persuasive speaking', 'Cultural sensitivity', 'Self-management', 'Lead a small project'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: 'Recorded short talk, project brief, and reflection.',
    creditPath: 'Leadership (3cr); Public Speaking & Presentation (3cr)',
    delivery: '30–100+, in-person/virtual',
    prereqs: 'None',
    icon: Users,
  },
  {
    subject: 'Leadership, Communication & College Readiness',
    title: 'College Prep: Profile Building & Application Writing',
    grades: '9–11',
    learn: ['Profile strategy', 'Essay architecture', 'Recommendation planning', 'Timelines'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Activity plan, 1 personal-statement draft, and 1 supplemental essay draft.',
    creditPath: 'Research Writing & Publication (3cr); Digital Storytelling (3cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Target,
  },
  {
    subject: 'Leadership, Communication & College Readiness',
    title: 'Advanced English Comprehension',
    grades: '6–12, flexible',
    learn: ['Academic reading/listening', 'Structured speaking', 'Grammar-in-use', 'Short academic writing'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Reading log, 1 short talk, and 1 revised paragraph/essay.',
    creditPath: 'Pathway: Conversation groups (non-credit); Academic Writing (non-credit)',
    delivery: '15–50, virtual/in-person',
    prereqs: 'None',
    icon: Mic,
  },
  {
    subject: 'Leadership, Communication & College Readiness',
    title: 'Resilience (RISE)',
    grades: '6–12',
    learn: ['Stress management', 'Cognitive self-regulation', 'Habit formation', 'Peer support'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Personal resilience plan and habit tracker.',
    creditPath: 'Pathway: RISE certificate (Peer Resilience Counselor option)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: BrainCircuit,
  },
  {
    subject: 'Leadership, Communication & College Readiness',
    title: 'Research Writing & Publication',
    grades: '9–12',
    learn: ['Research questions', 'Synthesis', 'Argument & citation', 'Revision', 'Publication pathways'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: '800–1,000-word paper and annotated bibliography.',
    creditPath: 'Research Writing & Publication (3cr)',
    delivery: '15–50, in-person/virtual',
    prereqs: 'None',
    icon: PenTool,
  },
  {
    subject: 'Social Sciences, Law & Global Affairs',
    title: 'Model United Nations (MUN)',
    grades: '6–12',
    learn: ['Diplomacy', 'Policy analysis', 'Negotiation', 'Resolution writing', 'Leadership'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: '1 position paper, 1 resolution, and recorded committee speech.',
    creditPath: 'International Relations & MUN (3cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Globe,
  },
  {
    subject: 'Social Sciences, Law & Global Affairs',
    title: 'American Constitutional Values',
    grades: '9–12',
    learn: ['Founding ideas', 'Landmark cases', 'Rights/federalism', 'Legal reasoning'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Case brief, op-ed or structured debate.',
    creditPath: 'American Constitutional Values (3cr)',
    delivery: '15–50, virtual/in-person',
    prereqs: 'None',
    icon: Shield,
  },
  {
    subject: 'Social Sciences, Law & Global Affairs',
    title: 'International Law & Global Institutions',
    grades: '9–12',
    learn: ['Global governance', 'Treaties/compliance', 'Policy memos', 'Case studies'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Short policy paper.',
    creditPath:
      'International Relations & MUN (3cr); Political Science: IR & Global Order (3cr)',
    delivery: '15–50, in-person/virtual',
    prereqs: 'None',
    icon: Award,
  },
  {
    subject: 'Business & Commerce',
    title: 'Business Fundamentals',
    grades: '9–12',
    learn: ['Operations & growth', 'Basic analytics', 'Team communication', 'Ethics'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: 'Mini business model and simple metrics check.',
    creditPath: 'Intro to Business & Management (3cr)',
    delivery: '30–100, virtual/in-person',
    prereqs: 'None',
    icon: Briefcase,
  },
  {
    subject: 'Business & Commerce',
    title: 'Introduction to Finance',
    grades: '9–12',
    learn: ['Personal finance', 'Markets', 'Risk/return', 'Diversification', 'News literacy'],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Portfolio journal and risk/return reflection.',
    creditPath: 'Intro to Finance (3cr)',
    delivery: '30–100, virtual/in-person',
    prereqs: 'None',
    icon: TrendingUp,
  },
  {
    subject: 'Business & Commerce',
    title: 'Introduction to Marketing',
    grades: '9–12',
    learn: ['Segmentation & positioning', 'Consumer insights', 'Channel planning', 'Messaging'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: 'Go-to-market plan and 5-minute pitch.',
    creditPath: 'Intro to Marketing (4cr)',
    delivery: '30–100, virtual/in-person',
    prereqs: 'None',
    icon: Megaphone,
  },
  {
    subject: 'Business & Commerce',
    title: 'Business Analytics with Python',
    grades: '9–12',
    learn: ['KPIs, cohorts, funnels', 'Forecasting literacy', 'Dashboards', 'Ethics/privacy/bias'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Annotated notebook + 1-page exec brief; mini dashboard OR concise metric review.',
    creditPath: 'Business Analytics with Python (4cr)',
    delivery: '15–50, virtual/in-person',
    prereqs: 'Basic Python',
    icon: LineChart,
  },
  {
    subject: 'STEM, Data & Cyber',
    title: 'Intro to Data Science / Python',
    grades: '9–12',
    learn: ['Wrangling & viz', 'Intro modeling', 'Notebook hygiene', 'Communicating insights'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Annotated notebook; 6–8-slide insights deck.',
    creditPath: 'Intro to Data Science with Python (4cr)',
    delivery: '15–50, virtual',
    prereqs: 'Basic Python',
    icon: Code,
  },
  {
    subject: 'STEM, Data & Cyber',
    title: 'Applied GenAI (Responsible AI in Practice)',
    grades: '9–12',
    learn: [
      'LLM capabilities/limits',
      'Effective prompting',
      'Citation integrity',
      'Bias/safety',
      'Light RAG',
      'Personal AI policy',
    ],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Promptbook; mini project plan; Responsible AI pledge.',
    creditPath:
      'Intro to Programming: Python & AI (4cr); Intro to DS with Python (4cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Brain,
  },
  {
    subject: 'STEM, Data & Cyber',
    title: 'Data Visualization for Decisions: Python',
    grades: '9–12',
    learn: ['Cleaning', 'EDA vs explanatory viz', 'Chart choice & annotation', 'Storytelling for execs'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Notebook with clear plots; 6–8-slide insights deck.',
    creditPath: 'Intro to DS with Python (4cr)',
    delivery: '15–50, virtual',
    prereqs: 'Basic Python',
    icon: BarChart2,
  },
  {
    subject: 'STEM, Data & Cyber',
    title: 'Cybersecurity',
    grades: '9–12',
    learn: ['Security principles', 'Threat modeling', 'Safe labs', 'Blue-team planning/comms'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Blue-team plan for a realistic scenario.',
    creditPath: 'Cybersecurity I (3cr) → Cybersecurity II (3cr)',
    delivery: '15–50, virtual',
    prereqs: 'None',
    icon: ShieldCheck,
  },
  {
    subject: 'STEM, Data & Cyber',
    title: 'Cyber Hygiene for Teens & Families',
    grades: '6–12',
    learn: ['Password managers, 2FA, updates', 'Phishing red flags', 'Privacy', 'Home-network/mobile hygiene'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: 'Personal security checklist; family/home security plan.',
    creditPath: 'Cybersecurity I (3cr) → Cybersecurity II (3cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Lock,
  },
  {
    subject: 'Creative Technology & Game Design',
    title: 'Game Design with Unity',
    grades: '8–12',
    learn: ['Game loop', 'Scenes/components/UI', 'Rapid prototyping', 'Playtesting', 'Critique'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Playable prototype; 1-page design brief.',
    creditPath: 'Digital Storytelling (3cr); Film Making (3cr)',
    delivery: '15–50, in-person preferred (virtual possible)',
    prereqs: 'None',
    icon: Gamepad2,
  },
  {
    subject: 'Creative Technology & Game Design',
    title: 'Game Design with Godot',
    grades: '8–12',
    learn: ['Nodes/scenes', 'GDScript', 'Physics/tilemaps', 'Level design', 'Open-source workflows'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Playable 2D prototype; short trailer/pitch.',
    creditPath:
      'Digital Storytelling (3cr); Intro to Programming: Python & AI (4cr)',
    delivery: '15–50, virtual/in-person',
    prereqs: 'None',
    icon: Puzzle,
  },
  {
    subject: 'Arts & Media',
    title: 'Acting Methodology',
    grades: '9–12',
    learn: ['Meisner foundations', 'Voice/body/improv', 'Scene study', 'Stage presence'],
    formats: ['Masterclass', 'Sprint', 'Intensive'],
    artifact: 'Prepared scene; reflection.',
    creditPath: 'Film Making (3cr); Digital Storytelling (3cr)',
    delivery: '15–50, in-person',
    prereqs: 'None',
    icon: Theater,
  },
  {
    subject: 'Arts & Media',
    title: 'Filmmaking & Visual Storytelling',
    grades: '9–12',
    learn: ['Shot design', 'Sound', 'Editing & structure', 'Concept dev', 'Teamwork'],
    formats: ['Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: '60–120s short film; 1-page pitch deck.',
    creditPath: 'Film Making (3cr)',
    delivery: '15–50, in-person/virtual',
    prereqs: 'None',
    icon: Film,
  },
  {
    subject: 'Pre-Medicine & Psychology',
    title: 'Introduction to Psychology',
    grades: '9–12',
    learn: [
      'Cognition & emotion',
      'Classic experiments & ethics',
      'Basic study design',
      'Responsible communication',
    ],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Mini study design; short report.',
    creditPath: 'Psychology (3cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: BrainCog,
  },
  {
    subject: 'Pre-Medicine & Psychology',
    title: 'Introduction to Neuroscience',
    grades: '9–12',
    learn: [
      'Brain systems',
      'Perception',
      'Decision-making',
      'Mind/brain views',
      'Basic assessment literacy',
    ],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Infographic about a neural system; reflection.',
    creditPath: 'Neuropsychology (3cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Dna,
  },
  {
    subject: 'Design & Innovation',
    title: 'Design Thinking / Product Design',
    grades: '9–12',
    learn: [
      'Empathize→Define→Ideate→Prototype→Test',
      'Roles',
      'Critique',
      'Documentation',
    ],
    formats: ['Masterclass', 'Sprint', 'Intensive', 'Biweekly (3×1.5h)'],
    artifact: 'Tested prototype; design brief.',
    creditPath: 'Interdisciplinary Design & Manufacturing (4cr)',
    delivery: '30–100, in-person/virtual',
    prereqs: 'None',
    icon: Lightbulb,
  },
];

const subjects = [
  'All',
  'Leadership, Communication & College Readiness',
  'Social Sciences, Law & Global Affairs',
  'Business & Commerce',
  'STEM, Data & Cyber',
  'Creative Technology & Game Design',
  'Arts & Media',
  'Pre-Medicine & Psychology',
  'Design & Innovation',
];

/** Workshop reservation form that writes to Supabase */
const WorkshopReservationForm = ({ onReservationSubmit }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    role: '',
    email: '',
    phone: '',
    schoolName: '',
    city: '',
    country: 'India',
    board: '',
    workshopsSelected: [],
    deliveryMode: '',
    formatPreference: '',
    preferredStartDate: '',
    preferredEndDate: '',
    expectedStudents: '',
    guaranteedStudents: '',
    gradesCovered: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const allWorkshopTitles = workshopsData.map(
    (w) => `${w.title} (${w.subject})`
  );

  const toggleWorkshopSelection = (title) => {
    setFormData((prev) => {
      const exists = prev.workshopsSelected.includes(title);
      return {
        ...prev,
        workshopsSelected: exists
          ? prev.workshopsSelected.filter((t) => t !== title)
          : [...prev.workshopsSelected, title],
      };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.contactName.trim())
      newErrors.contactName = 'Contact name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.schoolName.trim())
      newErrors.schoolName = 'School name is required.';
    if (!formData.workshopsSelected.length)
      newErrors.workshopsSelected = 'Please select at least one workshop.';
    if (!formData.deliveryMode)
      newErrors.deliveryMode = 'Please select a delivery mode.';
    if (!formData.formatPreference)
      newErrors.formatPreference = 'Please select a format preference.';
    if (!formData.expectedStudents.trim())
      newErrors.expectedStudents = 'Expected number of students is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setIsLoading(true);

    const payload = {
      contact_name: formData.contactName.trim(),
      role: formData.role.trim() || null,
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      school_name: formData.schoolName.trim(),
      board: formData.board.trim() || null,
      city: formData.city.trim() || null,
      country: formData.country.trim() || null,
      workshops_selected: formData.workshopsSelected,
      delivery_mode: formData.deliveryMode || null,
      format_preference: formData.formatPreference || null,
      preferred_start: formData.preferredStartDate.trim() || null,
      preferred_end: formData.preferredEndDate.trim() || null,
      expected_students: formData.expectedStudents
        ? parseInt(formData.expectedStudents, 10)
        : null,
      guaranteed_students: formData.guaranteedStudents
        ? parseInt(formData.guaranteedStudents, 10)
        : null,
      grades_covered: formData.gradesCovered.trim() || null,
      notes: formData.notes.trim() || null,
    };

    try {
      await onReservationSubmit(payload);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setSubmitError(
        'We could not submit your request. Please try again, or email info@ausa.io.'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-8 w-full max-w-4xl mx-auto"
    >
      <h3 className="text-2xl md:text-3xl font-bold text-midnight-navy mb-4">
        Workshop Reservation Request
      </h3>
      <p className="text-slate-gray text-sm mb-6">
        Use this form to request Access USA workshops for your school. This helps us
        understand your goals so we can recommend the right workshops, formats, dates,
        and faculty.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactName">Contact name</Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
            {errors.contactName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="role">Role / Title</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Principal, Counselor, Coordinator, etc."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone / WhatsApp</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 ..."
            />
          </div>
        </div>

        {/* School Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="schoolName">School name</Label>
            <Input
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
            />
            {errors.schoolName && (
              <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="board">Board / Curriculum</Label>
            <Input
              id="board"
              name="board"
              value={formData.board}
              onChange={handleChange}
              placeholder="CBSE, ICSE, IB, Cambridge, State, etc."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Workshops of interest */}
        <div>
          <Label>Workshops of interest</Label>
          <p className="text-xs text-slate-500 mb-2">
            Select one or more workshops you are considering. You may refine your
            choices during the consultation call.
          </p>
          <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-md p-3">
            {allWorkshopTitles.map((title) => {
              const id = `ws-${title}`;
              const checked = formData.workshopsSelected.includes(title);
              return (
                <label
                  key={title}
                  htmlFor={id}
                  className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer mb-1"
                >
                  <input
                    id={id}
                    type="checkbox"
                    className="h-4 w-4"
                    checked={checked}
                    onChange={() => toggleWorkshopSelection(title)}
                  />
                  <span>{title}</span>
                </label>
              );
            })}
          </div>
          {errors.workshopsSelected && (
            <p className="text-red-500 text-sm mt-1">{errors.workshopsSelected}</p>
          )}
        </div>

        {/* Delivery & Format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Preferred Delivery Mode</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {['In-person', 'Online', 'Hybrid', 'Either'].map((mode) => (
                <Button
                  key={mode}
                  type="button"
                  size="sm"
                  variant={formData.deliveryMode === mode ? 'secondary' : 'outline'}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, deliveryMode: mode }))
                  }
                >
                  {mode}
                </Button>
              ))}
            </div>
            {errors.deliveryMode && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryMode}</p>
            )}
          </div>
          <div>
            <Label>Preferred Format</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'Masterclass (1 day)',
                'Sprint (3 days)',
                'Intensive (5 days)',
                'Biweekly (online)',
                'Not sure',
              ].map((format) => (
                <Button
                  key={format}
                  type="button"
                  size="sm"
                  variant={
                    formData.formatPreference === format ? 'secondary' : 'outline'
                  }
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      formatPreference: format,
                    }))
                  }
                >
                  {format}
                </Button>
              ))}
            </div>
            {errors.formatPreference && (
              <p className="text-red-500 text-sm mt-1">
                {errors.formatPreference}
              </p>
            )}
          </div>
        </div>

        {/* Dates & numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="preferredStartDate">Preferred start (month / week)</Label>
            <Input
              id="preferredStartDate"
              name="preferredStartDate"
              value={formData.preferredStartDate}
              onChange={handleChange}
              placeholder="e.g., June 2025, last week"
            />
          </div>
          <div>
            <Label htmlFor="preferredEndDate">Alternate window</Label>
            <Input
              id="preferredEndDate"
              name="preferredEndDate"
              value={formData.preferredEndDate}
              onChange={handleChange}
              placeholder="e.g., July 2025, first half"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expectedStudents">Expected number of students</Label>
            <Input
              id="expectedStudents"
              name="expectedStudents"
              value={formData.expectedStudents}
              onChange={handleNumberChange}
            />
            {errors.expectedStudents && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedStudents}</p>
            )}
          </div>
          <div>
            <Label htmlFor="guaranteedStudents">
              Guaranteed minimum number of students
            </Label>
            <Input
              id="guaranteedStudents"
              name="guaranteedStudents"
              value={formData.guaranteedStudents}
              onChange={handleNumberChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gradesCovered">Grades / cohorts to include</Label>
          <Input
            id="gradesCovered"
            name="gradesCovered"
            value={formData.gradesCovered}
            onChange={handleChange}
            placeholder="e.g., Grades 8–10, entire cohort"
          />
        </div>

        <div>
          <Label htmlFor="notes">Additional notes or questions</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Share any academic goals, timing constraints, preferred faculty backgrounds, or other details."
          />
        </div>

        {submitError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {submitError}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting request...
            </>
          ) : (
            'Submit Workshop Reservation'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

const Workshops = () => {
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleReservationSubmit = async (payload) => {
    const fullPayload = {
      ...payload,
      source_page: 'workshops',
      status: 'new',
    };

    const { error } = await supabase
      .from('workshop_reservations')
      .insert(fullPayload);

    if (error) {
      throw error;
    }

    // 🔔 Best-effort email notification via Edge Function (non-blocking)
    ;(async () => {
      try {
        await supabase.functions.invoke('notify-new-lead', {
          body: {
            kind: 'workshop_reservation',
            sourceTable: 'workshop_reservations',
            id: 'not-available-from-anon-client',
            main: {
              name: fullPayload.contact_name || null,
              email: fullPayload.email || null,
              school: fullPayload.school_name || null,
              country: fullPayload.country || null,
              sourcePage: fullPayload.source_page || window.location.pathname,
              status: fullPayload.status || null, // 'new'
              extraSummary: Array.isArray(fullPayload.workshops_selected)
                ? fullPayload.workshops_selected.join(', ')
                : null,
            },
          },
        });
      } catch (e) {
        // Optional: log, but don't disturb the user
        // console.warn('notify-new-lead (workshop_reservation) failed', e);
      }
    })();

    navigate('/success?type=workshop');
  };

  const filteredWorkshops = useMemo(() => {
    return workshopsData.filter((workshop) => {
      const subjectMatch =
        activeSubject === 'All' || workshop.subject === activeSubject;
      const searchMatch =
        searchTerm === '' ||
        workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.learn
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      return subjectMatch && searchMatch;
    });
  }, [activeSubject, searchTerm]);

  return (
    <>
      <Helmet>
        <title>Workshops - Access USA (AUSA)</title>
        <meta
          name="description"
          content="High-impact workshops for grades 6–12 that build leadership, communication, STEM, business, and global readiness skills. Flexible online and in-person formats for schools."
        />
      </Helmet>

      <div className="bg-white">
        <section className="bg-midnight-navy py-16 md:py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="font-serif text-5xl md:text-6xl font-bold mb-4"
            >
              AUSA Workshops
            </motion.h1>
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto"
            >
              Turn interest into achievement. Our workshops help students build essential
              skills, discover academic strengths, and prepare for university-level
              learning.
            </motion.p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-50/70 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <h2 className="text-3xl md:text-4xl text-center mb-10">
                Workshop Formats, Scheduling & Fees
              </h2>
              <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-soft border border-slate-200/80 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <Clock className="w-8 h-8 mx-auto mb-3 text-indigo" />
                    <h3 className="font-bold mb-1 text-midnight-navy">
                      Formats
                    </h3>
                    <p className="text-sm text-slate-gray">
                      Masterclass (1 day) <br /> Sprint (3 sessions) <br /> Intensive (5
                      sessions)
                    </p>
                  </div>
                  <div>
                    <Calendar className="w-8 h-8 mx-auto mb-3 text-indigo" />
                    <h3 className="font-bold mb-1 text-midnight-navy">
                      Booking Window
                    </h3>
                    <p className="text-sm text-slate-gray">
                      Workshops can be scheduled anytime
                      <br />
                      during the academic year.
                    </p>
                  </div>
                  <div>
                    <IndianRupee className="w-8 h-8 mx-auto mb-3 text-indigo" />
                    <h3 className="font-bold mb-1 text-midnight-navy">
                      Typical Fees
                    </h3>
                    <p className="text-sm text-slate-gray">
                      Fees vary by format, delivery mode, and cohort size.
                      <br />
                      Quotes provided upon request.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="sticky top-[73px] bg-white/80 backdrop-blur-lg z-30 py-4 border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <h2 className="text-2xl font-bold text-midnight-navy mb-4 md:hidden">
                  Explore the Workshop Catalog
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search workshops..."
                    className="pl-10 h-11"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-grow overflow-x-auto pb-2 md:pb-0">
                <div className="flex flex-nowrap gap-2 items-center justify-start md:justify-end w-full">
                  {subjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={activeSubject === subject ? 'secondary' : 'outline'}
                      onClick={() => setActiveSubject(subject)}
                      className="transition-all text-sm h-auto py-2 px-3 whitespace-nowrap"
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="hidden md:block text-center mb-16">
              <h2 className="text-3xl md:text-4xl">Explore Our Workshop Catalog</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkshops.length > 0 ? (
                filteredWorkshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.title}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    layout
                    className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-midnight-navy pr-4">
                        {workshop.title}
                      </h3>
                      <div className="bg-indigo text-white rounded-lg p-3 shrink-0">
                        <workshop.icon className="w-6 h-6" />
                      </div>
                    </div>

                    <p className="font-bold text-sm text-slate-500 mb-2">
                      Grades: {workshop.grades}
                    </p>

                    <div className="space-y-4 mb-6 flex-grow">
                      <p className="font-bold text-sm text-slate-600">
                        Key Learning Outcomes:
                      </p>
                      <ul className="space-y-2 list-inside">
                        {workshop.learn.slice(0, 5).map((item, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronsRight className="w-4 h-4 text-warm-gold mr-2 mt-1 shrink-0" />
                            <span className="text-slate-gray text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-sm space-y-3 pt-4 mt-auto border-t border-slate-200">
                      <p>
                        <strong className="text-slate-500">Formats:</strong>{' '}
                        {workshop.formats.join(', ')}
                      </p>
                      <p>
                        <strong className="text-slate-500">Student Output:</strong>{' '}
                        {workshop.artifact}
                      </p>
                      {workshop.creditPath
                        .toLowerCase()
                        .includes('non-credit') ||
                      workshop.creditPath.toLowerCase().includes('certificate') ? (
                        <p>
                          <strong className="text-slate-500">Pathway:</strong>{' '}
                          {workshop.creditPath.replace('Pathway: ', '')}
                        </p>
                      ) : (
                        <p>
                          <strong className="text-slate-500">Credit Pathway:</strong>{' '}
                          {workshop.creditPath.replace('Continues to credit: ', '')}
                        </p>
                      )}
                      <p>
                        <strong className="text-slate-500">Delivery:</strong>{' '}
                        {workshop.delivery}
                      </p>
                      {workshop.prereqs !== 'None' && (
                        <p>
                          <strong className="text-slate-500">Prerequisites:</strong>{' '}
                          {workshop.prereqs}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <h3 className="text-2xl font-bold text-midnight-navy mb-2">
                    No workshops found
                  </h3>
                  <p className="text-slate-gray">
                    Try adjusting your search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Workshop Reservation Form */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl md:text-5xl mb-4">
                Bring Access USA Workshops to Your School
              </h2>
              <p className="text-xl text-slate-gray max-w-3xl mx-auto">
                Submit a reservation request, and we will contact you to confirm workshop
                options, delivery mode, scheduling, and next steps.
              </p>
            </motion.div>

            <WorkshopReservationForm onReservationSubmit={handleReservationSubmit} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Workshops;