// src/components/diploma/DiplomaDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useDiplomaApi } from '@/lib/diplomaApiClient';

const DiplomaDashboard = () => {
  const { getMe, getMyItems } = useDiplomaApi();
  const [student, setStudent] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [me, myItems] = await Promise.all([getMe(), getMyItems()]);
        if (!cancelled) {
          setStudent(me);
          setItems(myItems);
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
  }, [getMe, getMyItems]);

  if (loading) {
    return <p>Loading your diploma dashboard…</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <section className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p>Cohort: {student.cohort || '–'}</p>
        {student.drive_binder_url && (
          <p className="mt-2">
            <a
              href={student.drive_binder_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open your Diploma Binder
            </a>
          </p>
        )}
      </section>

      <section className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
        {items.length === 0 ? (
          <p>No tasks or next steps yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="border rounded p-3">
                <h3 className="font-medium">{item.title}</h3>
                {item.due_date && (
                  <p className="text-sm text-gray-500">
                    Due: {item.due_date}
                  </p>
                )}
                {item.body && (
                  <p className="text-sm text-gray-700 mt-1">{item.body}</p>
                )}
                {item.drive_link_url && (
                  <p className="mt-2">
                    <a
                      href={item.drive_link_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open related file
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default DiplomaDashboard;
