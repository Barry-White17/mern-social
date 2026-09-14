import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
    plugins: [react(), tailwindcss(), jsconfigPaths()],
})
