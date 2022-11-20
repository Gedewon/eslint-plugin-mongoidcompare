import { ESLintUtils } from '@typescript-eslint/utils';
import rule from './no-triple-equality-check';
import path from 'path'

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: path.join(__dirname,'../../'),
  },
});

ruleTester.run('no-triple-equality-check', rule, {
  valid: [
    {   code:`const equalOk = (id1: ObjectId | string | null, id2: string | null) => {
                return id1 === id2;
            }`
    }],
  invalid: [
    {

    code:`const equalOk = (id1: ObjectId | string | null, id2: string | null) => {
            return id1 === id2;
         }`,
    errors:[{messageId:"noTripleEqualityCheck"}]
  }

],
});