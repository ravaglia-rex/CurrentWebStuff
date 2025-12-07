import React, { useEffect, useState } from 'react';
import { useDiplomaApi } from '@/lib/diplomaApiClient';

const cohortOptions = [
  { value: '', label: 'All cohorts' },
  { value: '2025', label: 'Cohort 2025' },
  { value: '2026', label: 'Cohort 2026' },
  { value: '2027', label: 'Cohort 2027' },
  { value: '2028', label: 'Cohort 2028' },
];

const AdminStudentsTab = () => {
  const {
    getAdminStudents,
    getAdminStudent,
    updateAdminStudent,
    getAdminStudentItems,
    createAdminStudentItem,
    updateAdminStudentItem,
    deleteAdminStudentItem,
  } = useDiplomaApi();

  const [query, setQuery] = useState('');
  const [cohort, setCohort] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [editFields, setEditFields] = useState({
    full_name: '',
    email: '',
    cohort: '',
    drive_binder_url: '',
    drive_folder_url: '',
  });

  // Items state
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [itemsError, setItemsError] = useState(null);
  const [creatingItem, setCreatingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    item_type: 'task', // 'task' | 'note' | 'resource'
    title: '',
    body: '',
    due_date: '', // YYYY-MM-DD or ''
    drive_link_url: '',
    visible_to_student: true,
  });

  // Load initial list (all students)
  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      setLoadingList(true);
      setError(null);
      try {
        const data = await getAdminStudents('', '');
        if (!cancelled) {
          setStudents(data || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    }

    loadInitial();
    return () => {
      cancelled = true;
    };
  }, [getAdminStudents]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingList(true);
    setError(null);
    setSelectedStudent(null);
    setItems([]);
    setItemsError(null);

    try {
      const data = await getAdminStudents(query.trim(), cohort);
      setStudents(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingList(false);
    }
  };

  const handleSelectStudent = async (student) => {
    setSelectedStudent(null);
    setLoadingDetail(true);
    setError(null);
    setSaveError(null);
    setItems([]);
    setItemsError(null);

    try {
      const detail = await getAdminStudent(student.id);
      setSelectedStudent(detail);
      setEditFields({
        full_name: detail.full_name || '',
        email: detail.email || '',
        cohort: detail.cohort || '',
        drive_binder_url: detail.drive_binder_url || '',
        drive_folder_url: detail.drive_folder_url || '',
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Load items when selectedStudent changes
  useEffect(() => {
    if (!selectedStudent) {
      setItems([]);
      setItemsError(null);
      return;
    }

    let cancelled = false;

    async function loadItems() {
      setItemsLoading(true);
      setItemsError(null);
      try {
        const data = await getAdminStudentItems(selectedStudent.id);
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error loading student items', err);
        if (!cancelled) {
          setItemsError(err.message || 'Failed to load student items');
        }
      } finally {
        if (!cancelled) {
          setItemsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      cancelled = true;
    };
  }, [selectedStudent, getAdminStudentItems]);

  const handleEditChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!selectedStudent) return;
    setSaving(true);
    setSaveError(null);

    try {
      const updated = await updateAdminStudent(selectedStudent.id, {
        full_name: editFields.full_name,
        email: editFields.email,
        cohort: editFields.cohort,
        drive_binder_url: editFields.drive_binder_url,
        drive_folder_url: editFields.drive_folder_url,
      });

      setSelectedStudent(updated);

      // Refresh the list so name/email reflect changes
      const refreshedList = await getAdminStudents(query.trim(), cohort);
      setStudents(refreshedList || []);
    } catch (err) {
      console.error(err);
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    if (!newItem.title.trim()) {
      alert('Title is required for a new item.');
      return;
    }

    setCreatingItem(true);
    try {
      const payload = {
        item_type: newItem.item_type,
        title: newItem.title.trim(),
        body: newItem.body.trim() || undefined,
        drive_link_url:
          newItem.drive_link_url.trim() || undefined,
        due_date: newItem.due_date || undefined,
        visible_to_student: !!newItem.visible_to_student,
      };

      const created = await createAdminStudentItem(
        selectedStudent.id,
        payload
      );

      // Prepend the new item
      setItems((prev) => [created, ...prev]);

      // Reset form
      setNewItem({
        item_type: 'task',
        title: '',
        body: '',
        due_date: '',
        drive_link_url: '',
        visible_to_student: true,
      });
    } catch (err) {
      console.error('Error creating student item', err);
      alert(
        err?.message || 'Failed to create item. Please try again.'
      );
    } finally {
      setCreatingItem(false);
    }
  };

  const handleToggleVisibility = async (item) => {
    try {
      const updated = await updateAdminStudentItem(item.id, {
        visible_to_student: !item.visible_to_student,
      });

      setItems((prev) =>
        prev.map((it) => (it.id === item.id ? updated : it))
      );
    } catch (err) {
      console.error('Error toggling visibility', err);
      alert('Failed to update visibility. Please try again.');
    }
  };

  const handleDeleteItem = async (item) => {
    if (
      !window.confirm(
        'Delete this item? This cannot be undone.'
      )
    ) {
      return;
    }

    try {
      await deleteAdminStudentItem(item.id);
      setItems((prev) => prev.filter((it) => it.id !== item.id));
    } catch (err) {
      console.error('Error deleting item', err);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-6">
      {/* Left side: search + list */}
      <section>
        <form
          onSubmit={handleSearch}
          className="mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="Name or email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cohort
            </label>
            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            >
              {cohortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium rounded-md px-4 py-2"
          >
            Search
          </button>
        </form>

        {loadingList && (
          <p className="text-sm text-gray-500">Loading students…</p>
        )}
        {error && (
          <p className="text-sm text-red-600 mb-2">
            Error loading students: {error}
          </p>
        )}

        <div className="border rounded-md divide-y max-h-[420px] overflow-y-auto">
          {students.length === 0 && !loadingList ? (
            <div className="p-4 text-sm text-gray-500">
              No students found. Try adjusting your search.
            </div>
          ) : (
            students.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectStudent(s)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                  selectedStudent?.id === s.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="font-medium">
                  {s.full_name || s.email}
                </div>
                <div className="text-gray-600 text-xs">
                  {s.email}
                  {s.cohort && ` • Cohort ${s.cohort}`}
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      {/* Right side: detail */}
      <section className="border rounded-md p-4">
        <h2 className="text-lg font-semibold mb-3">Student details</h2>

        {loadingDetail && (
          <p className="text-sm text-gray-500">Loading student details…</p>
        )}

        {!loadingDetail && !selectedStudent && (
          <p className="text-sm text-gray-500">
            Select a student from the list to view and edit their details.
          </p>
        )}

        {!loadingDetail && selectedStudent && (
          <div className="space-y-6 text-sm">
            {/* Basic info / binder fields */}
            <div className="space-y-4">
              {saveError && (
                <p className="text-xs text-red-600">
                  Error saving changes: {saveError}
                </p>
              )}

              <div>
                <label className="block text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  value={editFields.full_name}
                  onChange={(e) =>
                    handleEditChange('full_name', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  value={editFields.email}
                  onChange={(e) =>
                    handleEditChange('email', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-gray-500 mb-1">Cohort</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-2 py-1 text-sm"
                  placeholder="e.g. 2026"
                  value={editFields.cohort}
                  onChange={(e) =>
                    handleEditChange('cohort', e.target.value)
                  }
                />
              </div>

              <div>
                <div className="text-gray-500 mb-1">
                  Auth0 Sub (read-only)
                </div>
                <div className="font-mono text-xs break-all bg-gray-50 border rounded-md px-2 py-1">
                  {selectedStudent.auth0_sub || '—'}
                </div>
              </div>

              <div>
                <label className="block text-gray-500 mb-1">
                  Drive binder URL
                </label>
                <input
                  type="url"
                  className="w-full border rounded-md px-2 py-1 text-sm break-all"
                  value={editFields.drive_binder_url}
                  onChange={(e) =>
                    handleEditChange('drive_binder_url', e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-gray-500 mb-1">
                  Drive folder URL
                </label>
                <input
                  type="url"
                  className="w-full border rounded-md px-2 py-1 text-sm break-all"
                  value={editFields.drive_folder_url}
                  onChange={(e) =>
                    handleEditChange('drive_folder_url', e.target.value)
                  }
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white text-xs font-medium rounded-md px-4 py-2 disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </div>

            {/* Student items */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">
                Student items (tasks / notes / resources)
              </h3>

              {itemsLoading && (
                <p className="text-xs text-gray-500">Loading items…</p>
              )}

              {itemsError && (
                <p className="text-xs text-red-600 mb-2">
                  Error loading items: {itemsError}
                </p>
              )}

              {!itemsLoading && !itemsError && (
                <>
                  {items.length === 0 ? (
                    <p className="text-xs text-gray-500 mb-3">
                      No items yet for this student.
                    </p>
                  ) : (
                    <ul className="space-y-2 mb-4 text-xs">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="border rounded-md p-2 bg-gray-50 flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide">
                                {item.item_type}
                              </span>
                              <span className="font-medium">
                                {item.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleToggleVisibility(item)
                                }
                                className={
                                  'px-2 py-0.5 rounded-md border text-[10px] ' +
                                  (item.visible_to_student
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                    : 'bg-amber-50 border-amber-300 text-amber-800')
                                }
                              >
                                {item.visible_to_student
                                  ? 'Hide from student'
                                  : 'Show to student'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item)}
                                className="px-2 py-0.5 rounded-md border border-red-300 text-[10px] text-red-700 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                          {item.body && (
                            <p className="text-[11px] text-gray-700 whitespace-pre-line mt-1">
                              {item.body}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 mt-1">
                            {item.due_date && (
                              <span>
                                Due{' '}
                                {new Date(
                                  item.due_date
                                ).toLocaleDateString()}
                              </span>
                            )}
                            {item.drive_link_url && (
                              <a
                                href={item.drive_link_url}
                                target="_blank"
                                rel="noreferrer"
                                className="underline"
                              >
                                Drive link
                              </a>
                            )}
                            <span>
                              Created{' '}
                              {new Date(
                                item.created_at
                              ).toLocaleString(undefined, {
                                dateStyle: 'short',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add new item form */}
                  <form
                    onSubmit={handleCreateItem}
                    className="border rounded-md p-3 bg-gray-50 space-y-3 text-xs"
                  >
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">
                          Type
                        </label>
                        <select
                          className="w-full border rounded-md px-2 py-1 text-xs"
                          value={newItem.item_type}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              item_type: e.target.value,
                            }))
                          }
                        >
                          <option value="task">Task</option>
                          <option value="note">Note</option>
                          <option value="resource">Resource</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-gray-600 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          className="w-full border rounded-md px-2 py-1 text-xs"
                          value={newItem.title}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="e.g. Schedule visa prep call"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-600 mb-1">
                        Body / details (optional)
                      </label>
                      <textarea
                        className="w-full border rounded-md px-2 py-1 text-xs"
                        rows={3}
                        value={newItem.body}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            body: e.target.value,
                          }))
                        }
                        placeholder="Notes, instructions, or context for this item."
                      />
                    </div>

                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
                      <div>
                        <label className="block text-[11px] text-gray-600 mb-1">
                          Due date (optional)
                        </label>
                        <input
                          type="date"
                          className="w-full border rounded-md px-2 py-1 text-xs"
                          value={newItem.due_date}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              due_date: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] text-gray-600 mb-1">
                          Drive link (optional)
                        </label>
                        <input
                          type="url"
                          className="w-full border rounded-md px-2 py-1 text-xs"
                          value={newItem.drive_link_url}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              drive_link_url: e.target.value,
                            }))
                          }
                          placeholder="https://drive.google.com/..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <label className="inline-flex items-center gap-2 text-[11px] text-gray-700">
                        <input
                          type="checkbox"
                          className="h-3 w-3"
                          checked={newItem.visible_to_student}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              visible_to_student: e.target.checked,
                            }))
                          }
                        />
                        <span>Visible to student in portal</span>
                      </label>

                      <button
                        type="submit"
                        disabled={creatingItem}
                        className="bg-blue-600 text-white text-[11px] font-medium rounded-md px-3 py-1 disabled:opacity-60"
                      >
                        {creatingItem ? 'Saving…' : 'Add item'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminStudentsTab;
