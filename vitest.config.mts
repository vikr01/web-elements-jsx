import { createRequire } from 'module';
import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
const require = createRequire(import.meta.url);

export default defineConfig({
	test: {
		environment: 'jsdom',
		exclude: [
			"./lib",
			...configDefaults.exclude
		],
	},
	plugins: [tsconfigPaths()],
});
