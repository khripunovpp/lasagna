import { createMiddleware } from 'hono/factory'
import { createUserClient } from '../lib/supabase'
import type { AppContext } from '../types'

/** Validates the Bearer JWT and stores `user` + `token` in context. */
export const requireAuth = createMiddleware<AppContext>(async (c, next) => {
  const authorization = c.req.header('Authorization')
  if (!authorization?.startsWith('Bearer ')) {
    return c.json({ error: 'Missing or invalid Authorization header' }, 401)
  }

  const token = authorization.slice(7)
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  c.set('user', user)
  c.set('token', token)
  await next()
})

/**
 * Must be used AFTER requireAuth.
 * Checks that app_metadata.role === 'admin'.
 */
export const requireAdmin = createMiddleware<AppContext>(async (c, next) => {
  const user = c.get('user')
  if ((user?.app_metadata as Record<string, unknown> | undefined)?.role !== 'admin') {
    return c.json({ error: 'Forbidden: admin access required' }, 403)
  }
  await next()
})