#!/bin/bash

# Update Node.js using nvm
echo "📦 Instalando Node Version Manager (nvm)..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install latest Node.js LTS
echo "📥 Instalando Node.js 20 LTS..."
nvm install 20
nvm use 20

# Verify versions
echo "✅ Versiones instaladas:"
node --version
npm --version

# Update npm to latest
npm install -g npm@latest

# Clean and reinstall dependencies
echo "🧹 Limpiando node_modules..."
rm -rf node_modules package-lock.json

echo "📦 Instalando dependencias..."
npm install

# Build the project
echo "🔨 Compilando proyecto..."
npm run build

echo "✅ ¡Completado!"
