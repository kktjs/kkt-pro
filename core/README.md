kktp
===

## 安装

```bash
$ npm install kktp -D # yarn add kktp -D
```

## Command Help

```bash

  Usage: kktp [build|watch|doc] [input-file] [--help|h]

  Displays help information.

  Options:

   --version, -v         Show version number
   --help, -h            Displays help information.
   --entry, -e           Document entry address.
   --local               Local address preview or not.

  Example:

   $ kktp build
   $ kktp watch
   $ kktp doc

```

## 文档命令使用

```bash

kktp doc --entry @uiw/doc/doc # 使用文档包进行预览

kktp doc --entry ./build --local # 使用本地地址进行预览

```
package.json 中配置命令

```json

  // ....
  "script":{
    "doc":"kktd @uiw/doc/doc", 
    "doc2":"kktd ./examples/doc --local", 
  }

```

## 说明


kktp ===> `kkt pro`

把现存的`uiw-admin`进行简化

功能参考：`umi`、 `antd component pro`

## 功能

对`kkt`进行封装配置集成,功能方面可以使用插件(plugin)

1. 入口文件自动生成
2. 默认全局样式文件
3. 配置文件路由自动生成/通过配置自动通过文件路径生成路由
4. 菜单icon图标处理
5. 支持`react-router 6`
6. 支持`react-redux`
7. 默认封装`mocker`代理配置

## 约定配置位置

```bash
.
├── config # 
│    └── router.json # 路由菜单配置文件
├── .kktprc.ts # 配置文件
└── mock # mock 数据
    └── index.js
```

## 插件

1. 配置处理包[@kkt/plugin-pro-config](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/config)
2. 自动生成入口[@kkt/plugin-pro-entry](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/entry)
3. 生成路由配置[@kkt/plugin-pro-router](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/router)
4. 状态管理[@kkt/plugin-pro-rematch](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/rematch)

## 配置加载

```ts
// .kktprc.ts

export default {
  // ...
  /**自动生成入口文件*/
  initEntery:true,
  /**路由配置*/
  initRoutes:true,
  /**自动生成models集合配置文件*/
  initModel:true;
}

```

## 配置加载使用 proload 替换

Github: https://github.com/natemoo-re/proload

#### 问题

- [ ] `require`引入，缺失`use`方法
- [X] 配置文件需要使用`module.exports/require`写法,不能使用`import/export`写法
