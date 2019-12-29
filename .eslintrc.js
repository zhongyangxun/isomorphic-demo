module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [
    "airbnb-base",
    // Fix "'React' is defined but never used".
    "plugin:react/recommended"
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "comma-dangle": ["error", "never"],
    "no-plusplus": "off",
    "no-underscore-dangle": "off",
    "no-alert": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  },
  "settings": {
    "import/resolver": {
      alias: {
        map: [
          ["pages", "./src/pages"],
          ["components", "./src/components"],
          ["store", "./src/store"]
        ]
      }
    }
  }
};
