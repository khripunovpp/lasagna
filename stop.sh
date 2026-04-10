#!/bin/bash
set -e

echo "Stopping Docker services..."
docker-compose down

echo "Stopping Supabase..."
supabase stop
