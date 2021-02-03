module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};
{
  "extends": "airbnb",
  "parser": "babel-eslint", // This line is required to fix "unexpected token" errors
  "rules": {
      "indent": ["warn", 4],
      "react/jsx-indent": ["warn", 4, { "checkAttributes": true}],
      "react/react-in-jsx-scope": "off",
      "react/destructuring-assignment": "off",
      "no-nested-ternary": "warn",
      "react/prop-types": "warn"
  }
}