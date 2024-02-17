import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      "build/**",
      "coverage/**",
      "src/env/indes.ts",
      "src/utils/get-distance-between-coordinates.ts",
      "src/domain/models/**",
    ],
  },
});
