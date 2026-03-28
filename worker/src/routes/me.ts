import { Hono } from 'hono'
import { requireAuth } from '../middleware/auth'
import { createUserClient } from '../lib/supabase'
import type { AppContext } from '../types'

const me = new Hono<AppContext>()

me.use(requireAuth)

// GET /me
me.get('/', async (c) => {
  const user = c.get('user')
  const token = c.get('token')
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { data: profile } = await supabase
    .from('profiles')
    .select('can_buy')
    .eq('user_id', user.id)
    .single()

  const meta = user.app_metadata as Record<string, unknown> | undefined

  return c.json({
    id: user.id,
    email: user.email,
    username: (user.user_metadata as Record<string, unknown> | undefined)?.username
      ?? user.email?.split('@')[0],
    role: meta?.role ?? 'user',
    canBuy: profile?.can_buy ?? false,
  })
})

export default me