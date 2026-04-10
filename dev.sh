#!/bin/bash
set -e

echo "Starting Supabase..."
supabase start

echo "Starting Docker services..."
docker-compose up -d angular-dev worker bot
