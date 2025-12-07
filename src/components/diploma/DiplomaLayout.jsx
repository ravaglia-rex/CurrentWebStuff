import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const DiplomaLayout = () => {
  const { user } = useAuth0();
  const roles = user?.['https://ausa.io/claims/roles'] || user?.roles || [];
  const isAdmin = Array.isArray(roles) && roles.includes('ausa_admin');

  const displayName =
    user?.given_name ||
    (user?.name && user.name.split(' ')[0]) ||
    user?.nickname ||
    user?.email?.split('@')[0] ||
    'there';

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Diploma Portal</h1>
        <p className="text-gray-600">Welcome back, {displayName}.</p>
      </header>

      <nav className="flex gap-4 mb-8 border-b pb-2">
        <NavLink to="/diploma" end className="hover:underline">
          Dashboard
        </NavLink>
        <NavLink to="/diploma/announcements" className="hover:underline">
          Announcements & Resources
        </NavLink>
        <NavLink to="/diploma/my-binder" className="hover:underline">
          My Binder & Files
        </NavLink>
        {isAdmin && (
          <NavLink to="/diploma/admin" className="hover:underline text-amber-700">
            Admin
          </NavLink>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DiplomaLayout;
