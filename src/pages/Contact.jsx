import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import SeoHelmet from '@/components/SeoHelmet';
import { supabase } from '@/lib/customSupabaseClient';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      full_name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || null,
      role: formData.role,
      message: formData.message.trim(),
      source_page: 'contact',
      utm_source: window.localStorage.getItem('utm_source') || null,
      utm_medium: window.localStorage.getItem('utm_medium') || null,
      utm_campaign: window.localStorage.getItem('utm_campaign') || null,
      utm_term: window.localStorage.getItem('utm_term') || null,
      // status column exists on inquiries with default 'new'
    };

    const { error: submitError } = await supabase.from('inquiries').insert(payload);

    if (submitError) {
      console.error(submitError);
      setIsSubmitting(false);
      setError('Sorry—something went wrong. Please try again.');
      return;
    }

    // 🔔 Best-effort email notification via Edge Function (non-blocking)
    (async () => {
      try {
        await supabase.functions.invoke('notify-new-lead', {
          body: {
            kind: 'general_inquiry',
            sourceTable: 'inquiries',
            id: 'not-available-from-anon-client',
            main: {
              name: payload.full_name || null,
              email: payload.email || null,
              school: null,
              country: null,
              sourcePage: payload.source_page || window.location.pathname,
              status: 'new',
              extraSummary:
                [
                  formData.interest ? `Interest: ${formData.interest}` : null,
                  payload.message || null,
                ]
                  .filter(Boolean)
                  .join(' | ') || null,
            },
          },
        });
      } catch (e) {
        // Optional: log, but don't bother the user
      }
    })();

    setIsSubmitting(false);
    navigate('/success?type=inquiry');
  };

  return (
    <>
      <SeoHelmet
        title="Contact Access USA"
        description="We’re here to help. Contact Access USA with questions about workshops, credit courses, summer programs, and school or university partnerships."
      />

      <div className="bg-white text-slate-gray">
        <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-midnight-navy">
                We’re Here to Help
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                If you are a student, parent, counselor, or school leader, we are happy to guide
                you through our programs and help you find the right opportunity.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Contact details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-2 space-y-8"
              >
                <div className="flex items-start">
                  <div className="bg-electric-blue/10 p-3 rounded-lg mr-4">
                    <Mail className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-midnight-navy">Email Us</h3>
                    <p className="text-slate-600">For general inquiries and support.</p>
                    <a
                      href="mailto:info@ausa.io"
                      className="text-electric-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                    >
                      info@ausa.io
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-electric-blue/10 p-3 rounded-lg mr-4">
                    <Phone className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-midnight-navy">Call Us</h3>
                    <p className="text-slate-600">+91 99301 08548</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-electric-blue/10 p-3 rounded-lg mr-4">
                    <MapPin className="w-6 h-6 text-electric-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-midnight-navy">
                      Our Location (Education World)
                    </h3>
                    <p className="text-slate-600">
                      610, Palm Spring Centre Premises, Near D-Mart, New Link Road, Malad West,
                      Mumbai, Maharashtra, India, 400064.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-soft border border-slate-200/80"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-midnight-navy">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-midnight-navy">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-midnight-navy">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-midnight-navy">
                        School / Organization &amp; Country
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        placeholder="e.g., SAI International, Bhubaneswar, India"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="role" className="text-midnight-navy">
                        I am a...
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange('role', value)}
                        value={formData.role}
                        required
                      >
                        <SelectTrigger id="role" className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="counselor">Counselor</SelectItem>
                          <SelectItem value="school">School Leader / Teacher</SelectItem>
                          <SelectItem value="university">University Representative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="interest" className="text-midnight-navy">
                        Interest area
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange('interest', value)}
                        value={formData.interest}
                      >
                        <SelectTrigger id="interest" className="w-full">
                          <SelectValue placeholder="Select an area" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workshops">Workshops</SelectItem>
                          <SelectItem value="credit-courses">Credit Courses</SelectItem>
                          <SelectItem value="diploma-program">Diploma Program</SelectItem>
                          <SelectItem value="summer-programs">Summer Programs</SelectItem>
                          <SelectItem value="school-partnership">
                            School Partnership
                          </SelectItem>
                          <SelectItem value="university-partnership">
                            University Partnership
                          </SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-midnight-navy">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" /> Send Message
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-slate-500 mt-3 text-center">
                      Our team will respond promptly. We look forward to speaking with you.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;