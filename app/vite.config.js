import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {
    defineConfig,
    loadEnv
} from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', 'VITE_');

    return {
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.jsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        server: {
            host: env.VITE_HOST || 'localhost',
            hmr: {
                host: env.VITE_HMR_HOST || 'localhost',
            },
        },
        esbuild: {
            jsx: 'automatic',
        },
    };
});
