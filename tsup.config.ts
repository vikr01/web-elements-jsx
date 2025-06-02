import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src", "!src/**/__tests__/**", "!src/**/*.test.*"],
  outDir: "lib",
  format: ["esm"],
  dts: true,

  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },

  bundle: false,
  clean: true,
  minify: false,
  sourcemap: false,
  skipNodeModulesBundle: true,
  splitting: false,
});
