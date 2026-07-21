import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — Supabase features disabled');
      return { auth: { admin: {} } } as unknown as SupabaseClient;
    }
    _admin = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  }
  return _admin;
}
