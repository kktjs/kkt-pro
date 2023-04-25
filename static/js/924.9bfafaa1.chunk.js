"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[924],{9924:function(n,t,e){e.r(t),t.default={components:{},data:{},source:"## \u8def\u7531\u914d\u7f6e\n\n`kktp`\u5185\u7f6e\u63d2\u4ef6\uff0c\u7528\u4e8e\u81ea\u52a8\u8fdb\u884c\u751f\u6210\u8def\u7531\u914d\u7f6e\u3002\u4f7f\u7528\u6b64\u63d2\u4ef6\u9700\u8981\u5b89\u88c5`react-router`\u548c`react-router-dom`\u4f9d\u8d56\u5305\n\n## \u53c2\u6570\n\n```ts\nexport interface RouterPluginProps {\n  /**\u5904\u7406\u56fe\u6807\u83dc\u5355\u4e2d\u56fe\u6807\u5f15\u5165\u95ee\u9898*/\n  analysisRoutersIcon?: (icons: { name: string; newName: string }[]) => string;\n  /**\n   * @description \u5728src\u76ee\u5f55\u4e0b\u751f\u6210\u7684\u4e34\u65f6\u6587\u4ef6\u5939\u540d\u79f0\n   * @default .kktp\n   * */\n  cacheDirName?: string;\n  /**\n   * @description \u8def\u7531\u7c7b\u578b\n   * @default \"hash\"\n   */\n  routesType?: 'browser' | 'hash' | 'memory';\n  /** \u8def\u7531\u6743\u9650\u540d\u79f0\uff0c\u9ed8\u8ba4\u67e5\u627esrc\u76ee\u5f55\u4e0baccess.[js | ts]\u6587\u4ef6 */\n  accessDirName?: string;\n  /**\u9875\u9762\u52a0\u8f7dloading\u7ec4\u4ef6\u5730\u5740*/\n  fallbackElement?: string;\n  /**\u8def\u7531\u5916\u5c42\u5305\u88f9\u7ec4\u4ef6\uff0c\u53ef\u4ee5\u7528\u4e8e\u81ea\u5b9a\u4e49\u6dfb\u52a0\u8def\u7531**/\n  routesOutletElement?: string;\n  /**\u81ea\u52a8\u751f\u6210\u8def\u7531\u914d\u7f6e*/\n  autoRoutes?: boolean;\n  /**\u81ea\u52a8\u751f\u6210\u8def\u7531layout\u5e03\u5c40\u7ec4\u4ef6\u5730\u5740*/\n  outletLayout?: string;\n}\n```\n\n## \u8def\u7531\u751f\u6210\u65b9\u5f0f\n\n**1. \u901a\u8fc7\u914d\u7f6e\u8fdb\u884c\u751f\u6210\u8def\u7531**\n\n- \u7ea6\u5b9a\u6839\u76ee\u5f55\u4e0b`config/routes.(json|js|ts)`\u4e3a[\u8def\u7531\u83dc\u5355\u914d\u7f6e](https://github.com/kktjs/kkt-pro/tree/dev/packages/plugin/pro#kktproroutesprops)\n\n\n\n**2. \u81ea\u52a8\u751f\u6210\u8def\u7531**\n\n- \u7ea6\u5b9a`src/pages`\u6587\u4ef6\u5939\u4e3a\u6839\u636e\u751f\u6210\u8def\u7531\n- \u7ea6\u5b9a`src/pages/index.(js|jsx|tsx)`\u6587\u4ef6\u4e3a\u9ed8\u8ba4\u8def\u7531\n- \u7ea6\u5b9a`src/pages/**/index.(js|jsx|tsx)`\u6587\u4ef6\u4e3a\u5bf9\u5e94\u8def\u7531\u5c55\u793a\u9875\u9762\n\n## \u9875\u9762\u53c2\u6570\n\n\u5728`kktp`\u4e2d\uff0c\u9875\u9762\u5185\u7f6e\u4e86`roles`\u3001`navigate`\u3001`routes`\u3002\n\n- `roles` \u9875\u9762\u6743\u9650\uff0c`config/routes.json`\u83dc\u5355\u4e0a\u914d\u7f6e\u4e86 `roles`\uff0c\u5219\u5728\u9875\u9762\u4e0a\u83b7\u53d6\u3002\n\n- `navigate` \u8df3\u8f6c\u3002\n\n- `routes` \u8def\u7531`path=\"/\"`\u8def\u7531\u4e0b\u7684\u5b50\u96c6\u8def\u7531\u96c6\u5408\u3002\n\n```ts\nimport { KktproPageProps } from '@kkt/pro';\n\nconst Page = (props: KktproPageProps) => {\n  const { navigate, roles = [], routes = [] } = props;\n\n  return <div />\n};\nexport default Page;\n```\n\n## \u9875\u9762\u8df3\u8f6c\n\n\u9875\u9762\u4e2d\u53ef\u76f4\u63a5\u901a\u8fc7 `navigate` \u8df3\u8f6c\uff0c \u6216\u8005\u901a\u8fc7`react-router-dom`\u63d0\u4f9b\u7684 `useNavigate`\u6765\u8df3\u8f6c\u3002\n\n```ts\nimport { KktproPageProps, useNavigate } from '@kkt/pro';\n\nconst Page = (props: KktproPageProps) => {\n  const { navigate } = props;\n  // const navigate = useNavigate();\n\n  const click = () => {\n    navigate('/demo');\n  };\n\n  return <button onClick={click}>navigate</button>\n};\nexport default Page;\n```\n\n## `kktp`\u914d\u7f6e\u6587\u4ef6\n\n```ts\n// .kktprc.ts\nexport default {\n  // ...\n  initRoutes:{\n    outletLayout:\"@/layout\" // \u81ea\u52a8\u751f\u6210\u8def\u7531layout\u5e03\u5c40\u7ec4\u4ef6\u5730\u5740\n  },\n}\n```\n\n### Contributors\n\n<a href=\"https://github.com/kktjs/kkt-pro/graphs/contributors\">\n  <img src=\"https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg\" />\n</a>\n\n### License\n\nLicensed under the MIT License."}}}]);
//# sourceMappingURL=924.9bfafaa1.chunk.js.map