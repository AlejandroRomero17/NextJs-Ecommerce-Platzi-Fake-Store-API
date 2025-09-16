# 🛍️ Platzi Fake Store - Prueba Técnica Frontend

Una aplicación de e-commerce moderna desarrollada con **Next.js 15**, **TypeScript** y **TailwindCSS** como parte de la prueba técnica para Becario Frontend. Este proyecto implementa todas las funcionalidades solicitadas utilizando la **Platzi Fake Store API**.

## 🎯 Cumplimiento de Requisitos

### ✅ Funcionalidades Implementadas

**🏠 Home**
- ✅ Productos obtenidos desde `/products`
- ✅ Cards con imagen, nombre, precio y botón "ver más"
- ✅ Diseño completamente responsivo

**📄 Detalle de Producto**
- ✅ Información completa desde `/products/:id`
- ✅ Botón "Agregar al carrito" funcional
- ✅ Galería de imágenes y información detallada

**🛒 Carrito de Compras**
- ✅ Lista de productos agregados
- ✅ Cálculo de subtotal y total
- ✅ Funcionalidad para eliminar productos

**🔐 Autenticación**
- ✅ Login implementado con `/auth/login`
- ✅ Manejo de sesión con JWT en localStorage
- ✅ Nombre de usuario obtenido desde `/profile`

**👤 Registro de Usuario**
- ✅ Creación de usuarios con `/users`
- ✅ Validación completa de campos (nombre, email, contraseña)

**🔍 Búsqueda y Filtros**
- ✅ Búsqueda por nombre de producto
- ✅ Filtros por categoría usando `/categories`
- ✅ Filtros por rango de precios

**🎨 Propuesta de Diseño**
- ✅ Diseño moderno con componentes reutilizables
- ✅ Sistema de design consistente con Radix UI
- ✅ Interface intuitiva y accesible

## 🚀 Características Adicionales (Valor Agregado)

### ✨ Funcionalidades Extra
- **⚡ Server-Side Rendering** - Mejor SEO y performance inicial
- **🔄 Estado del servidor optimizado** - TanStack Query para caching inteligente
- **🎯 Type Safety completo** - TypeScript en toda la aplicación
- **🛡️ Protección de rutas** - AuthGuard para rutas privadas
- **📱 PWA Ready** - Preparado para Progressive Web App
- **🎨 Componentes accesibles** - Cumple estándares WCAG
- **🔍 Búsqueda avanzada** - Filtros combinados y búsqueda en tiempo real
- **💾 Persistencia de carrito** - Carrito se mantiene entre sesiones
- **🔑 Refresh token automático** - Sesión persistente inteligente

### 🛠️ Arquitectura Avanzada
- **Organización por dominios** - Estructura escalable
- **Custom Hooks** - Lógica reutilizable
- **Error Boundaries** - Manejo graceful de errores
- **Loading States** - UX optimizada con skeletons
- **Service Layer** - Abstracción de APIs

## 🏗️ Stack Tecnológico

