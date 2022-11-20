import { ESLintUtils } from '@typescript-eslint/utils';
import { RuleModule } from '@typescript-eslint/utils/dist/ts-eslint';
import * as ts from 'typescript';
import * as tsutils from 'tsutils';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const rule:RuleModule<"noTripleEqualityCheck", never[], {
  BinaryExpression(node: any): void;
}> = createRule({
  create(context) {
    return {
      BinaryExpression(node) {
        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();
        // 2. Find the backing TS node for the ES node, then that TS type
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(
          node.right,
          );
        const nodeType = checker.getTypeAtLocation(originalNode);
        // console.log(nodeType.);
        // TODO: find and check type of left and right child to equal ObjectID


      },
    };
  },
  name: 'no-triple-equality-check',
  meta: {
    docs: {
      description:
        'The rule should search the abstract syntax tree sending a warning for instances of the operator === where both the left-hand-side and right-hand-side could be ObjectId.',
      recommended: 'error',
    },
    messages: {
      noTripleEqualityCheck: `Don't use triple equality check on MongoDB id's.`,
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;