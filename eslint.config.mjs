import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-config-next already registers the jsx-a11y plugin; this turns on
  // its strict rule set.
  { rules: jsxA11y.flatConfigs.strict.rules },
  {
    // New React Compiler lint rules that arrived with the Next 16 upgrade.
    // They flag existing, working patterns (refs kept in sync during render,
    // one-off setState in mount effects). Kept visible as warnings rather
    // than rewriting the carousel and reveal logic inside a framework upgrade.
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
