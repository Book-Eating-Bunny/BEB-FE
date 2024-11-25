import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import google from 'eslint-config-google';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    // 무시할 파일/폴더
    ignores: ['node_modules/**', 'dist/**', 'build/**']
  },
  {
    // 검사 대상 파일
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest', // 최신 ECMAScript 지원
        sourceType: 'module', // ES 모듈 활성화
        ecmaFeatures: {
          jsx: true // JSX 활성화
        }
      }
    },
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      n: eslintPluginN,
      promise: eslintPluginPromise
    },
    rules: {
      'prettier/prettier': ['error',  {
        "endOfLine": "auto"
      }] // Prettier 규칙 강제
      ...eslintConfigPrettier.rules, // Prettier와 충돌하는 규칙 비활성화
      'react/react-in-jsx-scope': 'off', // React 17+에서는 필요 없음
      'react/jsx-uses-vars': 'error', // React 컴포넌트가 JSX에서 사용된 것으로 간주
      'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 강제
      'react-hooks/exhaustive-deps': 'warn', // Hooks 종속성 검사
      ...google.rules, // Standard 스타일 적용
      'require-jsdoc': 'off', // JSDoc 주석 비활성화
      'linebreak-style': ['error', 'windows'] // CRLF 스타일 강제
    },
    settings: {
      react: {
        version: 'detect' // React 버전 자동 감지
      }
    }
  }
];