### Frontend Core
- **[Next.js 15.5.2](https://nextjs.org/)** - App Router, SSR, optimizaciones automáticas
- **[React 19.1.0](https://react.dev/)** - Componentes y hooks modernos
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety y mejor DX
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Librerías Principales
- **[TanStack Query](https://tanstack.com/query)** - Server state management y caching
- **[Axios](https://axios-http.com/)** - Cliente HTTP con interceptors
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles
- **[Lucide React](https://lucide.dev/)** - Iconografía moderna
- **[Class Variance Authority](https://cva.style/)** - Variantes de componentes

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── auth/              # 🔐 Páginas de autenticación (login, register)
│   ├── cart/              # 🛒 Carrito de compras
│   ├── product/           # 📄 Detalles de productos
│   ├── profile/           # 👤 Perfil de usuario
│   └── search/            # 🔍 Búsqueda y filtros
├── components/            # Componentes reutilizables
│   ├── auth/              # Componentes de autenticación
│   ├── cart/              # Componentes del carrito
│   ├── common/            # Componentes compartidos
│   ├── home/              # Componentes de la página principal
│   ├── product/           # Componentes de productos
│   ├── profile/           # Componentes del perfil
│   ├── search/            # Componentes de búsqueda
│   └── ui/                # Componentes base (Radix UI)
├── contexts/              # Context providers (Auth, Cart)
├── hooks/                 # Custom hooks por funcionalidad
├── lib/                   # Utilidades y helpers
├── services/              # 🌐 Capa de servicios (API calls)
└── types/                 # 📝 Definiciones de TypeScript
```

## 🚀 Instalación y Configuración

### Prerequisitos
- **Node.js 18.x** o superior
- **npm**, **yarn** o **pnpm**

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

## 🔧 API Integration - Platzi Fake Store

### Endpoints Implementados
- ✅ `GET /products` - Lista de productos (Home)
- ✅ `GET /products/:id` - Detalle de producto
- ✅ `GET /categories` - Categorías para filtros
- ✅ `POST /auth/login` - Autenticación de usuarios
- ✅ `POST /users` - Registro de usuarios
- ✅ `GET /auth/profile` - Perfil del usuario autenticado

### Manejo de Errores y Estados
- **Interceptor automático** para tokens de autenticación
- **Retry automático** con TanStack Query
- **Loading states** en todas las operaciones
- **Error boundaries** para recuperación graceful
- **Offline support** con cache inteligente

## 🎨 Propuesta de Diseño
- **https://www.figma.com/design/CJDHjXEznd6BnEDGkOu9aW/EcommercePlatziAPI?node-id=0-1&t=jEVmQvTOVUky2mEU-1**
### Sistema de Design
- **Paleta de colores moderna** - Tonos neutros con acentos vibrantes
- **Tipografía escalable** - Inter para legibilidad óptima
- **Espaciado consistente** - Sistema de spacing basado en 8px
- **Componentes reutilizables** - Design system escalable
- **Responsive first** - Mobile-first approach

### Componentes Destacados
- `ProductCard` - Card optimizada con lazy loading
- `SearchFilters` - Filtros avanzados con estado persistente
- `AuthGuard` - Protección de rutas con redirección inteligente
- `ValidatedInput` - Inputs con validación en tiempo real
- `CartSummary` - Resumen detallado con cálculos automáticos

## 🔒 Autenticación y Seguridad

### Implementación JWT
- **Access tokens** con refresh automático
- **Almacenamiento seguro** en localStorage
- **Interceptor automático** para requests autenticados
- **Logout inteligente** con limpieza de estado
- **Protección de rutas** con AuthGuard component

### Características Responsive
- **Navigation adaptativa** - Drawer en mobile, navbar en desktop
- **Grid flexible** - 1-2-3-4 columnas según viewport
- **Imágenes optimizadas** - Diferentes resoluciones por dispositivo
- **Touch-friendly** - Botones y áreas de click optimizadas

## 🧪 Testing y Calidad de Código

### Herramientas de Calidad
- **ESLint 9** - Linting con reglas estrictas
- **TypeScript strict mode** - Máxima type safety
- **Prettier** (recomendado) - Code formatting consistente

### Patrones de Código
- **Clean Architecture** - Separación de responsabilidades
- **SOLID principles** - Código mantenible y escalable
- **Custom Hooks** - Lógica reutilizable
- **Error Handling** - Manejo consistente de errores
- **Loading States** - UX patterns optimizados

## 🚀 Deployment

### Plataformas Recomendadas
- **[Vercel](https://vercel.com/)** ⭐ (Optimizado para Next.js)
- **[Netlify](https://www.netlify.com/)**
- **[Railway](https://railway.app/)**

## 📸 Screenshots y Demos

### Páginas Principales
- **🏠 Home** - Grid de productos con categorías destacadas
- **📄 Producto** - Galería de imágenes y información detallada
- **🛒 Carrito** - Lista de productos con cálculo de totales
- **🔐 Auth** - Login y registro con validación en tiempo real
- **🔍 Búsqueda** - Filtros avanzados y resultados paginados
- **👤 Perfil** - Información del usuario y configuraciones

## 👨‍💻 Información del Desarrollador

**Alejandro González Romero**
- 📧 **Email**: gonzalez.romero.alejandroo@gmail.com
- 🐙 **GitHub**: [@AlejandroRomero17](https://github.com/AlejandroRomero17)
- 💼 **LinkedIn**: [Alejandro González Romero](https://www.linkedin.com/in/alejandrogonzalezromero17)
- 🌐 **Portfolio**: [alejandroromero.dev](https://alejandroromero.dev)

- **Conocimientos técnicos sólidos** en React/Next.js y TypeScript
- **Capacidad de integración** con APIs REST
- **Habilidades de diseño UX/UI** modernas
- **Buenas prácticas** de desarrollo frontend
- **Código limpio y mantenible** con arquitectura escalable

## 🙏 Agradecimientos

- **Platzi** - Por proporcionar una API completa y gratuita
- **Vercel** - Por la plataforma de deployment optimizada
- **Radix UI** - Por los primitives accesibles y de calidad
- **Next.js Team** - Por un framework excepcional

---

## 📝 Notas Técnicas

### Decisiones de Arquitectura
- **App Router vs Pages Router**: Se eligió App Router por ser la opción más moderna y recomendada
- **Context vs Redux**: Context API para simplicidad, con TanStack Query para server state
- **CSS-in-JS vs TailwindCSS**: Tailwind por productividad y consistencia
- **Client Components vs Server Components**: Hybrid approach para optimizar performance

---

⭐ **¡Gracias por revisar este proyecto!** Si tienes alguna pregunta o sugerencia, no dudes en contactarme.
