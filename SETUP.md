# 🚀 Portfolio - Setup e Instalación

## ✅ Estado Actual
- **Código**: Totalmente fixed y optimizado ✨
- **Diseño**: Moderno con gradientes y animaciones 🎨
- **CV**: Mejorado con métricas cuantificables 📊
- **Proyecto**: Expense Optimizer agregado 📦

---

## 🚨 Requisito: Node.js 18+

Tu versión actual de Node.js es muy antigua. Necesitas actualizar a **Node 18** o **Node 20**.

### Opción 1: Instalar con NVM (RECOMENDADO)
```bash
# En WSL:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reinicia tu terminal, luego:
nvm install 20
nvm use 20
nvm alias default 20

# Verifica:
node --version  # debe ser v20.x.x
npm --version   # debe ser 10.x.x+
```

### Opción 2: Descargar directo
```bash
# En WSL, actualizar Node.js desde apt:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🔧 Instalación y Build

```bash
cd /home/antonio/projects/portfolio/MyPortfolio

# 1. Limpiar instalación anterior
rm -rf node_modules package-lock.json

# 2. Instalar dependencias
npm install

# 3. Compilar
npm run build

# 4. Correr localmente
npm run dev

# 5. Abrir en navegador
# http://localhost:3000
```

---

## 📦 Dependencias Actualizadas
- **Next.js**: 15.1.3 (sin vulnerabilidades) ✅
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Tailwind CSS**: 4.x
- **Framer Motion**: 12.23.1

---

## 🎯 Cambios Realizados

### Componentes Fixed
- ✅ **About.tsx**: Estructura HTML corregida
- ✅ **Hero.tsx**: Perfil con glow animado
- ✅ **Projects.tsx**: Grid mejorado con estrellas
- ✅ **Skills.tsx**: 4 columnas categorizadas
- ✅ **Experience.tsx**: Timeline visual
- ✅ **Profile.tsx**: 3 tarjetas con gradientes
- ✅ **globals.css**: Diseño moderno sin vulnerabilidades

### Contenido
- ✅ Proyecto **Expense Optimizer** agregado (es, en, ca, fr)
- ✅ CV con **métricas de impacto**
- ✅ Experiencia con logros cuantificables

---

## 🌐 Despliegue a Vercel

```bash
# Si tienes cuenta en Vercel:
npm install -g vercel
vercel login
vercel

# Vercel detecará automáticamente Next.js y desplegará
```

---

## ❓ Troubleshooting

**Error: "Unexpected token"**
→ Asegúrate de haber actualizado Node.js a v18+

**Error: "npm ERR!"**
→ Ejecuta: `npm cache clean --force && npm install`

**Error de compilación**
→ Verifica: `npm run lint` para errores de código

---

## 📞 Comandos Útiles

```bash
npm run dev       # Correr en desarrollo
npm run build     # Compilar para producción
npm start         # Correr versión compilada
npm run lint      # Chequear código
```

---

**Tu portfolio está listo! 🎉**
