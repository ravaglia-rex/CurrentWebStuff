import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, GraduationCap, Check, Loader2 } from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';
import { supabase } from '@/lib/customSupabaseClient';

const steps = [
  { id: 1, name: 'Student Information', icon: User },
  { id: 2, name: 'Program Selection', icon: GraduationCap },
  { id: 3, name: 'Parent Consent', icon: Check },
];

const PROGRAMS = [
  { value: 'workshops', label: 'Workshops' },
  { value: 'credit_courses', label: 'University Credit Courses' },
  { value: 'diploma', label: 'AUSA Diploma Pathway' },
  { value: 'summer', label: 'Summer Programs (U.S.)' },
  { value: 'honors_cs', label: 'Honors Computer Science' },
];

const START_OPTIONS = [
  'April–June 2025',
  'July–September 2025',
  'October–December 2025',
  'January–March 2026',
];

const TIME_OPTIONS = [
  'Light (3–5 hrs/week)',
  'Moderate (6–8 hrs/week)',
  'Intensive (9–12 hrs/week)',
];

const Apply = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState({
    // student
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    current_grade: '',
    school_name: '',
    city: '',
    country: 'India',

    // program prefs
    program_interest: ['diploma'],
    preferred_start: '',
    time_commitment: '',

    // narrative
    personal_mission: '',
    goals: '',

    // parent/guardian
    parent_name: '',
    parent_email: '',
    parent_phone: '',
    has_parent_consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onText = (e) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
  };

  const toggleProgram = (value, checked) => {
    setForm((p) => {
      const set = new Set(p.program_interest);
      if (checked) set.add(value);
      else set.delete(value);
      const next = Array.from(set);
      return { ...p, program_interest: next.length ? next : ['diploma'] };
    });
  };

  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep((s) => s + 1);
  const prevStep = () =>
    currentStep > 0 && setCurrentStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const gradeNum = Number(form.current_grade);
    if (!Number.isFinite(gradeNum) || gradeNum < 6 || gradeNum > 13) {
      setSubmitError('Please enter a valid grade (6–13).');
      setCurrentStep(0);
      return;
    }
    if (!form.program_interest?.length) {
      setSubmitError('Please select at least one program of interest.');
      setCurrentStep(1);
      return;
    }
    if (!form.has_parent_consent) {
      setSubmitError('Parent/guardian consent is required to submit this application.');
      setCurrentStep(2);
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        // student
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        current_grade: gradeNum,
        school_name: form.school_name.trim() || null,
        city: form.city.trim() || null,
        country: form.country.trim() || 'India',

        // programs
        program_interest: form.program_interest,
        preferred_start: form.preferred_start || null,
        time_commitment: form.time_commitment || null,

        // narrative
        personal_mission: form.personal_mission?.trim() || null,
        goals: form.goals?.trim() || null,

        // parents
        parent_name: form.parent_name?.trim() || null,
        parent_email: form.parent_email?.trim() || null,
        parent_phone: form.parent_phone?.trim() || null,
        has_parent_consent: !!form.has_parent_consent,

        // schema status
        status: 'submitted',
      };

      const { error } = await supabase.from('applications').insert(payload);

      if (error) {
        console.error(error);
        setIsSubmitting(false);
        setSubmitError('Application could not be submitted. Please try again.');
        return;
      }

      // Best-effort notification
      try {
        await supabase.functions.invoke('notify-new-lead', {
          body: {
            kind: 'application',
            sourceTable: 'applications',
            id: 'not-available-from-anon-client',
            main: {
              name: `${payload.first_name} ${payload.last_name}`.trim() || null,
              email: payload.email || null,
              school: payload.school_name || null,
              country: payload.country || null,
              sourcePage: window.location.pathname,
              status: payload.status || null,
              extraSummary:
                payload.goals ||
                (Array.isArray(payload.program_interest)
                  ? payload.program_interest.join(', ')
                  : null),
            },
          },
        });
      } catch (notifyErr) {
        console.error('notify-new-lead error (application)', notifyErr);
        // Application is still submitted; no user error.
      }

      setIsSubmitting(false);
      navigate('/success?type=application');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setSubmitError('Application could not be submitted. Please try again.');
    }
  };

  const StepIndicator = () => (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`relative ${
              stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            }`}
          >
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div
                className={`h-0.5 w-full ${
                  stepIdx < currentStep ? 'bg-electric-blue' : 'bg-gray-200'
                }`}
              />
            </div>
            <div
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                stepIdx <= currentStep
                  ? 'bg-white border-electric-blue'
                  : 'bg-gray-200 border-gray-300'
              }`}
            >
              {stepIdx < currentStep ? (
                <Check className="h-5 w-5 text-electric-blue" aria-hidden="true" />
              ) : (
                <step.icon
                  className={`h-5 w-5 ${
                    stepIdx === currentStep ? 'text-electric-blue' : 'text-gray-500'
                  }`}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <>
      <SeoHelmet
        title="Apply to Access USA Programs"
        description="Submit a unified application for workshops, credit courses, summer programs, or the Access USA Diploma Program."
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                Apply to Access USA Programs
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Students may apply for workshops, credit courses, summer programs, or the Diploma
                Program through this unified application.
              </p>
            </div>

            {/* How the process works */}
            <div className="max-w-3xl mx-auto mb-10 text-slate-600 text-sm md:text-base bg-white/70 border border-slate-200/70 rounded-2xl p-5">
              <h2 className="font-semibold text-midnight-navy mb-2 text-base md:text-lg">
                How the Process Works
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Step 1 – Student Information:</strong> Share your basic details,
                  academic background, and school information.
                </li>
                <li>
                  <strong>Step 2 – Program Selection:</strong> Choose the programs you are
                  interested in. You may select multiple pathways.
                </li>
                <li>
                  <strong>Step 3 – Parent Consent:</strong> A parent or guardian confirms their
                  permission to submit this application.
                </li>
              </ul>
              <h3 className="font-semibold text-midnight-navy mt-4 mb-1 text-base md:text-lg">
                What Happens Next
              </h3>
              <p>
                Applications are reviewed by the Access USA team. Students may be asked for
                transcripts or recommendations. For credit courses, placement depends on academic
                readiness.
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <StepIndicator />
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 sm:p-12 rounded-2xl shadow-soft border border-slate-200/60"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-midnight-navy flex items-center">
                        <User className="mr-3" /> Student Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            value={form.first_name}
                            onChange={onText}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            value={form.last_name}
                            onChange={onText}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={onText}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={onText}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="current_grade">Current Grade (6–13)</Label>
                          <Input
                            id="current_grade"
                            type="number"
                            value={form.current_grade}
                            onChange={onText}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" value={form.city} onChange={onText} />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" value={form.country} onChange={onText} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="school_name">School Name</Label>
                        <Input
                          id="school_name"
                          value={form.school_name}
                          onChange={onText}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-midnight-navy flex items-center">
                        <GraduationCap className="mr-3" /> Program Selection
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="preferred_start">Preferred Start Term</Label>
                          <select
                            id="preferred_start"
                            className="w-full border rounded-md h-10 px-3 bg-white"
                            value={form.preferred_start}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                preferred_start: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select…</option>
                            {START_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="time_commitment">Time Commitment</Label>
                          <select
                            id="time_commitment"
                            className="w-full border rounded-md h-10 px-3 bg-white"
                            value={form.time_commitment}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                time_commitment: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select…</option>
                            {TIME_OPTIONS.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <Label>Programs of Interest</Label>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {PROGRAMS.map((p) => (
                            <label
                              key={p.value}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <Checkbox
                                id={`program_${p.value}`}
                                checked={form.program_interest.includes(p.value)}
                                onCheckedChange={(checked) =>
                                  toggleProgram(p.value, !!checked)
                                }
                              />
                              <span>{p.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="personal_mission">
                          Personal Mission (why this path?)
                        </Label>
                        <textarea
                          id="personal_mission"
                          className="w-full border rounded-md p-3 min-h-[110px]"
                          value={form.personal_mission}
                          onChange={onText}
                        />
                      </div>

                      <div>
                        <Label htmlFor="goals">
                          Goals / Notes (anything else we should know?)
                        </Label>
                        <textarea
                          id="goals"
                          className="w-full border rounded-md p-3 min-h-[110px]"
                          value={form.goals}
                          onChange={onText}
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-midnight-navy flex items-center">
                        <Check className="mr-3" /> Parent Consent
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="parent_name">Parent/Guardian Full Name</Label>
                          <Input
                            id="parent_name"
                            value={form.parent_name}
                            onChange={onText}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="parent_email">Parent/Guardian Email</Label>
                          <Input
                            id="parent_email"
                            type="email"
                            value={form.parent_email}
                            onChange={onText}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="parent_phone">
                            Parent/Guardian Phone
                          </Label>
                          <Input
                            id="parent_phone"
                            type="tel"
                            value={form.parent_phone}
                            onChange={onText}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-8">
                          <Checkbox
                            id="has_parent_consent"
                            checked={form.has_parent_consent}
                            onCheckedChange={(checked) =>
                              setForm((p) => ({
                                ...p,
                                has_parent_consent: !!checked,
                              }))
                            }
                            required
                          />
                          <Label htmlFor="has_parent_consent" className="text-sm">
                            I confirm I have <strong>parent/guardian permission</strong> to
                            submit this application.
                          </Label>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {submitError && (
                <p className="mt-6 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-300">
                  {submitError}
                </p>
              )}

              <div className="mt-10 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Apply;