/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Elimina la opción experimental no soportada
  experimental: {
    // Opciones válidas en Next.js 15:
    // serverActions: true,
    // optimizePackageImports: ['package-name'],
  },
  pageExtensions: ["tsx", "jsx", "js", "ts"],

  // Opcional: Configuración para imágenes si las usas
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite todas las imágenes externas
      },
    ],
  },
};

module.exports = nextConfig;
// module.exports = {
