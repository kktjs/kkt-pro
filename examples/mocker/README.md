模拟 API 示例
====

没有入口文件，入口文件自动生成

```bash
$ npm run build # 编译
$ npm run start # 监听，开发模式
```

## 模拟 API

### 约定目录 `./mocker/index.js`

```js
const proxy = {
  /** 
   * 这是 apiMocker 的 option 参数设置，用于配置代理
   **/
  _proxy: {
    proxy: {
      '/repos/(.*)': 'https://api.github.com/',
    },
    changeHost: true,
  },
  'GET /api/user': { id: 1, username: 'kenny', sex: 6 },
};

module.exports = proxy;
```

### 约定自定义配置代理

默认约定在 `src/setupProxy.js` 下建立文件

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

### 配置中配置

```js
// 🚧 对于 webpack 不了解的，不建议使用此配置
export default (conf, env, options) => {
  // 编译用于开发或生产的 React 应用程序时要使用的 Webpack 配置
  // ...添加你的 webpack 配置
  conf.proxySetup = (app) => {
    app.use('/api', createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    }));
    /**
     * Mocker API Options
     * https://www.npmjs.com/package/mocker-api
     */
    return {
      path: path.resolve('./mocker/index.js'),
      option: {
        proxy: {
          '/repos/(.*)': 'https://api.github.com/',
        },
        changeHost: true,
      }
    }
  }
  return conf;
}
```