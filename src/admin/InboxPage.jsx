import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KIND_OPTIONS = [
  { value: 'all', label: 'All kinds' },
  { value: 'application', label: 'Applications' },
  { value: 'course_prereg', label: 'Course pre-registrations' },
  { value: 'general_inquiry', label: 'Inquiries' },
  { value: 'school_lead', label: 'School leads' },
  { value: 'university_lead', label: 'University leads' },
  { value: 'workshop_reservation', label: 'Workshop reservations' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'new' },
  { value: 'submitted', label: 'submitted' },
  { value: 'contacted', label: 'contacted' },
  { value: 'qualified', label: 'qualified' },
  { value: 'converted', label: 'converted' },
  { value: 'archived', label: 'archived' },
];

const InboxPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kindFilter, setKindFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let query = supabase.from('v_inbox_open').select('*');

      if (kindFilter !== 'all') {
        query = query.eq('kind', kindFilter);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) {
        console.error('Error loading inbox', error);
        setRows([]);
      } else {
        setRows(data || []);
      }
      setLoading(false);
    };

    load();
  }, [kindFilter, statusFilter]);

  const handleRowClick = (row) => {
    navigate(`/admin/item/${row.source_table}/${row.source_id}`);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inbox</h1>
          <p className="text-sm text-muted-foreground">
            All new leads and activity flowing in from the website.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Kind</span>
          <Select value={kindFilter} onValueChange={setKindFilter}>
            <SelectTrigger className="w-56 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KIND_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">Status</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setKindFilter('all');
            setStatusFilter('all');
          }}
        >
          Reset filters
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/60 sticky top-0 z-10">
              <tr>
                <th className="text-left px-3 py-2 font-medium">Kind</th>
                <th className="text-left px-3 py-2 font-medium">Created</th>
                <th className="text-left px-3 py-2 font-medium">Name</th>
                <th className="text-left px-3 py-2 font-medium">Email</th>
                <th className="text-left px-3 py-2 font-medium">School / Org</th>
                <th className="text-left px-3 py-2 font-medium">Country</th>
                <th className="text-left px-3 py-2 font-medium">Status</th>
                <th className="text-left px-3 py-2 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-muted-foreground">
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-3 py-6 text-center text-muted-foreground">
                    No results match these filters.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={`${row.source_table}-${row.source_id}`}
                    onClick={() => handleRowClick(row)}
                    className="border-t hover:bg-muted/40 cursor-pointer"
                  >
                    <td className="px-3 py-2">{row.kind}</td>
                    <td className="px-3 py-2">
                      {row.created_at ? new Date(row.created_at).toLocaleString() : ''}
                    </td>
                    <td className="px-3 py-2">{row.full_name}</td>
                    <td className="px-3 py-2">{row.email}</td>
                    <td className="px-3 py-2">{row.organization_name}</td>
                    <td className="px-3 py-2">{row.country}</td>
                    <td className="px-3 py-2">{row.status}</td>
                    <td className="px-3 py-2">{row.source_page}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;