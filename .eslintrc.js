module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-useless-escape': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        sourceType: "module",
        parser: 'babel-eslint'
    },
    globals: {
        workbox: true
    }
}
