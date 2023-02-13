状态管理
====

`kktp`内置插件

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
