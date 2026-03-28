import { Hono } from 'hono'
import { requireAuth } from '../middleware/auth'
import { createUserClient } from '../lib/supabase'
import type { AppContext } from '../types'

const sync = new Hono<AppContext>()

sync.use(requireAuth)

// POST /sync/data
// Body: { afterDate?: ISO string }
// Returns all products and recipes (with ingredients) updated after the given date.
// RLS ensures users only receive their own data.
sync.post('/data', async (c) => {
  const token = c.get('token')
  const body = await c.req.json<{ afterDate?: string }>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const afterDate = body.afterDate
    ? new Date(body.afterDate).toISOString()
    : new Date(0).toISOString()

  const [productsResult, recipesResult] = await Promise.all([
    supabase
      .from('products')
      .select('*')
      .gte('updated_at', afterDate)
      .order('updated_at', { ascending: true }),

    supabase
      .from('recipes')
      .select('*, recipe_ingredients(*)')
      .gte('updated_at', afterDate)
      .order('updated_at', { ascending: true }),
  ])

  if (productsResult.error) return c.json({ error: productsResult.error.message }, 400)
  if (recipesResult.error) return c.json({ error: recipesResult.error.message }, 400)

  return c.json({
    products: productsResult.data ?? [],
    recipes: recipesResult.data ?? [],
    syncedAt: new Date().toISOString(),
  })
})

export default sync