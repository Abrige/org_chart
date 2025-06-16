#!/bin/bash

cd "$(dirname "$0")/../frontend"

if [ -d "node_modules" ]; then
  echo "✅ Dipendenze già installate"
else
  echo "📦 Installazione delle dipendenze..."
  npm install
fi