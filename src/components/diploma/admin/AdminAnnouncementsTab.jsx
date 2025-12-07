import React, { useEffect, useState } from 'react';
import { useDiplomaApi } from '@/lib/diplomaApiClient';

const AdminAnnouncementsTab = () => {
  const { getAdminAnnouncements, createAdminAnnouncement } = useDiplomaApi();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    body: '',
    drive_link_url: '',
    audience: 'all_diploma',
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await getAdminAnnouncements();
        if (!cancelled) {
          setItems(data || []);
        }
      } catch (err) {
        console.error('[AdminAnnouncementsTab] getAdminAnnouncements error', err);
        if (!cancelled) {
          setError(err.message || 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // 👇 run once on mount; don't depend on function identity
  }, []); 

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.title.trim()) return;

    setCreating(true);
    setCreateError(null);

    try {
      const created = await createAdminAnnouncement({
        title: newAnnouncement.title.trim(),
        body: newAnnouncement.body.trim(),
        drive_link_url: newAnnouncement.drive_link_url.trim() || null,
        audience: newAnnouncement.audience || 'all_diploma',
      });

      // Prepend new announcement to list
      setItems((prev) => [created, ...(prev || [])]);

      // Reset form
      setNewAnnouncement({
        title: '',
        body: '',
        drive_link_url: '',
        audience: 'all_diploma',
      });
    } catch (err) {
      console.error('[AdminAnnouncementsTab] createAdminAnnouncement error', err);
      setCreateError(err.message || 'Unknown error');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-500">Loading announcements…</p>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-600">
          Error loading announcements: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* New announcement form */}
      <form
        onSubmit={handleCreate}
        className="border rounded-md p-4 space-y-3 text-sm"
      >
        <h2 className="text-base font-semibold">New announcement</h2>

        {createError && (
          <p className="text-xs text-red-600">
            Error creating announcement: {createError}
          </p>
        )}

        <div>
          <label className="block text-gray-500 mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            required
          />
        </div>

        <div>
          <label className="block text-gray-500 mb-1">Body</label>
          <textarea
            className="w-full border rounded-md px-2 py-1 text-sm"
            rows={3}
            value={newAnnouncement.body}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({
                ...prev,
                body: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-gray-500 mb-1">
            Google Drive link (optional)
          </label>
          <input
            type="url"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={newAnnouncement.drive_link_url}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({
                ...prev,
                drive_link_url: e.target.value,
              }))
            }
          />
        </div>

        <div>
          <label className="block text-gray-500 mb-1">Audience</label>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={newAnnouncement.audience}
            onChange={(e) =>
              setNewAnnouncement((prev) => ({
                ...prev,
                audience: e.target.value,
              }))
            }
          >
            <option value="all_diploma">All diploma students</option>
            <option value="cohort_2025">Cohort 2025</option>
            <option value="cohort_2026">Cohort 2026</option>
            <option value="cohort_2027">Cohort 2027</option>
            <option value="cohort_2028">Cohort 2028</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white text-xs font-medium rounded-md px-4 py-2 disabled:opacity-60"
        >
          {creating ? 'Creating…' : 'Create announcement'}
        </button>
      </form>

      {/* Existing announcements list */}
      {items.length === 0 && (
        <p className="text-sm text-gray-500">
          No announcements have been created yet.
        </p>
      )}

      {items.map((a) => (
        <article
          key={a.id}
          className="border rounded-md p-4 text-sm space-y-2"
        >
          <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <h2 className="text-base font-semibold">{a.title}</h2>
            <div className="text-xs text-gray-500">
              Audience:{' '}
              <span className="font-medium">
                {a.audience || 'all_diploma'}
              </span>
            </div>
          </header>

          {a.body && (
            <p className="text-gray-700 whitespace-pre-wrap">{a.body}</p>
          )}

          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {a.starts_at && (
              <span>
                Starts:{' '}
                {new Date(a.starts_at).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            )}
            {a.ends_at && (
              <span>
                Ends:{' '}
                {new Date(a.ends_at).toLocaleString(undefined, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            )}
          </div>

          {a.drive_link_url && (
            <p>
              <a
                href={a.drive_link_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-all"
              >
                Open linked resource in Google Drive
              </a>
            </p>
          )}
        </article>
      ))}
    </div>
  );
};

export default AdminAnnouncementsTab;
