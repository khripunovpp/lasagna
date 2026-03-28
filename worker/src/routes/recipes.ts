import { Hono } from 'hono'
import { requireAuth } from '../middleware/auth'
import { createUserClient } from '../lib/supabase'
import { paginated, omitProtected } from '../lib/response'
import type { AppContext } from '../types'

type IngredientInput = {
  name?: string
  amount?: number
  product_id?: string
  sub_recipe_id?: string
}

const recipes = new Hono<AppContext>()

recipes.use(requireAuth)

// GET /recipes
recipes.get('/', async (c) => {
  const token = c.get('token')
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const page = Math.max(1, Number(c.req.query('page') ?? 1))
  const pageSize = Math.min(100, Math.max(1, Number(c.req.query('pageSize') ?? 25)))
  const withIngredients = c.req.query('populate') === 'ingredients'
  const showDeleted = c.req.query('deleted') === 'true'

  const { data, error, count } = await supabase
    .from('recipes')
    .select(withIngredients ? '*, recipe_ingredients(*)' : '*', { count: 'exact' })
    .eq('deleted', showDeleted)
    .order('created_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (error) return c.json({ error: error.message }, 400)

  return c.json(paginated(data ?? [], count ?? 0, page, pageSize))
})

// POST /recipes/batch — before /:id
recipes.post('/batch', async (c) => {
  const user = c.get('user')
  const token = c.get('token')
  const body = await c.req.json<{ items: Record<string, unknown>[] }>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ error: 'items array is required' }, 400)
  }

  const added: Record<string, unknown> = {}
  const errors: Record<string, string> = {}

  for (const item of body.items) {
    const uuid = item['uuid'] as string | undefined
    if (!uuid) { errors['_'] = 'Item missing uuid'; continue }

    const { ingredients, ...recipeData } = item as { ingredients?: IngredientInput[]; [k: string]: unknown }

    const { data: recipe, error: recipeErr } = await supabase
      .from('recipes')
      .insert({ ...omitProtected(recipeData), user_id: user.id })
      .select()
      .single()

    if (recipeErr) { errors[uuid] = recipeErr.message; continue }

    if (Array.isArray(ingredients) && ingredients.length > 0) {
      await supabase.from('recipe_ingredients').insert(
        ingredients.map((ing, idx) => ({ ...ing, recipe_id: recipe.id, sort_order: idx }))
      )
    }

    added[uuid] = recipe
  }

  return c.json({ added, errors, hasErrors: Object.keys(errors).length > 0 })
})

// PUT /recipes/batch — before /:id
recipes.put('/batch', async (c) => {
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

    const { ingredients, ...recipeData } = item as { ingredients?: IngredientInput[]; [k: string]: unknown }

    const { data: recipe, error: recipeErr } = await supabase
      .from('recipes')
      .update(omitProtected(recipeData))
      .eq('id', id)
      .select()
      .single()

    if (recipeErr) { errors[id] = recipeErr.message; continue }

    if (Array.isArray(ingredients)) {
      await supabase.from('recipe_ingredients').delete().eq('recipe_id', id)
      if (ingredients.length > 0) {
        await supabase.from('recipe_ingredients').insert(
          ingredients.map((ing, idx) => ({ ...ing, recipe_id: id, sort_order: idx }))
        )
      }
    }

    updated[id] = recipe
  }

  return c.json({ updated, errors, hasErrors: Object.keys(errors).length > 0 })
})

// GET /recipes/:id
recipes.get('/:id', async (c) => {
  const token = c.get('token')
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { data, error } = await supabase
    .from('recipes')
    .select('*, recipe_ingredients(*)')
    .eq('id', c.req.param('id'))
    .single()

  if (error || !data) return c.json({ error: 'Not found' }, 404)

  return c.json({ data })
})

// POST /recipes
recipes.post('/', async (c) => {
  const user = c.get('user')
  const token = c.get('token')
  const body = await c.req.json<{ ingredients?: IngredientInput[]; [k: string]: unknown }>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)

  const { ingredients, ...recipeData } = body

  const { data: recipe, error: recipeErr } = await supabase
    .from('recipes')
    .insert({ ...omitProtected(recipeData), user_id: user.id })
    .select()
    .single()

  if (recipeErr) return c.json({ error: recipeErr.message }, 400)

  if (Array.isArray(ingredients) && ingredients.length > 0) {
    const { error: ingErr } = await supabase.from('recipe_ingredients').insert(
      ingredients.map((ing, idx) => ({ ...ing, recipe_id: recipe.id, sort_order: idx }))
    )
    if (ingErr) return c.json({ error: ingErr.message }, 400)
  }

  const { data: full } = await supabase
    .from('recipes')
    .select('*, recipe_ingredients(*)')
    .eq('id', recipe.id)
    .single()

  return c.json({ data: full }, 201)
})

// PUT /recipes/:id
recipes.put('/:id', async (c) => {
  const token = c.get('token')
  const body = await c.req.json<{ ingredients?: IngredientInput[]; [k: string]: unknown }>()
  const supabase = createUserClient(c.env.SUPABASE_URL, c.env.SUPABASE_PUBLISHABLE_KEY, token)
  const recipeId = c.req.param('id')

  const { ingredients, ...recipeData } = body

  const { data: recipe, error: recipeErr } = await supabase
    .from('recipes')
    .update(omitProtected(recipeData))
    .eq('id', recipeId)
    .select()
    .single()

  if (recipeErr) return c.json({ error: recipeErr.message }, 400)
  if (!recipe) return c.json({ error: 'Not found' }, 404)

  if (ingredients !== undefined) {
    await supabase.from('recipe_ingredients').delete().eq('recipe_id', recipeId)
    if (ingredients.length > 0) {
      await supabase.from('recipe_ingredients').insert(
        ingredients.map((ing, idx) => ({ ...ing, recipe_id: recipeId, sort_order: idx }))
      )
    }
  }

  const { data: full } = await supabase
    .from('recipes')
    .select('*, recipe_ingredients(*)')
    .eq('id', recipeId)
    .single()

  return c.json({ data: full })
})

export default recipes