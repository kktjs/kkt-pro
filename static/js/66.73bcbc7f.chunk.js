"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[66],{3066:function(n,e,r){r.r(e),e.default={components:{},data:{},source:"## \u4ee3\u7406\n\n**\u4ee3\u7406**\u4e5f\u79f0\u7f51\u7edc\u4ee3\u7406\uff0c\u662f\u4e00\u79cd\u7279\u6b8a\u7684\u7f51\u7edc\u670d\u52a1\uff0c\u5141\u8bb8\u4e00\u4e2a\u7ec8\u7aef\uff08\u4e00\u822c\u4e3a\u5ba2\u6237\u7aef\uff09\u901a\u8fc7\u8fd9\u4e2a\u670d\u52a1\u4e0e\u53e6\u4e00\u4e2a\u7ec8\u7aef\uff08\u4e00\u822c\u4e3a\u670d\u52a1\u5668\uff09\u8fdb\u884c\u975e\u76f4\u63a5\u7684\u8fde\u63a5\u3002- [\u7ef4\u57fa\u767e\u79d1](https://zh.wikipedia.org/wiki/\u4ee3\u7406\u670d\u52a1\u5668)\n\n## \u4ee3\u7406\u914d\u7f6e\u8bf4\u660e\n\n\u5728\u9879\u76ee\u5f00\u53d1\uff08dev\uff09\u4e2d\uff0c\u6240\u6709\u7684\u7f51\u7edc\u8bf7\u6c42\uff08\u5305\u62ec\u8d44\u6e90\u8bf7\u6c42\uff09\u90fd\u4f1a\u901a\u8fc7\u672c\u5730\u7684 server \u505a\u54cd\u5e94\u5206\u53d1\uff0c\u6211\u4eec\u901a\u8fc7\u4f7f\u7528 [mocker-api](https://github.com/jaywcjlove/mocker-api) \u4e2d\u95f4\u4ef6\uff0c\u6765\u4ee3\u7406\u6307\u5b9a\u7684\u8bf7\u6c42\u5230\u53e6\u4e00\u4e2a\u76ee\u6807\u670d\u52a1\u5668\u4e0a\u3002\u5982\u8bf7\u6c42 `fetch('/api/access/grant')` \u6765\u53d6\u5230\u8fdc\u7a0b `http://10.10.101.96:8899/emt/` \u7684\u6570\u636e\u3002\n\n\u8981\u5b9e\u73b0\u4e0a\u8ff0\u7684\u9700\u6c42\u6211\u4eec\u53ea\u9700\u8981\u5728\u914d\u7f6e\u6587\u4ef6\u4e2d\u4f7f\u7528 proxy \u914d\u7f6e\uff1a\n\n```ts\n// mocker/index.ts\nconst proxy = {\n  // mocker \u83b7\u53d6\u7528\u6237\u4fe1\u606f\u63a5\u53e3\n  'GET /api/user': { id: 1, username: 'kenny', sex: 6 },\n  'POST /api/user': { id: 1, username: 'kenny', sex: 6 },\n  /** \u7528\u4e8e\u5f00\u53d1\u7684\u4ee3\u7406\u670d\u52a1\uff0c\u4fdd\u6301\u4ee3\u7406\u670d\u52a1 host \u7684\u503c\u4e3a\u672c\u673a\u5f00\u53d1 IP\uff0c\u5426\u5219\u4e3a\u4ee3\u7406\u670d\u52a1 IP */\n  _proxy: {\n    changeHost: false,\n    /** \u7528\u4e8e\u5f00\u53d1\u7684\u4ee3\u7406\u670d\u52a1 */\n    proxy: {\n      '/api/access/auth': 'http://10.10.101.96:8899/emt/',\n    },\n  }\n};\n\nmodule.exports = proxy;\n```\n\n## \u76ee\u5f55\u6587\u4ef6\u7ea6\u5b9a\n\n\u7ea6\u5b9a `./mocker/index.js`\x3c!--rehype:style=color:white;background:#00b86c;--\x3e \u6587\u4ef6\u4e3a `mock` \u5165\u53e3\u6587\u4ef6\uff0c\u4f8b\u5982\u8fd9\u6837\u7684\u76ee\u5f55\u7ed3\u6784\uff1a\n\n```bash {4}\n.\n\u251c\u2500\u2500 src\n\u251c\u2500\u2500 mocker\n\u2502\xa0\xa0 \u2514\u2500\u2500 index.ts       # \u914d\u7f6e\u4ee3\u7406\n```\n\n\u5728\u6b64\u6587\u4ef6\u4e2d\u4e5f\u53ef\u4ee5\u7528\u4e8e**\u4ee3\u7406**\u7684\u914d\u7f6e\n\n## \u914d\u7f6e\u4ee3\u7406\n\n\u5728\u7ea6\u5b9a `./mocker/index.ts`\x3c!--rehype:style=color:white;background:#00b86c;--\x3e \u6587\u4ef6\u4e2d\u6dfb\u52a0 `_proxy` \u4ee3\u7406\u914d\u7f6e\uff0c\u5728\u6b64\u914d\u7f6e\u652f\u6301**\u70ed\u66f4\u65b0**\uff0c\u4e0d\u7528\u91cd\u542f\u670d\u52a1\u3002\n\n```ts\nmodule.exports = {\n  _proxy: {\n    proxy: {\n      // \u5c06\u8def\u5f84\u5b57\u7b26\u4e32\uff08\u4f8b\u5982 /user/:name\uff09\u8f6c\u6362\u4e3a\u6b63\u5219\u8868\u8fbe\u5f0f\u3002\n      // https://www.npmjs.com/package/path-to-regexp\n      '/repos/(.*)': 'https://api.github.com/',\n      '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',\n      '/api/repos/(.*)': 'http://127.0.0.1:3721/'\n    },\n    // \u91cd\u5199\u76ee\u6807 url \u8def\u5f84\u3002 \u5bf9\u8c61\u952e\u5c06\u7528\u4f5c\u6b63\u5219\u8868\u8fbe\u5f0f\u4ee5\u5339\u914d\u8def\u5f84\n    // https://github.com/jaywcjlove/mocker-api/issues/62\n    pathRewrite: {\n      '^/api/repos/': '/repos/',\n    },\n    // \u4fee\u6539 host \u9009\u9879\uff0c\u4e3a\u4ee3\u7406\u670d\u52a1\u7684 IP \u8bbe\u4e3a false \u7981\u7528\u8fd9\u4e00\u529f\u80fd\n    changeHost: false,\n    // \u4fee\u6539 http-proxy \u9009\u9879\n    httpProxy: {\n      options: {\n        ignorePath: true,\n      },\n      listeners: {\n        proxyReq: function (proxyReq, req, res, options) {\n          console.log('proxyReq');\n        },\n      },\n    },    \n  },\n};\n```\n\n## \u7ea6\u5b9a\u4ee3\u7406\u914d\u7f6e\n\n\u5728 `src` \u76ee\u5f55\u4e2d\u4e5f\u5b58\u5728\u7ea6\u5b9a\u4ee3\u7406\u914d\u7f6e `src/setupProxy.js`\x3c!--rehype:style=color:white;background:#00b86c;--\x3e \u4e0b\u5efa\u7acb\u6587\u4ef6\uff0c\u5982\u679c\u4ee3\u7406\u9009\u9879\u4e0d\u591f\u7075\u6d3b\uff0c\u60a8\u53ef\u4ee5\u76f4\u63a5\u8bbf\u95ee **Express** \u5e94\u7528\u7a0b\u5e8f\u5b9e\u4f8b\u5e76\u8fde\u63a5\u81ea\u5df1\u7684\u4ee3\u7406\u4e2d\u95f4\u4ef6\u3002\n\n- \u4e0d\u63a8\u8350\uff1a~~`src/setupProxy.js`~~\uff0c\u4f46\u662f\u66f4\u52a0\u7075\u6d3b\uff0c\u5982\u679c\u4ee3\u7406\u9009\u9879\u4e0d\u591f\u7075\u6d3b\uff0c\u53ef\u7ed3\u5408\u5b83\u4e00\u8d77\u4f7f\u7528\n- **\u63a8\u8350**\uff1a\u6a21\u62df API \u4e2d\u914d\u7f6e\u4ee3\u7406\uff0c`./mocker/index.js`\x3c!--rehype:style=color:white;background:#00b86c;--\x3e \u4e2d\u914d\u7f6e\uff0c\u652f\u6301\u70ed\u66f4\u65b0\n\n```bash {3}\n.\n\u251c\u2500\u2500 src\n\u2502\xa0\xa0 \u2514\u2500\u2500 setupProxy.js  # \u914d\u7f6e\u4ee3\u7406\n```\n\n```bash\n$ npm install http-proxy-middleware --save\n$ # or\n$ yarn add http-proxy-middleware\n```\n\n\u63a5\u4e0b\u6765\uff0c\u521b\u5efa **`src/setupProxy.js`** \u5e76\u5728\u5176\u4e2d\u653e\u7f6e\u4ee5\u4e0b\u5185\u5bb9\uff1a\n\n```ts\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nmodule.exports = function(app) {\n  // ...\n};\n```\n\n\u60a8\u73b0\u5728\u53ef\u4ee5\u6839\u636e\u9700\u8981\u6ce8\u518c\u4ee3\u7406\u4e86\uff01\u4e0b\u9762\u662f\u4f7f\u7528\u4e0a\u8ff0 **http-proxy-middleware** \u7684\u793a\u4f8b\uff1a\n\n```ts\nimport express from 'express';\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nmodule.exports = function(app: express.Application) {\n  app.use(\n    '/api',\n    createProxyMiddleware({\n      target: 'http://localhost:5000',\n      changeOrigin: true,\n    })\n  );\n};\n```\n\n- \u6ce8\u610f\uff1a\u60a8\u4e0d\u9700\u8981\u5728\u4efb\u4f55\u5730\u65b9\u5bfc\u5165\u6b64\u6587\u4ef6\u3002\u5f53\u60a8\u542f\u52a8\u5f00\u53d1\u670d\u52a1\u5668\u65f6\uff0c\u5b83\u4f1a\u81ea\u52a8\u6ce8\u518c\u3002\n- \u6ce8\u610f\uff1a\u6b64\u6587\u4ef6\u4ec5\u652f\u6301 Node \u7684 JavaScript \u8bed\u6cd5\u3002\u786e\u4fdd\u53ea\u4f7f\u7528\u53d7\u652f\u6301\u7684\u8bed\u8a00\u529f\u80fd\uff08\u5373\u4e0d\u652f\u6301~~Flow~~\u3001~~ES~~\u6a21\u5757\u7b49\uff09\u3002\n- \u6ce8\u610f\uff1a\u5c06\u8def\u5f84\u4f20\u9012\u7ed9\u4ee3\u7406\u51fd\u6570\u5141\u8bb8\u60a8\u5728\u8def\u5f84\u4e0a\u4f7f\u7528**\u901a\u914d\u7b26** \u548c/\u6216 \u6a21\u5f0f\u5339\u914d\uff0c\u8fd9\u6bd4\u5feb\u901f\u8def\u7531\u5339\u914d\u66f4\u7075\u6d3b\u3002\n\n\u4f7f\u7528 `.kktprc.ts` \u540c\u6837\u652f\u6301\u76f4\u63a5\u8bbf\u95ee **Express** \u5e94\u7528\u7a0b\u5e8f\n\n```javascript\n// .kktprc.ts\nimport type { WebpackConfiguration, LoaderConfOptions } from 'kkt';\nimport express from 'express';\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nexport default {\n  // ...\n  overrideWebpack:(conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions | undefined)=>{\n    conf.proxySetup = (app: express.Application) => {\n      app.use('/api', createProxyMiddleware({\n        target: 'http://localhost:5000',\n        changeOrigin: true,\n      }));\n    };\n    return conf;\n  }\n}\n```\n\u6216\u8005\u76f4\u63a5\u4f7f\u7528`proxySetup`\u6765\u914d\u7f6e\n```ts\n// .kktprc.ts\nimport express from 'express';\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nexport default {\n  // ...\n  proxySetup: (app: express.Application) => {\n    app.use('/api', createProxyMiddleware({\n      target: 'http://localhost:5000',\n      changeOrigin: true,\n    }));\n  }\n}\n```\n\n## \u4fee\u6539\u7ea6\u5b9a mocker \u5165\u53e3\u914d\u7f6e\n\n\u53ef\u4ee5\u5728 `.kktprc.ts`\x3c!--rehype:style=color:white;background:#00b86c;--\x3e \u4fee\u6539\u9ed8\u8ba4\u7ea6\u5b9a [`mock`](https://www.npmjs.com/package/mocker-api) \u5165\u53e3\u914d\u7f6e\u548c\u4ee3\u7406\n\n```ts\n// .kktprc.ts\nimport express from 'express';\nimport type { WebpackConfiguration, LoaderConfOptions } from 'kkt';\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nconst proxySetup = (app: express.Application) => {\n  /** \u652f\u6301\u76f4\u63a5\u8bbf\u95ee Express \u5e94\u7528\u7a0b\u5e8f */\n  app.use('/api', createProxyMiddleware({\n    target: 'http://localhost:5000',\n    changeOrigin: true,\n  }));\n  /** Mocker API Options */\n  return {\n    path: path.resolve('./mocker/index.js'),\n    option: {\n      proxy: {\n        '/repos/(.*)': 'https://api.github.com/',\n      },\n      changeHost: false,\n    }\n  }\n}\n\n/**\n * \ud83d\udea7\ud83d\udea7\ud83d\udea7 \u5bf9\u4e8e webpack \u4e0d\u4e86\u89e3\u7684\uff0c\u4e0d\u5efa\u8bae\u4f7f\u7528\u6b64\u914d\u7f6e \ud83d\udea7\ud83d\udea7\ud83d\udea7\n */\nexport default {\n  // ...\n  overrideWebpack:(conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions | undefined)=>{\n    // \u7f16\u8bd1\u7528\u4e8e\u5f00\u53d1\u6216\u751f\u4ea7\u7684 React \u5e94\u7528\u7a0b\u5e8f\u65f6\u8981\u4f7f\u7528\u7684 Webpack \u914d\u7f6e\n    // ...\u6dfb\u52a0\u4f60\u7684 webpack \u914d\u7f6e\n    conf.proxySetup = proxySetup;\n    return conf;\n  }\n}\n```\n\n## License\n\n[MIT \xa9 Kenny Wong](https://github.com/jaywcjlove)"}}}]);
//# sourceMappingURL=66.73bcbc7f.chunk.js.map