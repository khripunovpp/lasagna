ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS cleaning_loss numeric NOT NULL DEFAULT 0;
