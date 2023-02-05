import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import template from '@babel/template';
import generate from '@babel/generator';
import { getAst, getTSNode, getVarInit, getJSX, getToUpperCase, toPascalCase } from './utils';
/**
 * 1. 判断路由文件
 */
export const checkRoutersFile = (content: string) => {
  let isArr = false;
  let code = '';
  const ast = getAst(content);
  let isImportReact = false;
  traverse(ast, {
    ExportDefaultDeclaration(path: NodePath<t.ExportDefaultDeclaration>) {
      let node = path.node.declaration;
      node = getTSNode(node);
      node = getVarInit(node, path);
      node = getTSNode(node);
      // 如果 node 是一个数组
      if (t.isArrayExpression(node)) {
        isArr = true;
      }
    },
    ImportDefaultSpecifier(path) {
      const node = path.node;
      if (t.isImportDefaultSpecifier(node)) {
        if (node.local.name === 'React') {
          isImportReact = true;
        }
      }
    },
  });
  code = generate(ast).code;
  return {
    /**判断默认导出的数据是否是数组*/
    isArr,
    /**判断是否已经导入react*/
    isImportReact,
    /**code代码*/
    code,
  };
};

/**
 * 1. 解析路由中的图标 和 `navigate` 跳转进行解析
 */
export const analysisRoutersIcon = (content: string) => {
  const ast = getAst(content);
  const iconsList: { name: string; newName: string }[] = [];
  traverse(ast, {
    ObjectProperty(path) {
      // 判断父级的父级是否是数组 如果是数组则进行转换
      if (t.isArrayExpression(path.parentPath.parent)) {
        const { node } = path;
        // 对icon图标进行处理
        if (
          (t.isStringLiteral(node.key) && node.key.value === 'icon') ||
          (t.isIdentifier(node.key) && node.key.name === 'icon')
        ) {
          if (t.isStringLiteral(node.value)) {
            const valus = node.value.value;
            const newValue = getToUpperCase(valus) + `_Icon`;
            node.value = getJSX(`${newValue}`);
            iconsList.push({ name: valus, newName: newValue });
          }
        }
      }
    },
  });
  const jsonCode = generate(ast).code;
  const newIcons: { name: string; newName: string }[] = [];
  iconsList.forEach((item) => {
    const fid = newIcons.find((it) => it.name === item.name);
    if (!fid) {
      newIcons.push({ ...item });
    }
  });
  return {
    /**图标集合*/
    icons: newIcons,
    /**code代码*/
    code: jsonCode,
  };
};

/**
 * 1. 解析地址实现 router 6 的 loader 功能
 */
export const analysisRoutersLoader = (content: string) => {
  const ast = getAst(content);
  const importLazy: Record<string, string> = {};
  let importLazyString = '';
  traverse(ast, {
    ObjectProperty(path) {
      // 判断父级的父级是否是数组 如果是数组则进行转换
      if (t.isArrayExpression(path.parentPath.parent)) {
        const { node } = path;
        // 对组件进行处理
        if (
          (t.isStringLiteral(node.key) && node.key.value === 'component') ||
          (t.isIdentifier(node.key) && node.key.name === 'component') ||
          (t.isStringLiteral(node.key) && node.key.value === 'element') ||
          (t.isIdentifier(node.key) && node.key.name === 'element')
        ) {
          if (t.isStringLiteral(node.value)) {
            const valus = node.value.value;
            // 判断是否是 @/ 开头的地址
            if (/^@\/.+/.test(valus)) {
              const ComponentName = 'Components' + toPascalCase(valus.replace(/^@/, '').split('/').join(''));
              node.value = getJSX(`${ComponentName}`);
              importLazy[ComponentName] = valus;
              importLazyString += `\nimport ${ComponentName} from "${valus}";\n`;
              if (t.isObjectExpression(path.parent)) {
                path.parent.properties.push(
                  t.objectProperty(t.identifier('loader'), t.identifier(`${ComponentName}.loader`)),
                );
              }
            }
          }
        }
        // 对 navigate 进行转换
        if (
          (t.isStringLiteral(node.key) && node.key.value === 'navigate') ||
          (t.isIdentifier(node.key) && node.key.name === 'navigate')
        ) {
          if (t.isStringLiteral(node.value)) {
            const valus = node.value.value;
            const fn = template(valus);
            const newValue = fn();
            if (t.isExpressionStatement(newValue)) {
              node.value = newValue.expression;
            }
          }
        }
      }
    },
  });
  const jsonCode = generate(ast).code;

  return {
    /**code代码*/
    code: jsonCode,
    importLazy,
    importLazyString,
  };
};
