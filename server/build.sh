#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Initialize database if needed
python -c "from database.init_db import init_db; init_db()"

# Collect static files (if any)
# python manage.py collectstatic --no-input 