#!/bin/bash

set -e

echo "🔄 Switching to main branch..."
git switch main

echo "⬇️ Pulling latest changes from upstream (Organization)..."
git pull upstream main

echo "⬆️ Pushing updates to origin (Your Fork)..."
git push origin main

echo "✅ Sync complete. Your 'main' branch is now up-to-date with upstream."
