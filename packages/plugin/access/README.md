## 权限配置

权限控制，开启 `access` 配置, 则`src`目录下自动生成 `access` 文件。可以在业务中根据路径来定制需求。


## 参数

```ts
export interface AccessPluginProps {
  /** 是否开启权限 */
  access?: string;
}

```

## roles

当路由配置`roles`参数，在页面中可以直接获取`roles`用于页面模块校验权限。
```ts
// config/routes.json
const routes = [
  // ....
  {
    path: '/demo',
    element: '@/pages/demo',
    roles: ['admin', 'users']
  }
]

// page
const Page = (props) => {
  const { roles = [] } = props;

  return <div />
}
export default Page;
```

## access.ts

页面跳转拦截，思路来源于`vue-router`的`beforeEach`。

```ts
// src/access.ts
/**
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const beforeEach = (path: string) => {
  return new Promise((resolve, reject) => {
    const isAuth = false;
    if (isAuth) {
      resolve(true);
    } else {
      // 如果当前无权限则跳转到 login 页面
      resolve('/login')
    }
  })
};

export default beforeEach;
```

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  access: true
}
```

## License

[MIT © Kenny Wong](https://github.com/jaywcjlove)
