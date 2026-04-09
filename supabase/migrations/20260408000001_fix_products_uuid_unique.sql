-- Fix: allow each user to have their own copy of system products
-- Change unique constraint from (uuid) to (uuid, user_id)

ALTER TABLE "public"."products"
  DROP CONSTRAINT "products_uuid_key";

ALTER TABLE "public"."products"
  ADD CONSTRAINT "products_uuid_user_id_key" UNIQUE ("uuid", "user_id");
