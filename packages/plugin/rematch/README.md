状态管理
====

`kktp`内置插件,是以`@rematch/core`包为基础进行自动收集状态管理。使用此插件需要安装`@rematch/core`和`@rematch/loading`包

## 参数

```ts
export interface ModelspluginProps {
  /**自动生成文件目录名称*/
  cacheDirName?: string;
}
```

## 自动收集文件引入

1. 约定`src/**/models/**/*.(js|ts)`文件

## `kktp`配置文件

```ts
// .kktrc.ts
export default {
  // ...
  initModel:true,
}
```
