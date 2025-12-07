import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth0 } from '@auth0/auth0-react';

const DiplomaWelcomePage = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-600">Loading your diploma portal…</p>
      </div>
    );
  }

  // Choose a friendly display name:
  const displayName =
    user?.given_name ||                     // preferred: first name
    (user?.name && user.name.split(' ')[0]) || // fall back to first part of full name
    user?.nickname ||
    user?.email?.split('@')[0] ||          // last resort: part of email
    'there';

  return (
    <>
      <Helmet>
        <title>Diploma Portal | Access USA</title>
        <meta
          name="description"
          content="Welcome page for diploma program students."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Diploma Program, {displayName}!
        </h1>
        <p className="text-lg text-gray-600">
          This is your private space as a Diploma Program student.
        </p>
        <p className="text-md text-gray-500 mt-2">
          Your binder, calendar, and next steps will appear here as we build out the portal.
        </p>
      </div>
    </>
  );
};

export default DiplomaWelcomePage;