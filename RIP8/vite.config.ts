import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
    base: "/frontend",
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8000"
            }
        },
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
}