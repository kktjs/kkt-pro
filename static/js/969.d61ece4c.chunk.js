"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[969],{7969:function(n,t,e){e.r(t),t.default={components:{},data:{},source:"## \u72b6\u6001\u7ba1\u7406\n\n`kktp`\u5185\u7f6e\u63d2\u4ef6,\u662f\u4ee5`@rematch/core`\u5305\u4e3a\u57fa\u7840\u8fdb\u884c\u81ea\u52a8\u6536\u96c6\u72b6\u6001\u7ba1\u7406\u3002\u4f7f\u7528\u6b64\u63d2\u4ef6\u9700\u8981\u5b89\u88c5`@rematch/core`\u548c`@rematch/loading`\u5305\u3002\n\n## \u53c2\u6570\n\n```ts\nexport interface ModelspluginProps {\n  /**\u81ea\u52a8\u751f\u6210\u6587\u4ef6\u76ee\u5f55\u540d\u79f0*/\n  cacheDirName?: string;\n}\n```\n\n## models ts \u5b9e\u4f8b\n\n```ts\n// src/models/demo.ts\nexport interface DemoState {\n  test?: string;\n}\n\nconst demo = {\n  name: 'demo',\n  state: {\n    test: '\u6d4b\u8bd5State',\n  },\n  reducers: {\n    updateState: (state: DemoState, payload: DemoState): DemoState => ({\n      ...state,\n      ...payload,\n    }),\n  },\n  effects: (dispatch) => {\n    const { demo } = dispatch;\n    return {\n      async verify() {\n        demo.updateState({ test: '\u6d4b\u8bd522' });\n      },\n    }\n  },\n};\nexport default demo;\n\n\n// src/pages/ceshi.tsx\nimport { RootState, useSelector, dispatch } from '@kkt/pro';\nconst Ceshi = () => {\n  // \u83b7\u53d6demo\u6570\u636e\n  const store = useSelector((store: RootState) => store.demo);\n  // Dispatch\n  const dispatch = useDispatch<Dispatch>();\n\n  const click = () => {\n    dispatch({\n      type: 'demo/verify',\n      payload: {}\n    })\n  }\n  return <div />\n}\nexport default Ceshi;\n```\n\n## \u81ea\u52a8\u6536\u96c6\u6587\u4ef6\u5f15\u5165\n\n1. \u7ea6\u5b9a`src/**/models/**/*.(js|ts)`\u6587\u4ef6\n\n## `kktp`\u914d\u7f6e\u6587\u4ef6\n\n```ts\n// .kktprc.ts\nexport default {\n  // ...\n  initModel:true,\n}\n```\n\n### Contributors\n\n<a href=\"https://github.com/kktjs/kkt-pro/graphs/contributors\">\n  <img src=\"https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg\" />\n</a>\n\n### License\n\nLicensed under the MIT License."}}}]);
//# sourceMappingURL=969.d61ece4c.chunk.js.map