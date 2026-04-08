import { Hono } from 'hono'
import { requireAuth } from '../middleware/auth'
import { createUserClient } from '../lib/supabase'
import { paginated, omitProtected } from '../lib/response'
import type { AppContext } from '../types'

const products = new Hono<AppContext>()

products.use(requireAuth)

// GET /products
products.get('/', async (c) => {
  const token = c.get('token')
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const page = Math.max(1, Number(c.req.query('page') ?? 1))
  const pageSize = Math.min(100, Math.max(1, Number(c.req.query('pageSize') ?? 25)))
  const showDeleted = c.req.query('deleted') === 'true'

  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('deleted', showDeleted)
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (error) return c.json({ error: error.message }, 400)

  return c.json(paginated(data ?? [], count ?? 0, page, pageSize))
})

// POST /products/batch — must come before /:id to avoid route collision
products.post('/batch', async (c) => {
  const user = c.get('user')
  const token = c.get('token')
  const body = await c.req.json<Record<string, unknown>[]>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  if (!Array.isArray(body) || body.length === 0) {
    return c.json({ error: 'items array is required' }, 400)
  }

  const added: Record<string, unknown> = {}
  const errors: Record<string, string> = {}

  for (const item of body) {
    const uuid = item['uuid'] as string | undefined
    if (!uuid) { errors['_'] = 'Item missing uuid'; continue }

    const { data, error } = await supabase
      .from('products')
      .upsert({ ...omitProtected(item), user_id: user.id }, { onConflict: 'uuid,user_id' })
      .select()
      .single()

    if (error) errors[uuid] = error.message
    else added[uuid] = data
  }

  return c.json({ added, errors, hasErrors: Object.keys(errors).length > 0 })
})

// PUT /products/batch
products.put('/batch', async (c) => {
  const token = c.get('token')
  const body = await c.req.json<{ items: Record<string, unknown>[] }>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ error: 'items array is required' }, 400)
  }

  const updated: Record<string, unknown> = {}
  const errors: Record<string, string> = {}

  for (const item of body.items) {
    const id = item['id'] as string | undefined
    if (!id) { errors['_'] = 'Item missing id'; continue }

    const { data, error } = await supabase
      .from('products')
      .update(omitProtected(item))
      .eq('id', id)
      .select()
      .single()

    if (error) errors[id] = error.message
    else updated[id] = data
  }

  return c.json({ updated, errors, hasErrors: Object.keys(errors).length > 0 })
})

// GET /products/:id
products.get('/:id', async (c) => {
  const token = c.get('token')
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', c.req.param('id'))
    .single()

  if (error || !data) return c.json({ error: 'Not found' }, 404)

  return c.json({ data })
})

// POST /products
products.post('/', async (c) => {
  const user = c.get('user')
  const token = c.get('token')
  const body = await c.req.json<Record<string, unknown>>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { data, error } = await supabase
    .from('products')
    .upsert({ ...omitProtected(body), user_id: user.id }, { onConflict: 'uuid,user_id' })
    .select()
    .single()

  if (error) return c.json({ error: error.message }, 400)

  return c.json({ data }, 201)
})

// PUT /products/:id
products.put('/:id', async (c) => {
  const token = c.get('token')
  const body = await c.req.json<Record<string, unknown>>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { data, error } = await supabase
    .from('products')
    .update(omitProtected(body))
    .eq('id', c.req.param('id'))
    .select()
    .single()

  if (error) return c.json({ error: error.message }, 400)
  if (!data) return c.json({ error: 'Not found' }, 404)

  return c.json({ data })
})

export default products