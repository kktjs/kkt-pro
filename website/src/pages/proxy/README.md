## 代理

**代理**也称网络代理，是一种特殊的网络服务，允许一个终端（一般为客户端）通过这个服务与另一个终端（一般为服务器）进行非直接的连接。- [维基百科](https://zh.wikipedia.org/wiki/代理服务器)

## 代理配置说明

在项目开发（dev）中，所有的网络请求（包括资源请求）都会通过本地的 server 做响应分发，我们通过使用 [mocker-api](https://github.com/jaywcjlove/mocker-api) 中间件，来代理指定的请求到另一个目标服务器上。如请求 `fetch('/api/access/grant')` 来取到远程 `http://10.10.101.96:8899/emt/` 的数据。

要实现上述的需求我们只需要在配置文件中使用 proxy 配置：

```ts
// mocker/index.ts
const proxy = {
  // mocker 获取用户信息接口
  'GET /api/user': { id: 1, username: 'kenny', sex: 6 },
  'POST /api/user': { id: 1, username: 'kenny', sex: 6 },
  /** 用于开发的代理服务，保持代理服务 host 的值为本机开发 IP，否则为代理服务 IP */
  _proxy: {
    changeHost: false,
    /** 用于开发的代理服务 */
    proxy: {
      '/api/access/auth': 'http://10.10.101.96:8899/emt/',
    },
  }
};

module.exports = proxy;
```

## 目录文件约定

约定 `./mocker/index.js`<!--rehype:style=color:white;background:#00b86c;--> 文件为 `mock` 入口文件，例如这样的目录结构：

```bash {4}
.
├── src
├── mocker
│   └── index.ts       # 配置代理
```

在此文件中也可以用于**代理**的配置

## 配置代理

在约定 `./mocker/index.ts`<!--rehype:style=color:white;background:#00b86c;--> 文件中添加 `_proxy` 代理配置，在此配置支持**热更新**，不用重启服务。

```ts
module.exports = {
  _proxy: {
    proxy: {
      // 将路径字符串（例如 /user/:name）转换为正则表达式。
      // https://www.npmjs.com/package/path-to-regexp
      '/repos/(.*)': 'https://api.github.com/',
      '/:owner/:repo/raw/:ref/(.*)': 'http://127.0.0.1:2018',
      '/api/repos/(.*)': 'http://127.0.0.1:3721/'
    },
    // 重写目标 url 路径。 对象键将用作正则表达式以匹配路径
    // https://github.com/jaywcjlove/mocker-api/issues/62
    pathRewrite: {
      '^/api/repos/': '/repos/',
    },
    // 修改 host 选项，为代理服务的 IP 设为 false 禁用这一功能
    changeHost: false,
    // 修改 http-proxy 选项
    httpProxy: {
      options: {
        ignorePath: true,
      },
      listeners: {
        proxyReq: function (proxyReq, req, res, options) {
          console.log('proxyReq');
        },
      },
    },    
  },
};
```

## 约定代理配置

在 `src` 目录中也存在约定代理配置 `src/setupProxy.js`<!--rehype:style=color:white;background:#00b86c;--> 下建立文件，如果代理选项不够灵活，您可以直接访问 **Express** 应用程序实例并连接自己的代理中间件。

- 不推荐：~~`src/setupProxy.js`~~，但是更加灵活，如果代理选项不够灵活，可结合它一起使用
- **推荐**：模拟 API 中配置代理，`./mocker/index.js`<!--rehype:style=color:white;background:#00b86c;--> 中配置，支持热更新

```bash {3}
.
├── src
│   └── setupProxy.js  # 配置代理
```

```bash
$ npm install http-proxy-middleware --save
$ # or
$ yarn add http-proxy-middleware
```

接下来，创建 **`src/setupProxy.js`** 并在其中放置以下内容：

```ts
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // ...
};
```

您现在可以根据需要注册代理了！下面是使用上述 **http-proxy-middleware** 的示例：

```ts
import express from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app: express.Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

- 注意：您不需要在任何地方导入此文件。当您启动开发服务器时，它会自动注册。
- 注意：此文件仅支持 Node 的 JavaScript 语法。确保只使用受支持的语言功能（即不支持~~Flow~~、~~ES~~模块等）。
- 注意：将路径传递给代理函数允许您在路径上使用**通配符** 和/或 模式匹配，这比快速路由匹配更灵活。

使用 `.kktprc.ts` 同样支持直接访问 **Express** 应用程序

```javascript
// .kktprc.ts
import type { WebpackConfiguration, LoaderConfOptions } from 'kkt';
import express from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

export default {
  // ...
  overrideWebpack:(conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions | undefined)=>{
    conf.proxySetup = (app: express.Application) => {
      app.use('/api', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      }));
    };
    return conf;
  }
}
```
或者直接使用`proxySetup`来配置
```ts
// .kktprc.ts
import express from 'express';
const { createProxyMiddleware } = require('http-proxy-middleware');

export default {
  // ...
  proxySetup: (app: express.Application) => {
    app.use('/api', createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }));
  }
}
```

## 修改约定 mocker 入口配置

可以在 `.kktprc.ts`<!--rehype:style=color:white;background:#00b86c;--> 修改默认约定 [`mock`](https://www.npmjs.com/package/mocker-api) 入口配置和代理

```ts
// .kktprc.ts
import express from 'express';
import type { WebpackConfiguration, LoaderConfOptions } from 'kkt';
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxySetup = (app: express.Application) => {
  /** 支持直接访问 Express 应用程序 */
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
  /** Mocker API Options */
  return {
    path: path.resolve('./mocker/index.js'),
    option: {
      proxy: {
        '/repos/(.*)': 'https://api.github.com/',
      },
      changeHost: false,
    }
  }
}

/**
 * 🚧🚧🚧 对于 webpack 不了解的，不建议使用此配置 🚧🚧🚧
 */
export default {
  // ...
  overrideWebpack:(conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions | undefined)=>{
    // 编译用于开发或生产的 React 应用程序时要使用的 Webpack 配置
    // ...添加你的 webpack 配置
    conf.proxySetup = proxySetup;
    return conf;
  }
}
```

### Contributors

<a href="https://github.com/kktjs/kkt-pro/graphs/contributors">
  <img src="https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg" />
</a>

### License

Licensed under the MIT License.