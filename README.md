# 🛍️ Platzi Fake Store

Una aplicación de e-commerce moderna desarrollada con Next.js 15, TypeScript y TailwindCSS. Este proyecto simula una tienda en línea completa con autenticación, carrito de compras, búsqueda de productos y gestión de perfiles.

## 🚀 Características

### ✨ Funcionalidades principales
- **🔐 Autenticación completa** - Login, registro y gestión de sesión
- **🛒 Carrito de compras** - Agregar, quitar y modificar productos
- **🔍 Búsqueda avanzada** - Filtros por categoría y búsqueda por texto
- **👤 Perfil de usuario** - Gestión de información personal
- **📱 Diseño responsive** - Optimizado para móvil y desktop
- **🎨 UI moderna** - Componentes accesibles con Radix UI

### 🛠️ Características técnicas
- **⚡ Performance optimizada** - Server-side rendering y caching inteligente
- **🎯 Type Safety** - TypeScript en toda la aplicación
- **🔄 Estado del servidor** - TanStack Query para cache y sincronización
- **🎨 Styling moderno** - TailwindCSS 4 con componentes reutilizables
- **📦 Arquitectura escalable** - Organización por dominios y features

## 🏗️ Stack Tecnológico

### Frontend
- **[Next.js 15.5.2](https://nextjs.org/)** - App Router, SSR, optimizaciones automáticas
- **[React 19.1.0](https://react.dev/)** - Componentes y hooks modernos
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety y mejor DX
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Librerías principales
- **[TanStack Query](https://tanstack.com/query)** - Server state management y caching
- **[Axios](https://axios-http.com/)** - Cliente HTTP con interceptors
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles y unstyled
- **[Shadcn](https://ui.shadcn.com/)** - Componentes accesibles y unstyled
- **[Lucide React](https://lucide.dev/)** - Iconografía moderna
- **[Class Variance Authority](https://cva.style/)** - Variantes de componentes

### Tools & Development
- **[ESLint 9](https://eslint.org/)** - Linting y code quality
- **[Turbopack](https://turbo.build/)** - Build tool ultra-rápido
- **Prettier** - Code formatting (recomendado)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── auth/              # Páginas de autenticación
│   ├── cart/              # Carrito de compras
│   ├── product/           # Detalles de productos
│   ├── profile/           # Perfil de usuario
│   └── search/            # Búsqueda y filtros
├── components/            # Componentes reutilizables
│   ├── auth/              # Componentes de autenticación
│   ├── cart/              # Componentes del carrito
│   ├── common/            # Componentes compartidos
│   ├── home/              # Componentes de la página principal
│   ├── product/           # Componentes de productos
│   ├── profile/           # Componentes del perfil
│   ├── search/            # Componentes de búsqueda
│   └── ui/                # Componentes base (Radix UI)
├── contexts/              # Context providers
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y helpers
├── services/              # Capa de servicios (API calls)
└── types/                 # Definiciones de TypeScript
```

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js 18.x o superior
- npm, yarn o pnpm

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/AlejandroRomero17/NextJs-Ecommerce-Platzi-Fake-Store-API
cd platzi-fake-store
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

## 🏛️ Arquitectura y Patrones

### Organización por Dominios
- **Services**: Capa de comunicación con APIs
- **Types**: Definiciones de TypeScript por dominio
- **Components**: Organizados por feature y reutilización

### Patrones Implementados
- **Custom Hooks**: Lógica reutilizable y separación de concerns
- **Context Pattern**: Estado global para auth y carrito
- **Service Layer**: Abstracción de las llamadas a API
- **Error Boundaries**: Manejo graceful de errores
- **Loading States**: UX optimizada con skeletons

### Gestión de Estado
- **Local State**: `useState` para componentes
- **Global State**: Context API para auth y carrito
- **Server State**: TanStack Query para cache y sincronización

## 🔧 API y Servicios

Este proyecto consume la **[Platzi Fake Store API](https://fakeapi.platzi.com/)**

### Endpoints principales:
- `GET /products` - Lista de productos
- `GET /products/:id` - Detalle de producto
- `GET /categories` - Categorías disponibles
- `POST /auth/login` - Autenticación
- `POST /users` - Registro de usuarios
- `GET /auth/profile` - Perfil del usuario

### Manejo de errores
- Interceptor automático para tokens de autenticación
- Helper centralizado para manejo consistente de errores
- Retry automático con TanStack Query

## 🎨 Componentes y UI

### Sistema de Design
- **Componentes base** con Radix UI para accesibilidad
- **Variantes de estilo** con Class Variance Authority
- **Tokens de design** consistentes con TailwindCSS
- **Tema oscuro/claro** preparado (implementación pendiente)

### Componentes destacados
- `AuthGuard` - Protección de rutas
- `ValidatedInput` - Inputs con validación en tiempo real
- `PasswordStrengthIndicator` - Indicador visual de seguridad
- `ProductCard` - Card reutilizable para productos
- `SearchFilters` - Filtros avanzados de búsqueda

## 🔒 Autenticación y Seguridad

### Flujo de autenticación
1. Login/Register → JWT tokens (access + refresh)
2. Tokens almacenados en localStorage
3. Interceptor automático agrega tokens a requests
4. Refresh automático cuando el access token expira
5. Logout limpia tokens y estado

### Medidas de seguridad
- Validación de inputs en cliente y servidor
- Manejo seguro de tokens JWT
- Protección de rutas con `AuthGuard`
- Sanitización de datos de entrada

## 🚀 Performance y Optimización

### Optimizaciones implementadas
- **Server-side Rendering** con App Router
- **Caching inteligente** con TanStack Query
- **Code splitting** automático por rutas
- **Lazy loading** de componentes pesados
- **Optimización de imágenes** con Next.js Image
- **Prefetching** de rutas críticas


## 🚀 Deployment

### Plataformas recomendadas
- **[Vercel](https://vercel.com/)** (recomendado para Next.js)
- **[Netlify](https://www.netlify.com/)**
- **[Railway](https://railway.app/)**


## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@AlejandroRomero17](https://github.com/AlejandroRomero17)
- LinkedIn: [Alejandro Gonzalez Romero](https://www.linkedin.com/in/alejandrogonzalezromero17)
- Email: gonzalez.romero.alejandroo@gmail.com

## 🙏 Agradecimientos

- [Platzi](https://platzi.com/) por la API gratuita
- [Vercel](https://vercel.com/) por la plataforma de deployment
- [Radix UI](https://www.radix-ui.com/) primitives accesibles
- [Shadcn](https://ui.shadcn.com/) componentes preconstruidos basados en Radix + Tailwind
- La comunidad de Next.js por la documentación excelente

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!
