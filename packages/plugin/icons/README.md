本地 icon 使用
====

在 `kktp` 配置文件设置，开启 `icons` 功能。

本地 svg icon 的使用需要把 svg 保存在 `src/icons` 目录下，比如在 `src/icons` 目录下有个 `logo.svg`，然后可以这样引用：

```ts
import { Icons } from '@kkt/pro';

<Icons type="logo" />
```

## `Icons`组件属性

- `type` 指定 icon，名称为svg文件前缀，支持远程路径。
- `style` 外部容器样式。
- `className` 外部容器样式名。

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  icons: true
}
```
