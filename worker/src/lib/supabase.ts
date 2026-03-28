import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Client that runs queries as the authenticated user (RLS applies). */
export function createUserClient(url: string, publishableKey: string, token: string): SupabaseClient {
  return createClient(url, publishableKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}

/** Service-role client that bypasses RLS. Use only for admin operations. */
export function createServiceClient(url: string, serviceRoleKey: string): SupabaseClient {
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })
}