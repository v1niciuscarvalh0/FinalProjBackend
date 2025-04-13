import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: {
            js,
        },
        extends: ["js/recommended"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                myCustomGlobal: "readonly",
            },
        },
        rules: {
            "object-curly-spacing": 0,
            "new-cap": 0,
            "space-before-function-paren": 0,
            "linebreak-style": [ "error", "unix" ],
            "indent": [ "error", 4]
        },
		
    },
]);