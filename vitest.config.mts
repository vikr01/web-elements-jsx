import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		environment: 'jsdom',
		exclude: [
			"packages/*/lib",
			...configDefaults.exclude,
		],
	},

	plugins: [tsconfigPaths()],
});
