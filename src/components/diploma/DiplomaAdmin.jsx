// src/components/diploma/DiplomaAdmin.jsx
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AdminStudentsTab from './admin/AdminStudentsTab';
import AdminAnnouncementsTab from './admin/AdminAnnouncementsTab';

const DiplomaAdmin = () => {
  const { user } = useAuth0();
  const roles =
    user?.['https://ausa.io/claims/roles'] || user?.roles || [];
  const isAdmin = Array.isArray(roles) && roles.includes('ausa_admin');

  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'announcements'

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-2">
          Admin access required
        </h1>
        <p className="text-gray-600">
          Your account does not have admin permissions for the Diploma
          Program. If you believe this is an error, please contact the site
          administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Diploma Admin Console</h1>
        <p className="text-gray-600">
          View and manage students and shared resources for the Diploma Program.
        </p>
      </header>

      <div className="border-b border-gray-200 mb-4 flex gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('students')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'students'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Students
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('announcements')}
          className={`pb-2 text-sm font-medium ${
            activeTab === 'announcements'
              ? 'border-b-2 border-blue-600 text-blue-700'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Announcements & Shared Resources
        </button>
      </div>

      <main>
        {activeTab === 'students' && <AdminStudentsTab />}
        {activeTab === 'announcements' && <AdminAnnouncementsTab />}
      </main>
    </div>
  );
};

export default DiplomaAdmin;
