import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';

// Auth Components
import { Auth0ProviderWithNavigate } from '@/components/auth/Auth0ProviderWithNavigate';

// Public pages
import Home from '@/pages/Home';
import Workshops from '@/pages/Workshops';
import CreditCourses from '@/pages/CreditCourses';
import DiplomaProgram from '@/pages/DiplomaProgram';
import SummerPrograms from '@/pages/SummerPrograms';
import Results from '@/pages/Results';
import ForSchools from '@/pages/ForSchools';
import ForUniversities from '@/pages/ForUniversities';
import About from '@/pages/About';
import FAQs from '@/pages/FAQs';
import Contact from '@/pages/Contact';
import Apply from '@/pages/Apply';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import Success from '@/pages/Success';
import PublicPreview from '@/pages/PublicPreview';
import AnalyticsListener from './AnalyticsListener';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import AnalyticsRouterListener from '@/components/AnalyticsRouterListener';
import DiplomaWelcomePage from '@/pages/DiplomaWelcome';
import DiplomaGate from '@/components/auth/RequireDiplomaStudent';

// Diploma portal pages
import DiplomaLayout from '@/components/diploma/DiplomaLayout';
import DiplomaDashboard from '@/components/diploma/DiplomaDashboard';
import DiplomaAnnouncements from '@/components/diploma/DiplomaAnnouncements';
import DiplomaBinder from '@/components/diploma/DiplomaBinder';
import DiplomaAdmin from '@/components/diploma/DiplomaAdmin';

// Admin pages
import AdminLayout from '@/admin/AdminLayout';
import InboxPage from '@/admin/InboxPage';
import LeadDetailPage from '@/admin/LeadDetailPage';
import AdminLogin from '@/pages/AdminLogin';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Auth0ProviderWithNavigate>
          <AnalyticsListener />
          <AnalyticsProvider />
          <AnalyticsRouterListener />

          <Routes>
            {/* Public preview route stays separate */}
            <Route path="/public-preview" element={<PublicPreview />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="inbox" element={<InboxPage />} />
              <Route
                path="item/:sourceTable/:sourceId"
                element={<LeadDetailPage />}
              />
            </Route>

            {/* Main public site */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workshops" element={<Workshops />} />
                    <Route path="/credit-courses" element={<CreditCourses />} />
                    <Route path="/diploma-program" element={<DiplomaProgram />} />
                    {/* Diploma portal (protected) */}
                    <Route
                      path="/diploma"
                      element={
                        <DiplomaGate>
                          <DiplomaLayout />
                        </DiplomaGate>
                      }
                    >
                      {/* /diploma */}
                      <Route index element={<DiplomaDashboard />} />
                      {/* /diploma/announcements */}
                      <Route
                        path="announcements"
                        element={<DiplomaAnnouncements />}
                      />
                      {/* /diploma/my-binder */}
                      <Route path="my-binder" element={<DiplomaBinder />} />
                      {/* /diploma/admin */}
                      <Route path="admin" element={<DiplomaAdmin />} />
                    </Route>

                    <Route
                      path="/summer-programs"
                      element={<SummerPrograms />}
                    />
                    <Route path="/results" element={<Results />} />
                    <Route path="/for-schools" element={<ForSchools />} />
                    <Route
                      path="/for-universities"
                      element={<ForUniversities />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/apply" element={<Apply />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/cookies" element={<Cookies />} />
                    <Route path="/success" element={<Success />} />

                    {/* 👇 Catchall for any unknown public route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </Auth0ProviderWithNavigate>
        <Toaster />
      </Router>
    </HelmetProvider>
  );
}

export default App;