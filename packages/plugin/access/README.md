权限配置
====

权限控制，开启 access 配置, 则src目录下自动生成 access文件。可以在业务中根据路径来定制需求。

## 参数

```ts
export interface AccessPluginProps {
  access?: string;
}

```

## access.ts

模拟页面跳转拦截：

```ts
/**
 * access.ts
 * @path: 当前页面地址
 * @return 返回true则通过，返回路由则表示跳转
 */
const routeBefore = (path: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 已登录
      resolve(true)
      
      // 未登录, 跳转到 登录页面
      // resolve('/login')
    }, 2000)
  })
};

export default routeBefore;
```

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  access: true
}
```
