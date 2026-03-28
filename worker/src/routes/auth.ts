import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '../middleware/auth'
import type { AppContext } from '../types'

const auth = new Hono<AppContext>()

// POST /auth/register
auth.post('/register', async (c) => {
  const body = await c.req.json<{ email: string; password: string; username?: string }>()

  if (!body.email || !body.password) {
    return c.json({ error: 'email and password are required' }, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  const { data, error } = await supabase.auth.signUp({
    email: body.email,
    password: body.password,
    options: {
      data: { username: body.username ?? body.email.split('@')[0] },
    },
  })

  if (error) return c.json({ error: error.message }, 400)

  return c.json({ user: data.user, session: data.session }, 201)
})

// POST /auth/login
auth.post('/login', async (c) => {
  const body = await c.req.json<{ email: string; password: string }>()

  if (!body.email || !body.password) {
    return c.json({ error: 'email and password are required' }, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error) return c.json({ error: error.message }, 401)

  return c.json({ user: data.user, session: data.session })
})

// POST /auth/refresh
auth.post('/refresh', async (c) => {
  const body = await c.req.json<{ refresh_token: string }>()

  if (!body.refresh_token) {
    return c.json({ error: 'refresh_token is required' }, 400)
  }

  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: body.refresh_token,
  })

  if (error) return c.json({ error: error.message }, 401)

  return c.json({ user: data.user, session: data.session })
})

// POST /auth/logout
auth.post('/logout', requireAuth, async (c) => {
  const token = c.get('token')
  const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  })

  const { error } = await supabase.auth.signOut()
  if (error) return c.json({ error: error.message }, 400)

  return c.json({ message: 'Logged out successfully' })
})


export default auth