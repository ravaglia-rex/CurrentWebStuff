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
    title: 'High-Quality Student Pipeline',
    description:
      'Students complete workshops, credit courses, and summer programs before applying—ensuring maturity and academic readiness.',
  },
  {
    icon: CheckCircle,
    title: 'Faculty-Led Instruction',
    description:
      'Access USA manages logistics, recruitment, and delivery so that your faculty can focus on teaching and mentoring.',
  },
  {
    icon: FileText,
    title: 'Genuine Global Engagement',
    description:
      'Reach motivated, academically strong students across India, building a long-term presence in a key global market.',
  },
  {
    icon: Award,
    title: 'Support for Summer Programs',
    description:
      'We assist with recruitment, student preparation, school communication, and promotion of your residential programs.',
  },
];

const partnershipOptions = [
  {
    title: 'Synchronous Online Courses',
    description:
      'Offer credit-bearing online courses to pre-admitted or prospective students in India, taught by your own faculty.',
  },
  {
    title: 'Faculty-Led Workshops in India',
    description:
      'Send faculty to leading Indian schools for short, high-impact workshops that showcase your academic strengths.',
  },
  {
    title: 'Summer Programs on Campus',
    description:
      'Host carefully prepared cohorts of international high school students on your campus for residential programs.',
  },
  {
    title: 'Joint Certifications & Signature Programs',
    description:
      'Co-develop branded pathways, credentials, or honors tracks that align with your strategic priorities.',
  },
];

const interestOptions = [
  { id: 'online-courses', label: 'Synchronous Online Courses' },
  { id: 'workshops-india', label: 'Faculty-Led Workshops in India' },
  { id: 'summer-programs', label: 'Summer Programs on Campus' },
  { id: 'joint-programs', label: 'Joint Certifications / Signature Programs' },
];

const ForUniversities = () => {
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
    country: 'United States',
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
      school_name: form.schoolName.trim(), // kept for schema compatibility
      city: form.city?.trim() || null,
      country: form.country?.trim() || 'United States',
      format_preference: form.formatPreference,
      expected_students: form.expectedStudents
        ? Number(form.expectedStudents)
        : null,
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
            kind: 'school_lead', // left as-is for backend compatibility
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
    navigate('/success?type=university');
  }

  return (
    <>
      <SeoHelmet
        title="For Universities"
        description="Partner with Access USA to reach high-achieving students from India through online courses, summer programs, and faculty-led workshops."
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
                Work With High-Achieving Students From Across India
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                Access USA works with accredited U.S. universities to deliver online courses,
                summer programs, and faculty-led workshops to motivated students across India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* WHY UNIVERSITIES PARTNER */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 text-midnight-navy">
                Why Universities Work With Us
              </h2>
              <p className="text-lg text-slate-600">
                We help universities build sustainable, academically rigorous pathways to
                international students who are ready for serious work.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
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

        {/* PARTNERSHIP OPPORTUNITIES */}
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
                  Opportunities for Universities
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Access USA can support a range of collaboration models—from pilot courses to
                  multi-year academic pathways.
                </p>
                <div className="space-y-6">
                  {partnershipOptions.map((option) => (
                    <div
                      key={option.title}
                      className="bg-white p-6 rounded-lg border border-slate-200"
                    >
                      <h3 className="font-bold text-lg text-midnight-navy">
                        {option.title}
                      </h3>
                      <p className="text-slate-600">{option.description}</p>
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
                  What We Handle
                </h3>
                <p className="text-slate-600 mb-6 text-center">
                  We streamline the operational details so your academic team can focus on the
                  classroom:
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Recruitment and communication with schools and counselors in India
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Student preparation, onboarding, and pre-course expectations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Scheduling and time-zone coordination for live sessions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-electric-blue mr-3" />
                    Post-program reporting and pathways for continued engagement
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA + DIALOG */}
        <section className="py-16 md:py-20 lg:py-24 bg-midnight-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Join Our Network of University Partners
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
              Connect with capable, motivated students prepared for academic success, and build
              a meaningful presence in one of the world’s most important talent markets.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-warm-gold text-midnight-navy hover:bg-warm-gold/90"
                >
                  <Building className="w-5 h-5 mr-3" />
                  Contact Us About University Collaborations
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>University Collaboration Inquiry</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and a member of the Access USA team will follow up to
                    discuss options for collaboration.
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
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Dr. Jane Smith"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="schoolName">Institution / University Name</Label>
                      <Input
                        id="schoolName"
                        value={form.schoolName}
                        onChange={handleInputChange}
                        placeholder="e.g., Northwood University"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="jane.smith@university.edu"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="+1 ..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="e.g., Midland, MI"
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
                    <Label>Collaboration Interest (select all that apply)</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {interestOptions.map((option) => (
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
                      <Label htmlFor="expectedStudents">
                        Approx. Students per Year (if known)
                      </Label>
                      <Input
                        id="expectedStudents"
                        type="number"
                        value={form.expectedStudents}
                        onChange={handleInputChange}
                        placeholder="e.g., 20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guaranteedStudents">
                        Target Cohort Size for Pilots
                      </Label>
                      <Input
                        id="guaranteedStudents"
                        type="number"
                        value={form.guaranteedStudents}
                        onChange={handleInputChange}
                        placeholder="e.g., 10–15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="formatPreference">Preferred Modality</Label>
                      <Select
                        value={form.formatPreference}
                        onValueChange={(val) =>
                          handleSelectChange('formatPreference', val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a modality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_person">
                            On-Campus / In-Person Only
                          </SelectItem>
                          <SelectItem value="online">Online / Hybrid</SelectItem>
                          <SelectItem value="either">Open to All Options</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="preferredMonth">Desired Start Term</Label>
                      <Input
                        id="preferredMonth"
                        value={form.preferredMonth}
                        onChange={handleInputChange}
                        placeholder="e.g., Summer 2026"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="notes">Additional Context or Questions</Label>
                    <Textarea
                      id="notes"
                      value={form.notes}
                      onChange={handleInputChange}
                      placeholder="Tell us about your priorities, programs of interest, or any constraints."
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      'Submit Partnership Inquiry'
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

export default ForUniversities;