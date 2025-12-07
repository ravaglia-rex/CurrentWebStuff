// src/components/diploma/DiplomaBinder.jsx
import React, { useEffect, useState } from 'react';
import { useDiplomaApi } from '@/lib/diplomaApiClient';

const DiplomaBinder = () => {
  const { getMe } = useDiplomaApi();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getMe();
        if (!cancelled) {
          setStudent(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [getMe]);

  if (loading) return <p>Loading your binder links…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Binder & Files</h2>

      {student.drive_binder_url ? (
        <p>
          <a
            href={student.drive_binder_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open my Diploma Binder
          </a>
        </p>
      ) : (
        <p>No binder link has been added yet.</p>
      )}

      {student.drive_folder_url && (
        <p>
          <a
            href={student.drive_folder_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Open my Google Drive folder
          </a>
        </p>
      )}
    </div>
  );
};

export default DiplomaBinder;
