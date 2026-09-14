import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        exclude: ['**/node_modules/**'],
        setupFiles: [`./src/test/setup.js`],
        globalSetup: ['./src/test/globalSetup.js'],
        browser: {
            provider: playwright(),
            enabled: true,
            headless: true,
            api: {
                port: 65000,
            },
            instances: [{ browser: 'chromium' }],
        },
    },
})
