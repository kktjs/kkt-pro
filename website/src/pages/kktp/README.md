## KKTP

命令行工具用于 `Mobile`/`PC` 页面构建。

## 安装

```bash
$ npm install @kkt/pro -D # yarn add @kkt/pro -D
```

## 功能

对`kkt`进行封装配置集成,功能方面可以使用插件(plugin)

- 入口文件自动生成
- 默认全局样式文件
- 配置文件路由自动生成/通过配置自动通过文件路径生成路由
- 支持`react-router 6`
- 支持`react-redux`
- 默认封装`mocker`代理配置
- 支持路由拦截 / 权限控制
- 支持生成代码分析报告

## 插件

- 配置处理包[@kkt/plugin-pro-config](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/config)
- 自动生成入口[@kkt/plugin-pro-entry](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/entry)
- 生成路由配置[@kkt/plugin-pro-router](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/router)
- 状态管理[@kkt/plugin-pro-rematch](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/rematch)
- 权限管理[@kkt/plugin-pro-access](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/access)
- 包集成管理[@kkt/pro](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/pro)

### Contributors

<a href="https://github.com/kktjs/kkt-pro/graphs/contributors">
  <img src="https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg" />
</a>

### License

Licensed under the MIT License.