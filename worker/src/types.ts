import type { User } from '@supabase/supabase-js'

export interface Env {
  SUPABASE_URL: string
  SUPABASE_PUBLISHABLE_KEY: string
}

export interface Variables {
  user: User
  token: string
}

export type AppContext = {
  Bindings: Env
  Variables: Variables
}

// ── Database row types ────────────────────────────────────────

export interface Product {
  id: string
  user_id: string
  name: string
  price: number
  amount: number
  unit: 'gram' | 'kilogram' | 'piece'
  source?: string | null
  color?: string | null
  uuid?: string | null
  category_id?: string | null
  brand?: string | null
  notes?: string | null
  system?: boolean | null
  deleted: boolean
  deleted_at?: string | null
  created_at: string
  updated_at: string
}

export interface RecipeIngredient {
  id: string
  recipe_id: string
  name?: string | null
  amount?: number | null
  product_id?: string | null
  sub_recipe_id?: string | null
  sort_order: number
  created_at: string
}

export interface Recipe {
  id: string
  user_id: string
  name: string
  portions: number
  description?: string | null
  color?: string | null
  tags?: unknown | null
  price_modifiers?: unknown | null
  uuid?: string | null
  category_id?: string | null
  master: boolean
  deleted: boolean
  deleted_at?: string | null
  created_at: string
  updated_at: string
  recipe_ingredients?: RecipeIngredient[]
}

export interface Profile {
  id: string
  user_id: string
  can_buy: boolean
  created_at: string
  updated_at: string
}