import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import RequireStaff from './RequireStaff';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminLayout = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <RequireStaff>
      <div className="min-h-screen flex bg-slate-50">
        <aside className="w-56 border-r bg-white px-4 py-6 flex flex-col">
          <div className="mb-6">
            <h1 className="text-lg font-semibold tracking-tight">AUSA Admin</h1>
            <p className="text-xs text-muted-foreground">
              Internal tools for the team.
            </p>
          </div>

          <nav className="flex-1 space-y-1 text-sm">
            <NavLink
              to="/admin/inbox"
              className={({ isActive }) =>
                [
                  'block rounded-md px-3 py-2',
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100',
                ].join(' ')
              }
            >
              Inbox
            </NavLink>
            {/* Future: add /admin/schools, /admin/reports here */}
          </nav>

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </RequireStaff>
  );
};

export default AdminLayout;