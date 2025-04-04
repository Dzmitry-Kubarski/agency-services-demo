import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin
        }
    },
    {
        ignores: ['dist', 'node_modules']
    },
    { files: ['**/*.{ts,tsx}'] },
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2021
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module'
            }
        }
    },
    {
        rules: {
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            'no-console': ['error'],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-namespace': 'off',
            'linebreak-style': 0,
            '@typescript-eslint/no-empty-object-type': 'warn',
            'import/order': [
                'error',
                {
                    groups: ['external', 'builtin', 'index', 'parent', 'sibling', 'internal', 'type'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    },
                    'newlines-between': 'always-and-inside-groups'
                }
            ],
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['.././', '../../'],
                            message: 'Relative imports are not allowed.'
                        }
                    ]
                }
            ],
            ...prettierPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules
        }
    },
    {
        settings: {
            'import/resolver': {
                typescript: {
                    project: ['tsconfig.json']
                }
            }
        }
    }
]
