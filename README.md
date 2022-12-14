# eslint-plugin-mongoidcompare


[![NPM](https://img.shields.io/npm/v/eslint-plugin-mongoidcompare.svg)](https://www.npmjs.com/package/eslint-plugin-mongoidcompare)

Custom eslint rules

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```
Since We have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project"
```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
}
```

Next, install `eslint-plugin-mongoidcompare`:

```
$ npm install eslint-plugin-mongoidcompare --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-mongoidcompare` globally.

## Usage

Add `mongoidcompare` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "mongoidcompare"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "mongoidcompare/no-triple-equality-check": 2
    }
}
```

## Supported Rules

Take a look at  [doc.md](https://github.com/Gedewon/eslint-plugin-mongoidcompare/blob/main/doc.md) to see when we would want to use this linting rule.

## Future Work 

implement fix a function that applies a [fix](https://eslint.org/docs/latest/developer-guide/working-with-rules#applying-fixes) to resolve the problem.
