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
    {   code:`
    import {ObjectId} from 'mongodb';
    const equalOk = (id1: ObjectId | string | null, id2: string | null) => {
                return id1 === id2;
            }`
    }],
  invalid: [
    {
    code:`
    import {ObjectId} from 'mongodb';
    const equalBad = (id1: ObjectId | null, id2: ObjectId | 2 | false) => {
      return id1 === id2;
    }`,
    errors:[{messageId:"noTripleEqualityCheck"}]
  }
],
});