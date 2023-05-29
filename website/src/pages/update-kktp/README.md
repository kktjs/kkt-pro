## KKT 升级 KKTP

升级到 `kktp` 只需要简单的几步操作就能完成，简单的描述整个过程就是 - “重装依赖，修改配置”。

## 依赖处理

项目的 package.json 需要升级 `kkt`, 并替换掉对应的 `kkt` 插件。
```diff
{
  "devDependencies": {
+   "@kkt/pro": "^1.0.0",
-   "kkt": "^7.4.17",
-   "@kkt/***": "^1.0.0"
  }
}
```

## 启动命令

将原有的`kkt`命令替换成`kktp`。
```diff
{
  "scripts": {
-    "start": "kkt start",
-    "build": "kkt build"
+    "start": "kktp start",
+    "build": "kktp build",
  }
}
```

## 配置层迁移

`.kktrc.[ts|js]` 文件替换成 `.kktprc.[ts|js]`文件。

## 路由配置修改

- `kktp`中约定 `config/routes.[json|js|ts]`为路由文件。
- `kktp`中路由配置规则与`react-router@6`同步，所以路由相关的一些 api 存在着使用上的差异。
- `kktp`中约定`element`路径为字符串，在`kktp`内部会自动处理成异步加载。

```diff
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

## 代码层修改

为了减少代码量，`kktp`中集成了部分导出类型，如：`router` / `rematch` 等常用功能。

例如：配置了`initRoutes`, `initModel`, 则页面中可以直接通过`@kkt/pro`来导出对应的类型。

```ts
import {
  useLocation,
  Outlet,
  Dispatch,
  // ...
} from '@kkt/pro';
```

### Contributors

<a href="https://github.com/kktjs/kkt-pro/graphs/contributors">
  <img src="https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg" />
</a>

### License

Licensed under the MIT License.