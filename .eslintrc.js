module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['plugin:react/recommended', 'standard', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'max-len': [
            'error',
            {
                code: 130,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'brace-style': ['error', '1tbs'],
        'no-unused-vars': ['error'],
        'no-var': ['error'],
        'prefer-const': ['error']
    }
}
