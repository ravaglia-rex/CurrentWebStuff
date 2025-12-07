import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

/**
 * Wrap admin pages with <RequireStaff> to ensure:
 * - user is logged in
 * - user has an active row in public.staff
 */
const RequireStaff = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [checkingStaff, setCheckingStaff] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const checkStaff = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/admin/login', { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from('staff')
        .select('user_id, role, active')
        .eq('user_id', user.id)
        .eq('active', true)
        .maybeSingle();

      if (cancelled) return;

      if (error || !data) {
        // Logged in but not staff: send them back to the main site
        navigate('/', { replace: true });
        return;
      }

      setIsStaff(true);
      setCheckingStaff(false);
    };

    checkStaff();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading, navigate]);

  if (authLoading || checkingStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Checking access…
      </div>
    );
  }

  if (!isStaff) {
    return null;
  }

  return <>{children}</>;
};

export default RequireStaff;