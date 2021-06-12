module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ["../../.eslintrc.json"],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
   },
   plugins: ["react", "@typescript-eslint"],
   rules: {
      "react/jsx-filename-extension": [
         "warn",
         {
            extensions: [".jsx", ".tsx"],
         },
      ],
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
   },
};
