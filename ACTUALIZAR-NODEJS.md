# ⚠️ IMPORTANTE: Actualización Manual de Node.js

Tu Node.js v12.22.9 **NO es compatible** con Next.js 15. Necesitas actualizar a **v18+** o **v20 LTS**.

## 🔧 Pasos para actualizar (En terminal WSL):

### Opción 1: Con NVM (RECOMENDADO)

```bash
# 1. Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 2. Cerrar y reabrir tu terminal WSL (o ejecutar):
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 3. Instalar Node 20 LTS
nvm install 20

# 4. Usar Node 20
nvm use 20
nvm alias default 20

# 5. Verificar
node --version   # Debe mostrar v20.x.x
npm --version    # Debe mostrar 10.x.x+
```

### Opción 2: Con APT (Más Simple)

```bash
# Actualizar package manager
sudo apt update

# Instalar NodeSource repo para Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js
sudo apt-get install -y nodejs

# Verificar
node --version
npm --version
```

---

## 🏗️ Después de actualizar Node.js:

```bash
cd /home/antonio/projects/portfolio/MyPortfolio

# Limpiar instalación anterior
rm -rf node_modules package-lock.json .next

# Instalar dependencias
npm install

# Compilar
npm run build

# Correr en desarrollo
npm run dev

# Abrir en navegador: http://localhost:3000
```

---

## ✅ Verificar que todo funcione:

```bash
# Debe compilar sin errores
npm run build

# Debe decir: "ready - started server on 0.0.0.0:3000"
npm run dev
```

---

**⚠️ Sin actualizar Node.js, NO podrá compilar el proyecto.**
