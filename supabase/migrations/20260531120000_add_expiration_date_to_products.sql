ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS expiration_date timestamp with time zone;
