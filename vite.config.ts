import { defineConfig } from 'vitest/config'
import tsconfigPatchs from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPatchs()],
})
