// src/lib/diplomaApiClient.js
import { useAuth0 } from '@auth0/auth0-react';

// Prefer env var but fall back to Render URL.
const API_BASE_URL =
  import.meta.env.VITE_DIPLOMA_API_BASE_URL ||
  'https://ausa-diploma-api.onrender.com';

export function useDiplomaApi() {
  const { getAccessTokenSilently } = useAuth0();

  async function authorizedFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;

    // 1) Get access token
    let token;
    try {
      token = await getAccessTokenSilently();
    } catch (err) {
      console.error(
        '[Diploma API] Error getting access token for',
        url,
        err
      );
      const error = new Error('Unable to get access token');
      error.cause = err;
      throw error;
    }

    // 2) Do the fetch
    let res;
    try {
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.error('[Diploma API] Network error calling', url, err);
      const error = new Error('Network error talking to Diploma API');
      error.cause = err;
      throw error;
    }

    // 3) Read body text (for both success and error)
    let bodyText = '';
    try {
      bodyText = await res.text();
    } catch {
      bodyText = '';
    }

    // 4) Handle non-OK status codes
    if (!res.ok) {
      console.error(
        '[Diploma API] HTTP error',
        res.status,
        res.statusText || '',
        'for',
        url,
        'body:',
        bodyText
      );
      const error = new Error(`Diploma API error ${res.status}`);
      error.status = res.status;
      error.body = bodyText;
      throw error;
    }

    // 5) No content
    if (!bodyText) return null;

    // 6) Try to parse JSON, fall back to raw text
    try {
      return JSON.parse(bodyText);
    } catch {
      return bodyText;
    }
  }

  // ---------- Student-facing helpers ----------

  const getMe = async () => {
    try {
      return await authorizedFetch('/api/diploma/me');
    } catch (err) {
      // On landing / public pages, a 401 just means "not logged in"
      if (err && typeof err.status === 'number' && err.status === 401) {
        return null;
      }
      throw err;
    }
  };

  const getMyItems = async () => {
    try {
      return await authorizedFetch('/api/diploma/me/items');
    } catch (err) {
      if (err && typeof err.status === 'number' && err.status === 401) {
        // Not logged in => no items
        return [];
      }
      throw err;
    }
  };

  const getAnnouncements = async () => {
    try {
      return await authorizedFetch('/api/diploma/announcements');
    } catch (err) {
      if (err && typeof err.status === 'number' && err.status === 401) {
        // Not logged in => no announcements
        return [];
      }
      throw err;
    }
  };

  // ---------- Admin-facing helpers ----------

  const getAdminStudents = (query = '', cohort = '') => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (cohort) params.set('cohort', cohort);
    const qs = params.toString();
    return authorizedFetch(
      `/api/diploma/admin/students${qs ? `?${qs}` : ''}`
    );
  };

  const getAdminStudent = (id) =>
    authorizedFetch(`/api/diploma/admin/students/${id}`);

  const updateAdminStudent = (id, payload) =>
    authorizedFetch(`/api/diploma/admin/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

  // Per-student items
  const getAdminStudentItems = (studentId) =>
    authorizedFetch(
      `/api/diploma/admin/students/${studentId}/items`
    );

  const createAdminStudentItem = (studentId, payload) =>
    authorizedFetch(
      `/api/diploma/admin/students/${studentId}/items`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

  const updateAdminStudentItem = (itemId, payload) =>
    authorizedFetch(`/api/diploma/admin/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

  const deleteAdminStudentItem = (itemId) =>
    authorizedFetch(`/api/diploma/admin/items/${itemId}`, {
      method: 'DELETE',
    });

  // Announcements
  const getAdminAnnouncements = () =>
    authorizedFetch('/api/diploma/admin/announcements');

  const createAdminAnnouncement = (payload) =>
    authorizedFetch('/api/diploma/admin/announcements', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

  return {
    // Student-facing
    getMe,
    getMyItems,
    getAnnouncements,

    // Admin-facing: students
    getAdminStudents,
    getAdminStudent,
    updateAdminStudent,

    // Admin-facing: per-student items
    getAdminStudentItems,
    createAdminStudentItem,
    updateAdminStudentItem,
    deleteAdminStudentItem,

    // Admin-facing: announcements
    getAdminAnnouncements,
    createAdminAnnouncement,
  };
}
