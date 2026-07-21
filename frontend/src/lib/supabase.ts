import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let _client: SupabaseClient | null = null
let _warned = false

function warnIfMissing() {
  if (_warned) return
  _warned = true
  const missing: string[] = []
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL')
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY')
  if (missing.length > 0) {
    console.warn(`Supabase: ${missing.join(' and ')} not set — auth & DB features disabled`)
  }
}

function getClient(): SupabaseClient {
  if (!_client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      warnIfMissing()
      return createClient('https://placeholder.supabase.co', 'placeholder-key')
    }
    _client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _client
}

export const supabase = new Proxy<SupabaseClient>({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    const client = getClient()
    const value = (client as any)[prop]
    if (typeof value === 'function') {
      return (...args: unknown[]) => {
        warnIfMissing()
        return value.apply(client, args)
      }
    }
    return value
  },
})
