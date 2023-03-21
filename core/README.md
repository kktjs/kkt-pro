kktp
===

## 安装

```bash
$ npm install kktp -D # yarn add kktp -D
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
8. 支持路由拦截 / 权限控制
9. 支持生成代码分析报告

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
5. 权限管理[@kkt/plugin-pro-access](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/access)
6. 包集成管理[@kkt/pro](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/pro)

## 配置加载

```ts
// .kktprc.ts

export default {
  // ...
  /** 自动生成入口文件 */
  initEntery:true,
  /** 路由配置 */
  initRoutes:true,
  /** 自动生成models集合配置文件 */
  initModel:true;
  /** 是否开启权限 */
  access: true;
}

```

## kkt 升级到 kktpro

**依赖处理**

项目的 package.json 需要升级 `kkt`, 并替换掉对应的 `kkt` 插件。
```ts
// package.json
{
  "devDependencies": {
+   "@kkt/pro": "^1.0.0",
-   "kkt": "^7.0.0",
-   "@kkt/***": "^1.0.0"
  }
}
```

**启动命令**

将原有的`kkt`命令替换成`kktp`。
```ts
// package.json
{
  "scripts": {
-    "start": "kkt start",
-    "build": "kkt build"
+    "start": "kktp start",
+    "build": "kktp build",
  }
}
```

**配置层迁移**

`.kktrc.[ts|js]` 文件替换成 `.kktprc.[ts|js]`文件。`kktprc`配置文档参考[@kkt/plugin-pro-config](https://github.com/kktjs/kkt-pro/tree/main/packages/plugin/config)

**路由配置修改**

- `kktp`中约定 `config/routes.[json|js|ts]`为路由文件。
- `kktp`中路由配置规则与`react-router@6`同步，所以路由相关的一些 api 存在着使用上的差异。
- `kktp`中约定`element`路径为字符串，在`kktp`内部会自动处理成异步加载。

```ts
// config/routes.json
[
  {
     "path": "/page",
-    "component": "@/layouts/BasicLayout",
+    "element": "@/layouts/BasicLayout",
-    "routes": [],
+    "children": [],
     // ...
  }
]
```

**代码层修改**

为了减少代码量，`kktp`中集成了部分导出类型，如：`router` / `rematch` 等常用功能。

例如：配置了`initRoutes`, `initModel`, 则页面中可以直接通过`@kkt/pro`来导出对应的类型。

```ts
import {
  useLocation,
  Outlet,
  Dispatch,
  ...
} from '@kkt/pro';
```

## 配置加载使用 proload 替换

Github: https://github.com/natemoo-re/proload

#### 问题

- [ ] `require`引入，缺失`use`方法
- [X] 配置文件需要使用`module.exports/require`写法,不能使用`import/export`写法
