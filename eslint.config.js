import { createConfig } from "@vikr01/eslint-config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tsConfigPath = require.resolve("./tsconfig.json");

export default createConfig({
  tsConfigPath,
});
