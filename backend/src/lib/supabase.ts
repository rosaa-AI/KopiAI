import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _admin: SupabaseClient | null = null;
let _warned = false;

function createMockClient(): SupabaseClient {
  if (!_warned) {
    console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — auth disabled');
    _warned = true;
  }
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
      admin: {},
    },
  } as unknown as SupabaseClient;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      return createMockClient();
    }
    _admin = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  }
  return _admin;
}
