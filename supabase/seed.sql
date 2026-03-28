-- Local development seed
-- Users must be created via the Auth API (or Supabase Studio), not SQL directly.

-- After creating a user via API, promote them to admin:
--   SELECT public.set_user_role('<user-uuid>', 'admin');

-- Example product (replace user_id with a real UUID from auth.users):
-- INSERT INTO public.products (user_id, name, price, amount, unit)
-- VALUES ('<user-uuid>', 'Мука пшеничная', 8500, 1000, 'gram');

-- Example recipe:
-- INSERT INTO public.recipes (user_id, name, portions)
-- VALUES ('<user-uuid>', 'Лазанья классическая', 6);