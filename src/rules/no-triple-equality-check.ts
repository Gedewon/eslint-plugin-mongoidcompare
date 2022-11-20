import { ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils';
import { RuleModule } from '@typescript-eslint/utils/dist/ts-eslint';
import * as ts from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  name => `https://example.com/rule/${name}`,
);

const isBothSideMongoIdTypes = (leftNodeType:ts.Type,rightNodeType:ts.Type,checker:ts.TypeChecker):boolean=>{ 
  return (checker.typeToString(leftNodeType).search(`ObjectId`) !==-1
       && checker.typeToString(rightNodeType).search(`ObjectId`) !== -1
  );
}


const rule:TSESLint.RuleModule<"noTripleEqualityCheck", never[], {
  BinaryExpression(node: TSESTree.BinaryExpression): void;
}> = createRule({
  create(context:Readonly<
    TSESLint.RuleContext<"noTripleEqualityCheck", never[]>
>) {
    return {
      BinaryExpression(node:TSESTree.BinaryExpression) {
        
        const parserServices = ESLintUtils.getParserServices(context);
        const checker = parserServices.program.getTypeChecker();
        // 2. Find the backing TS node for the ES node, then that TS type
        const originalLeftNode = parserServices.esTreeNodeToTSNodeMap.get(
          node.left,
          );

        const originalRightNode = parserServices.esTreeNodeToTSNodeMap.get(
          node.right,
          );

        const leftNodeType = checker.getTypeAtLocation(originalLeftNode);
        const rightNodeType = checker.getTypeAtLocation(originalRightNode);
     
          if(isBothSideMongoIdTypes(leftNodeType,rightNodeType,checker)){ 
             context.report({
              node, 
              messageId: "noTripleEqualityCheck"
             })
          }
      },
    };
  },
  name: 'no-triple-equality-check',
  meta: {
    docs: {
      description:
        'The rule should search the abstract syntax tree sending a warning for instances of the operator === where both the left-hand-side and right-hand-side could be ObjectId.',
        recommended: false,
        requiresTypeChecking: false,
    },
    messages: {
      noTripleEqualityCheck: `Don't use triple equality check on MongoDB id's.`,
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});

export default rule;