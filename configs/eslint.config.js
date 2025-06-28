const globals = require("globals");
const { defineConfig } = require("eslint/lib/eslint/config");
const js = require("@eslint/js");

module.exports = defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            js: js,
        },
        extends: [js.configs.recommended],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                ...globals.browser,
                ...globals.node,
                myCustomGlobal: "readonly",
            },
        },
        rules: {
            "object-curly-spacing": "off",
            "new-cap": "off",
            "space-before-function-paren": "off",
            "linebreak-style": [ "error", "unix" ],
            "indent": [ "error", 4]
        },
        
    },
]);