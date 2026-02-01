#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Actualización de Node.js para Portfolio${NC}"
echo ""

# Check current Node version
CURRENT_NODE=$(node --version 2>/dev/null || echo "No instalado")
echo -e "${YELLOW}Versión actual de Node.js: $CURRENT_NODE${NC}"
echo ""

# Step 1: Install NVM if not already installed
if [ ! -d "$HOME/.nvm" ]; then
    echo -e "${BLUE}📦 Instalando Node Version Manager (nvm)...${NC}"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    echo -e "${GREEN}✅ NVM instalado${NC}"
else
    echo -e "${GREEN}✅ NVM ya está instalado${NC}"
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

echo ""

# Step 2: Install Node.js 20 LTS
echo -e "${BLUE}📥 Instalando Node.js 20 LTS...${NC}"
nvm install 20 --latest-npm
nvm use 20

# Step 3: Set as default
echo -e "${BLUE}⚙️  Estableciendo Node 20 como versión por defecto...${NC}"
nvm alias default 20

echo ""
echo -e "${GREEN}✅ Versiones instaladas:${NC}"
node --version
npm --version

echo ""

# Step 4: Clean and reinstall dependencies
cd /home/antonio/projects/portfolio/MyPortfolio

echo -e "${BLUE}🧹 Limpiando dependencias anteriores...${NC}"
rm -rf node_modules package-lock.json .next

echo -e "${BLUE}📦 Instalando dependencias del portfolio...${NC}"
npm install

echo ""

# Step 5: Build the project
echo -e "${BLUE}🔨 Compilando proyecto...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ ¡Build completado exitosamente!${NC}"
    echo ""
    echo -e "${YELLOW}Para ejecutar en desarrollo:${NC}"
    echo "  npm run dev"
    echo ""
    echo -e "${YELLOW}Para ejecutar en producción:${NC}"
    echo "  npm run build && npm start"
else
    echo -e "${RED}❌ Error en la compilación${NC}"
    exit 1
fi
