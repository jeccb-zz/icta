var path = require("path");

module.exports = {
  "root": true,
  "extends": [
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, 'webpack.config.js')
      }
    }
  },
  "env": {
    "browser": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    }
  },
  "rules": {
    "react/no-unused-prop-types": ["error", { "skipShapeProps": true }],
    "react/forbid-prop-types": "off",
    "jsx-a11y/no-static-element-interactions": "off",
  },
}
