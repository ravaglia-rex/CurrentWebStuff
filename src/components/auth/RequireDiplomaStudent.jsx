import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import RequireAuth from './RequireAuth';

const DIPLOMA_NAMESPACE = 'https://ausa.io/claims';

const RequireDiplomaStudent = ({ children }) => {
  const { user } = useAuth0();
  const roles =
    user?.[`${DIPLOMA_NAMESPACE}/roles`] || user?.['roles'] || [];

  const isDiploma = Array.isArray(roles) && roles.includes('diploma_student');

  if (!isDiploma) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold mb-2">
            Diploma access required
          </h1>
          <p className="text-slate-600">
            Your account is not currently marked as a Diploma Program student.
            If you believe this is an error, please contact Access USA support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const DiplomaGate = ({ children }) => (
  <RequireAuth>
    <RequireDiplomaStudent>{children}</RequireDiplomaStudent>
  </RequireAuth>
);

export default DiplomaGate;