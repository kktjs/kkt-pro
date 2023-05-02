import { parse, ParserOptions, ParserPlugin } from '@babel/parser';
import { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import template from '@babel/template';

export const pluginsConfig: ParserPlugin[] = [
  'jsx',
  'typescript',
  'classProperties',
  'dynamicImport',
  'exportDefaultFrom',
  'exportNamespaceFrom',
  'functionBind',
  'nullishCoalescingOperator',
  'objectRestSpread',
  'optionalChaining',
  'decorators-legacy',
];

export const getAst = (content: string) => {
  const option: ParserOptions = {
    // 在严格模式下解析并允许模块声明
    sourceType: 'module',
    plugins: pluginsConfig,
  };
  return parse(content, option);
};

export type NodeFun = t.Expression | t.FunctionDeclaration | t.TSDeclareFunction | t.ClassDeclaration;

export function getVarInit(node: NodeFun, path: NodePath<t.ExportDefaultDeclaration>) {
  // 判断  默认导出变量的方式
  if (t.isIdentifier(node) && path.scope.hasBinding(node.name)) {
    // 导出变量的方式 从 path scope 取值 bindings 里面对应  node.name 的变量内容
    let bindingNode = path.scope.getBinding(node.name)!.path.node;
    // 判断对象类型 是否是 VariableDeclarator
    if (t.isVariableDeclarator(bindingNode)) {
      // 取 这个里面的 init 对象
      bindingNode = bindingNode.init!;
    }
    return bindingNode as NodeFun;
  }
  return node;
}

/** 使用 ts 判断*/
export function getTSNode(node: any) {
  if (t.isTSTypeAssertion(node) || t.isTSAsExpression(node)) {
    return node.expression;
  } else {
    return node;
  }
}

/** 转 首字母大写 */
export const getToUpperCase = (valus: string) => {
  return valus
    .split('-')
    .map((str) => str.replace(/^\S/, (s) => s.toUpperCase()))
    .join('');
};

export const toPascalCase = (str: string = '') =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join('');

export const getReactLazy = (path: string) => {
  // ------------------   创建 React.lazy ------------------
  // 第一步 创建 字符串外层 @/pages/TableList
  const callOne = t.callExpression(t.import(), [t.stringLiteral(path)]);
  // 第二步 创建  ArrowFunctionExpression
  const callTwo = t.arrowFunctionExpression([], callOne);

  const callThree1 = t.memberExpression(t.identifier('React'), t.identifier('lazy'));
  // 第三步，value 值
  const callThree = t.callExpression(callThree1, [callTwo]);
  // ------------------   创建 React.lazy  结束 ------------------
  return callThree;
};

export const getJSX = (name: string) => {
  const one = t.jsxOpeningElement(t.jsxIdentifier(name), [], true);
  const two = t.jsxElement(one, null, []);
  return two;
};

/**创建模板*/
export const createTemplateExpression = (value: string) => {
  const fn = template.expression({ plugins: pluginsConfig })`${value}`;
  return fn();
};

/**创建一个 ast 对象*/
export const createObjectProperty = (key: string, value: t.Expression) => {
  return t.objectProperty(t.identifier(key), value);
};
export const createSpreadElement = (key: string) => {
  return t.spreadElement(t.identifier(key));
};
/**
 * 判断值是否相等
 * **/
export const isCheckStringOrIdentifierValue = (node: t.ObjectProperty, value: string) => {
  if (
    (t.isStringLiteral(node.key) && node.key.value === value) ||
    (t.isIdentifier(node.key) && node.key.name === value)
  ) {
    return true;
  }
  return false;
};

/**获取值*/
export const getStringOrIdentifierValue = (node: t.ObjectProperty) => {
  if (t.isStringLiteral(node.value)) {
    return node.value.value;
  }
  if (t.isIdentifier(node.value)) {
    return node.value.name;
  }
  return false;
};
