import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const STATUS_OPTIONS = [
  'new',
  'submitted',
  'contacted',
  'qualified',
  'converted',
  'archived',
];

const prettyJson = (obj) => JSON.stringify(obj, null, 2);

const LeadDetailPage = () => {
  const { sourceTable, sourceId } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!sourceTable || !sourceId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from(sourceTable)
        .select('*')
        .eq('id', sourceId)
        .single();

      if (error) {
        console.error('Error loading record', error);
        setError(error.message);
        setRecord(null);
      } else {
        setRecord(data);
        setError(null);
      }
      setLoading(false);
    };

    load();
  }, [sourceTable, sourceId]);

  const handleStatusChange = async (newStatus) => {
    if (!record || !('status' in record)) return;
    setSavingStatus(true);
    const { error } = await supabase
      .from(sourceTable)
      .update({ status: newStatus })
      .eq('id', sourceId);

    if (error) {
      console.error('Error updating status', error);
      alert('Error updating status: ' + error.message);
    } else {
      setRecord((prev) => ({ ...prev, status: newStatus }));
    }

    setSavingStatus(false);
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading record…</div>;
  }

  if (error || !record) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-destructive">Error: {error || 'Record not found.'}</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/admin/inbox">Back to inbox</Link>
        </Button>
      </div>
    );
  }

  const status = record.status ?? 'n/a';

  const name =
    record.full_name ||
    (record.first_name && `${record.first_name} ${record.last_name || ''}`) ||
    record.contact_name ||
    record.student_first_name ||
    null;

  const email =
    record.email ||
    record.student_email ||
    record.contact_email ||
    record.parent_email ||
    null;

  const school = record.school_name || record.university_name || null;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Source</p>
          <h1 className="text-xl font-semibold tracking-tight">
            {sourceTable} – {record.id}
          </h1>
          {name && <p className="text-sm text-foreground">{name}</p>}
          {email && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Email:</span> {email}
            </p>
          )}
          {school && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">School / Org:</span> {school}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          {'status' in record && (
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Status</span>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button asChild variant="outline" size="sm" disabled={savingStatus}>
            <Link to="/admin/inbox">Back to inbox</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold tracking-tight">Key fields</h2>
          <div className="rounded-md border bg-card p-3 text-xs space-y-1">
            {Object.entries(record)
              .filter(([key]) =>
                [
                  'id',
                  'created_at',
                  'updated_at',
                  'status',
                  'source_page',
                  'school_name',
                  'university_name',
                  'city',
                  'country',
                ].includes(key)
              )
              .map(([key, value]) => (
                <div key={key} className="flex justify-between gap-3">
                  <span className="font-medium">{key}</span>
                  <span className="text-right text-muted-foreground">
                    {typeof value === 'string' || typeof value === 'number'
                      ? String(value)
                      : value === null
                      ? '—'
                      : JSON.stringify(value)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold tracking-tight">Raw record</h2>
          <pre className="rounded-md border bg-card p-3 text-[11px] overflow-auto max-h-[400px]">
            {prettyJson(record)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;