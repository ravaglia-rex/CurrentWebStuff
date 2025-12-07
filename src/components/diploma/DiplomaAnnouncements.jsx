// src/components/diploma/DiplomaAnnouncements.jsx
import React, { useEffect, useState } from 'react';
import { useDiplomaApi } from '@/lib/diplomaApiClient';

const DiplomaAnnouncements = () => {
  const { getAnnouncements } = useDiplomaApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getAnnouncements();
        if (!cancelled) {
          setItems(data);
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
  }, [getAnnouncements]);

  if (loading) return <p>Loading announcements…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="space-y-4">
      {items.length === 0 && <p>No announcements at the moment.</p>}
      {items.map((a) => (
        <article key={a.id} className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold">{a.title}</h2>
          {a.body && <p className="mt-1 text-gray-700">{a.body}</p>}
          {a.drive_link_url && (
            <p className="mt-2">
              <a
                href={a.drive_link_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Open in Google Drive
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
};

export default DiplomaAnnouncements;
