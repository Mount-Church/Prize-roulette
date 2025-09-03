// @ts-check
'use strict';

/** @type {import('prettier').Config} */
module.exports = {
  // Use single quotes instead of double quotes
  singleQuote: true,
  
  // Add a semicolon at the end of statements
  semi: true,
  
  // Use 2 spaces for indentation
  tabWidth: 2,
  
  // Use spaces instead of tabs
  useTabs: false,
  
  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures
  trailingComma: 'es5',
  
  // Print spaces between brackets in object literals
  bracketSpacing: true,
  
  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line
  bracketSameLine: false,
  
  // Always include parentheses around a sole arrow function parameter
  arrowParens: 'always',
  
  // Line width that the printer will wrap on
  printWidth: 100,
  
  // Use single quotes in JSX
  jsxSingleQuote: false,
  
  // Overrides
  overrides: [
    {
      files: '*.{json,json5,jsonc}',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.{yaml,yml}',
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
    {
      files: '*.{md,markdown,mdx}',
      options: {
        proseWrap: 'always',
        tabWidth: 2,
      },
    },
  ],
};
