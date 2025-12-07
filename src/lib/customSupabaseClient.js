import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://amshrzyuoxgmwdekjgts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtc2hyenl1b3hnbXdkZWtqZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDExNTYsImV4cCI6MjA3ODIxNzE1Nn0.XYdTTbVlxJT490LahKf33L7o8tJOV_OEN3AvM6oitFg';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
