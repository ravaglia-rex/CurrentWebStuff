import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import SeoHelmet from '@/components/SeoHelmet';
import { supabase } from '@/lib/customSupabaseClient';
import {
  Building,
  Award,
  Users,
  FileText,
  CheckCircle,
  BookOpenCheck,
  Loader2,
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const benefits = [
  {
    icon: Users,
    title: 'University-Level Instruction',
    description:
      'Your students learn directly from U.S. university faculty and experienced academic professionals.',
  },
  {
    icon: CheckCircle,
    title: 'Skill Development at the Right Age',
    description:
      'Workshops and short courses build leadership, communication, critical thinking, research, and innovation skills.',
  },
  {
    icon: FileText,
    title: 'Flexible Delivery',
    description:
      'In-person workshops, online weekly or intensive formats, and summer programs in the U.S. to fit your calendar.',
  },
  {
    icon: Award,
    title: 'Scalable for Any School Size',
    description:
      'Offer programs to entire grades, selected groups, gifted programs, high achievers, or leadership cohorts.',
  },
  {
    icon: Building,
    title: 'Proven Model Across India',
    description:
      'Trusted by leading schools across the country that use AUSA programs to strengthen their academic profile.',
  },
];

const deliveryModels = [
  {
    title: 'In-School Workshops',
    description:
      'High-impact, whole-grade or cohort-based workshops delivered on your campus, aligned to your timetable.',
  },
  {
    title: 'Online Short Courses',
    description:
      'Weekly or intensive 5-day online formats that bring university-style learning into your students’ schedules.',
  },
  {
    title: 'Summer Programs in the U.S.',
    description:
      'Faculty-led summer experiences on U.S. campuses that give students real exposure to university life.',
  },
];

const workshopOptions = [
  { id: 'public-speaking', label: 'Public Speaking' },
  { id: 'academic-writing', label: 'Academic Writing' },
  { id: 'digital-citizenship', label: 'Digital Citizenship' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'debate', label: 'Debate & Argumentation' },
  { id: 'college-apps', label: 'U.S. College Apps' },
];

const ForSchools = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    city: '',
    country: 'India',
    formatPreference: 'either',
    expectedStudents: '',
    guaranteedStudents: '',
    preferredMonth: '',
    selectedWorkshops: [],
    notes: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleWorkshopChange = (id) => {
    setForm((prev) => {
      const newSelection = prev.selectedWorkshops.includes(id)
        ? prev.selectedWorkshops.filter((workshopId) => workshopId !== id)
        : [...prev.selectedWorkshops, id];
      return { ...prev, selectedWorkshops: newSelection };
    });
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      contact_name: form.name.trim(),
      contact_email: form.email.trim(),
      contact_phone: form.phone?.trim() || null,
      school_name: form.schoolName.trim(),
      city: form.city?.trim() || null,
      country: form.country?.trim() || 'India',
      format_preference: form.formatPreference,
      expected_students: form.expectedStudents ? Number(form.expectedStudents) : null,
      guaranteed_students: form.guaranteedStudents
        ? Number(form.guaranteedStudents)
        : null,
      preferred_month: form.preferredMonth || null,
      workshop_interest: form.selectedWorkshops,
      notes: form.notes?.trim() || null,
      status: 'new',
    };

    const { error: submitError } = await supabase.from('school_leads').insert(payload);

    if (submitError) {
      console.error(submitError);
      setIsSubmitting(false);
      setError(
        'Could not submit your inquiry. Please check your details and try again.'
      );
      toast({
        title: 'Submission Failed',
        description: 'There was a problem with your request.',
        variant: 'destructive',
      });
      return;
    }

    // 🔔 Best-effort email notification via Edge Function (non-blocking)
    (async () => {
      try {
        await supabase.functions.invoke('notify-new-lead', {
          body: {
            kind: 'school_lead',
            sourceTable: 'school_leads',
            id: 'not-available-from-anon-client',
            main: {
              name: payload.contact_name || null,
              email: payload.contact_email || null,
              school: payload.school_name || null,
              country: payload.country || null,
              sourcePage: window.location.pathname,
              status: payload.status || null, // 'new'
              extraSummary:
                payload.notes ||
                (Array.isArray(payload.workshop_interest)
                  ? payload.workshop_interest.join(', ')
                  : null),
            },
          },
        });
      } catch (e) {
        // optional logging
      }
    })();

    setIsSubmitting(false);
    setIsDialogOpen(false);
    navigate('/success?type=school');
  }

  return (
    <>
      <SeoHelmet
        title="For Schools"
        description="Bring world-class academic programs to your students. Partner with Access USA to deliver workshops, credit courses, and summer programs that fit your school’s calendar."
      />
      <div className="bg-white text-slate-gray">
        {/* HERO */}
        <section className="bg-gradient-to-br from-electric-blue/10 to-indigo-50 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                Bring World-Class Academic Programs to Your Students
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                Access USA partners with Indian schools to deliver high-impact workshops,
                university credit courses, and summer programs that fit seamlessly into your
                academic calendar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY SCHOOLS PARTNER */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Why Schools Partner With Access USA
              </h2>
              <p className="text-lg text-slate-600">
                We provide a reliable, academically serious way to bring university-level
                opportunities directly into your school community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50/70 rounded-2xl p-6 text-center border border-slate-200/60"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-electric-blue text-white rounded-full p-3">
                      <benefit.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-midnight-navy mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FLEXIBLE DELIVERY + WHAT'S INCLUDED */}
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50/70">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                  Flexible Delivery
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  We work with you to design a delivery model that fits your timetable, student
                  profile, and academic goals.
                </p>
                <div className="space-y-6">
                  {deliveryModels.map((model, index) => (
                    <div
                      key={model.title}
                      className="bg-white p-6 rounded-lg border border-slate-200"
                    >
                      <h3 className="font-bold text-lg text-midnight-navy">
                        {model.title}
                      </h3>
                      <p className="text-slate-600">{model.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200/80"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-warm-gold text-white rounded-full p-4">
                    <BookOpenCheck className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-midnight-navy text-center mb-4">
                  What’s Included
                </h3>
                <p className="text-slate-600 mb-6 text-center">
                  We provide the academic and operational backbone so your team can focus on
                  students:
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Detailed syllabi and scheduling support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    University-standard rubrics and grading guidance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Student progress notes and leadership reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Parent session decks and communication materials
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK WITH SCHOOLS */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                How We Work With Schools
              </h2>
              <p className="text-lg text-slate-600">
                A clear, structured process that respects your academic calendar and internal
                decision-making.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-warm-gold mb-1">Step 1</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Consultation
                </h3>
                <p className="text-slate-600 text-sm">
                  We learn about your goals, student profile, board/curriculum, and timelines.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-warm-gold mb-1">Step 2</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Program Selection
                </h3>
                <p className="text-slate-600 text-sm">
                  Together we choose workshops and courses aligned with your needs and grade
                  levels.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-warm-gold mb-1">Step 3</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Scheduling
                </h3>
                <p className="text-slate-600 text-sm">
                  We plan dates, delivery modes, daily schedules, and target enrollment for each
                  program.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6">
                <p className="text-sm font-semibold text-warm-gold mb-1">Step 4</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Faculty Assignment
                </h3>
                <p className="text-slate-600 text-sm">
                  AUSA assigns U.S. university faculty or qualified instructors best suited to
                  your students.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6 md:col-span-2">
                <p className="text-sm font-semibold text-warm-gold mb-1">Step 5</p>
                <h3 className="text-lg font-bold text-midnight-navy mb-2">
                  Delivery & Feedback
                </h3>
                <p className="text-slate-600 text-sm">
                  Programs are delivered, students complete their work, and your school receives
                  performance notes and next-step recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA + DIALOG */}
        <section className="py-16 md:py-20 lg:py-24 bg-midnight-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Partner With Access USA
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
              Partner with Access USA to elevate your school’s academic profile. Your students
              deserve opportunities that prepare them for global success.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-warm-gold text-midnight-navy hover:bg-warm-gold/90"
                >
                  <Building className="w-5 h-5 mr-3" />
                  Contact Us About School Partnerships
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>School Partnership Inquiry</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and a partnership manager will contact you for a
                    planning call.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="grid gap-6 py-4">
                  {error && (
                    <p className="text-red-500 bg-red-100 border border-red-300 p-3 rounded-md">
                      {error}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Your Full Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Jane Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        value={form.schoolName}
                        onChange={handleInputChange}
                        placeholder="e.g., Springfield International"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="jane.doe@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Your Phone/WhatsApp</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="+91..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="e.g., Mumbai"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={form.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Workshop Interest (select all that apply)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {workshopOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={form.selectedWorkshops.includes(option.id)}
                            onCheckedChange={() => handleWorkshopChange(option.id)}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expectedStudents">Expected No. of Students</Label>
                      <Input
                        id="expectedStudents"
                        type="number"
                        value={form.expectedStudents}
                        onChange={handleInputChange}
                        placeholder="e.g., 50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guaranteedStudents">
                        Guaranteed Minimum Students
                      </Label>
                      <Input
                        id="guaranteedStudents"
                        type="number"
                        value={form.guaranteedStudents}
                        onChange={handleInputChange}
                        placeholder="e.g., 25"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="formatPreference">Format Preference</Label>
                      <Select
                        value={form.formatPreference}
                        onValueChange={(val) =>
                          handleSelectChange('formatPreference', val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_person">In-Person</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
                          <SelectItem value="either">Either / Unsure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="preferredMonth">Preferred Month/Term</Label>
                      <Input
                        id="preferredMonth"
                        value={form.preferredMonth}
                        onChange={handleInputChange}
                        placeholder="e.g., August 2025"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Notes or Questions</Label>
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your needs..."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Submit Inquiry'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForSchools;