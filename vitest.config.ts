// / <reference types="vitest" />
import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"

export default defineConfig(
  {
    plugins: [ vue() ],
    test: {
      environment: "happy-dom",
      open: true,
      include: [ "./packages/utils/test/**/*.{test,spec}.ts", "./packages/components/test/**/*.{test,spec}.ts" ],
    },
  }
)
