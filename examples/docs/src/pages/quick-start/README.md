Docs
===

一个基于[@kkt/pro](https://github.com/kktjs/kkt-pro)初始化文档网站项目。

##  ⌨️ 初始化文档网站demo

> 1. 直接下载实例文件
[`docs.zip`](https://kktjs.github.io/kkt-pro/zip/docs.zip)

> 2. 通过命令创建项目

```shell
# npm 6.x
$ npm init kktp my-app --example docs

# npm 7+, extra double-dash is needed:
$ npm init kktp my-app -- --example docs
```
## 📦 配置项

配置`src/config.ts`文件。

**ConfigType**
```ts
export type ConfigType = {
  /** 项目名称 */
  name: string;
  /** 项目github地址 */
  github: string;
  /** 立即上手按钮路由 */
  quickStart: string;
  /** 菜单配置项 */
  menus?: menusType[]
}
```

**menusType**
```ts
export type menusType = {
  /** 导航菜单名称 */
  title: string;
  /** 导航菜单路由, 对应 config/routes.js 配置路由 */
  path: string;
  /** 对应导航的侧边菜单 */
  child: MenusConfigObject[];
}
```

**menusType**
```ts
export type MenusConfigObject =  {
  title?: string;
  path?: string;
  divider?: boolean;
  target?: string;
}
```

**配置实例**
```ts
const config: ConfigType = {
  name: 'KKT PRO',
  github: 'https://github.com/kktjs/kkt-pro',
  quickStart: '/docs/quick-start',
  menus: [
    {
      title: '教程',
      path: '/docs',
      child: [
        {
          divider: true,
          title: '入门',
        },
        {
          title: '开始使用',
          path: '/docs/quick-start',
        }
      ]
    }
  ]
}
```


##  ❤️ 贡献者

感谢所有的贡献者，欢迎开发者为开源项目贡献力量。

<a href="https://github.com/uiwjs/uiw-admin/graphs/contributors">
  <img src="https://uiwjs.github.io/uiw-admin/CONTRIBUTORS.svg" />
</a>

## License

Licensed under the MIT License.
