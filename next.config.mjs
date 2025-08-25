/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    
    // Configuración para imports dinámicos y dependencias externas
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Para builds del servidor, excluir GSAP y Lenis
            config.externals = config.externals || [];
            config.externals.push('gsap', '@studio-freight/lenis');
        }
        
        return config;
    },
}

export default nextConfig;