自动生成入口
====

`kktp`内置插件,需要配合`@kkt/plugin-pro-router`插件使用

## 全局样式

`kktp` 中约定`src/global.css 为全局样式`, 如果存在此文件，会被自动引入到入口文件最前面。

## 参数

```ts
type InitEntryOptions = {
  /**在src目录下生成的临时文件夹名称*/
  cacheDirName?: string;
  /**是否生成 react-redux Provider状态管理组件包裹*/
  redux?: boolean;
};
```

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  // ...
  initEntery:true,
  initRoutes:true,
}
```
