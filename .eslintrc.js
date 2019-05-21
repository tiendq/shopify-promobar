module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jquery": true,
    "node": true
  },
  "extends": [
    "eslint:recommended", // eslint
    "plugin:import/errors", // eslint-plugin-import
    "plugin:import/warnings", // eslint-plugin-import
    "plugin:react/recommended" // eslint-plugin-react
  ],
  "globals": {
    "ShopifyApp": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "react" // eslint-plugin-react
  ],
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1,
    "react/jsx-uses-vars": 1,
    "react/prop-types": 1
  }
};
