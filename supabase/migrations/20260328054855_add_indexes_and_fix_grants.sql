-- ============================================================
-- INDEXES
-- ============================================================

-- products: фильтрация по юзеру, deleted, синк по updated_at
CREATE INDEX IF NOT EXISTS products_user_id_idx    ON public.products (user_id);
CREATE INDEX IF NOT EXISTS products_deleted_idx    ON public.products (deleted);
CREATE INDEX IF NOT EXISTS products_updated_at_idx ON public.products (updated_at);

-- recipes: аналогично
CREATE INDEX IF NOT EXISTS recipes_user_id_idx     ON public.recipes (user_id);
CREATE INDEX IF NOT EXISTS recipes_deleted_idx     ON public.recipes (deleted);
CREATE INDEX IF NOT EXISTS recipes_updated_at_idx  ON public.recipes (updated_at);

-- recipe_ingredients: JOIN с recipes
CREATE INDEX IF NOT EXISTS recipe_ingredients_recipe_id_idx ON public.recipe_ingredients (recipe_id);

-- ============================================================
-- FIX: ограничить set_user_role — только service_role
-- anon и authenticated не должны вызывать эту функцию напрямую
-- ============================================================
REVOKE ALL ON FUNCTION public.set_user_role(uuid, text) FROM anon;
REVOKE ALL ON FUNCTION public.set_user_role(uuid, text) FROM authenticated;