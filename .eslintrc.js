module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-unused-vars": ["errors", { argsIgnorePattern: "next" }],
    quotes: [2, "single", { avoidEscape: true }]
  }
};
