import js from "@eslint/js"
import pluginVue from "eslint-plugin-vue"

export default [
    {
        name: "app/files-to-lint",
        files: ["**/*.{js,mjs,jsx,vue}"],
    },

    {
        name: "app/files-to-ignore",
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
    },

    js.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        rules: {
            "quotes": [2, "double"],
            "semi": [2, "never"],
            "indent": [2, 4]
        }
    }
]
