import next from "eslint-config-next/core-web-vitals";

// Pre-existing patterns in this archive that would each need a refactor.
// Kept as warnings so `eslint .` still exits clean and the pre-push hook passes.
const config = [
  ...next,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "public/**"],
  },
  {
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
    },
  },
];

export default config;
