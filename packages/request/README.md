API 请求
===

`kktprc` 配置 `queryClient`开启。 `@kkt/request` 内置了 `react-query`（和 [`@tanstack/react-query`](https://npmjs.com/@tanstack/react-query)<!--rehype:target=__blank--> 是同一个）请求方案。更多 API 方法请查看 [react-query 官方文档](https://tanstack.com/query/latest)。

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  queryClient: true
}
```


```js
import { useReactQuery, useReactMutation, queryClient, fetchFn } from '@kkt/request';
// OR
import { useReactQuery, useReactMutation, queryClient, fetchFn } from '@kkt/pro';
```

## API 比较说明

 &nbsp; | `useReactQuery` | ~~`useQuery`~~ |  `useReactMutation` | ~~`useMutation`~~
:--- | :--- | :--- | :--- | :---
说明 | 基于 `useQuery` 封装 | 官方 API | 基于 `useMutation` 封装 | 官方 API
拼接前缀 | ✅ | 🛑 | ✅ | 🛑
集成 fetch 函数 | ✅ | 🛑 | ✅ | 🛑
添加头信息 | ✅ | 🛑 | ✅ | 🛑
method | ✅ 默认(GET) | 🛑 | ✅ 默认(POST) | 🛑
请求自动带 token | ✅ | 🛑 | ✅ | 🛑
自动更新 token | ✅ | 🛑 | ✅ | 🛑
Body 自动转换 | ✅ | 🛑 | ✅ | 🛑

推荐使用我们二次封包的 API，否则您需要集成上述功能

- [ ] 请求自动带 token
- [ ] 自动更新 token

## API 请求 hooks

下面是 API 请求示例，如 GET/POST 请求示例

### useReactQuery

主要用于**默认**触发请求数据，默认 `GET` 请求，变更使用 `method="POST"` 参数配置

```jsx
useReactQuery({ 
  queryKey: ['user', userId], 
  url: `/api/user/list?id=${userId}`
});
```
<!--rehype:style=background:#00de2247;border: 0;-->

👆👆👆👆 上面是**推荐**使用 👆👆👆👆👆

```jsx
import { fetchFn, useReactQuery } from '@kkt/request';

useReactQuery({ queryKey: ['user'], url: '/api/user/list' });
useReactQuery({ queryKey: ['user'], url: '/api/user/list', method: 'POST' });
useReactQuery({ queryKey: ['user', userId], queryFn: () => fetchFn(`/api/user/list?id=${userId}`) });
useReactQuery({
  queryKey: ['user', userId],
  queryFn: async () => {
    return fetchFn(`/api/user/list?id=${userId}`);
  },
});
useReactQuery({
  queryKey: ['user', userId],
  queryFn: ({ queryKey }) => fetchFn(`/api/user/list?id=${queryKey[1]}`);,
});
useReactQuery({
  queryKey: ['user'],
  url: '/api/user/list',
  initialData: [....],
});

const { isInitialLoading, isError, data, error, refetch, isFetching } = useQuery(...)
```

示例

```javascript
import { useReactQuery } from '@kkt/request';

export default function HomePage() {
  const { isLoading, isError, data } = useReactQuery({
    url: `/api/user/list`,
    queryKey: ['user-list'],
  });

  return (
    <div>
      <p className="title">ANEM x react-query</p>
      {isError && <p>请求 API 错误 ...</p>}
      {isLoading && <p>Loading ...</p>}
      {data && <p>ANEM 现在有 {data.stargazers_count} 颗星！</p>}
    </div>
  );
}
```

#### Query 选项

可选选项，请求的数据进行处理等其它常用[选项](https://tanstack.com/query/v4/docs/react/reference/useQuery)，可以用于默认全局配置 `QueryClientConfig` 的设置。

> 注意：`.anerc.js` 默认已经在 `QueryClientConfig` 中默认全局配置，可以进行增加配置，配置 `react-query=false` 取消注销全局 `QueryClient`，可以自己注册 `QueryClient`

```js
const { data } = useReactQuery({
  /** 设置 Content-Type，默认值 `json`，'Content-Type' = 'application/json' */
  contentType: "json" | 'form';
  // 请求 API
  url: '/api/user/list'
  // 用于此查询的查询键。查询键将被 hash 成一个稳定的 hash 。当此键更改时，查询将自动更新（只要 enabled 未设置为 false）
  queryKey: ['user-list', userId],
  // 只要查询成功获取新数据，此函数就会触发。
  onSuccess: (data: TData) => void
  // 如果查询遇到错误并将传递错误，则此函数将触发。
  onError: (error: TError) => void
  // 每当成功获取查询或出错并传递数据或错误时，此函数都会触发。
  onSettled: (data?: TData, error?: TError) => void
  // 此选项可用于转换或选择查询函数返回的部分数据。 它会影响返回的数据值，但不会影响存储在查询缓存中的内容。
  select: (data: TData) => unknown
  select: (dt) => {
    // 改变请求到的 data 数据，返回部分 data 数据
    return dt
  },
  // 将此设置为 true 以启用暂停模式。
  // 当 true 时，useQuery 将在 status === 'loading' 时暂停
  // 当 true 时，useQuery 将在 status === 'error' 时抛出运行时错误
  suspense: true,
  // 将此设置为 false 以禁止此查询自动运行。https://tanstack.com/query/v4/docs/react/guides/dependent-queries
  // 在 userId 存在之前，查询不会执行
  enabled: !!userId,
  // 如果为 false，失败的查询默认不会重试。如果为真，失败的查询将无限重试
  // 如果设置为数字，例如 3、失败的查询会重试，直到失败的查询计数满足那个数
  retry: boolean | number | (failureCount: number, error: TError) => boolean
  // 默认值为 'online'，请参阅网络模式：https://tanstack.com/query/v4/docs/react/guides/network-mode
  networkMode: 'online' | 'always' | 'offlineFirst'
  // 如果设置为 false，如果查询包含错误，则不会在挂载时重试。默认为真
  retryOnMount: boolean
  // 此函数接收一个 retryAttempt 整数和实际错误，并返回在下一次尝试之前应用的延迟（以毫秒为单位）
  // 像 attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000) 这样的函数应用指数退避
  // 像 attempt => attempt * 1000 这样的函数应用线性退避。
  retryDelay: number | (retryAttempt: number, error: TError) => number
  // 默认值为 0，数据被认为过时后的时间（以毫秒为单位）。该值仅适用于定义它的挂钩
  // 如果设置为“Infinity”，数据将永远不会被认为是陈旧的
  staleTime: number | Infinity
  // 在 SSR 期间默认为 5 * 60 * 1000（5 分钟）或无限
  // 未使用(unused)/非活动(inactive)缓存数据保留在内存中的时间（以毫秒为单位）。当查询的缓存变为未使用或不活动时，该缓存数据将在这段时间后被垃圾收集。 当指定不同的缓存时间时，将使用最长的一个
  // 如果设置为 Infinity，将禁用垃圾收集
  cacheTime: number | Infinity
  // 如果设置为一个数字，所有查询将以毫秒为单位以该频率连续重新获取
  // 如果设置为一个函数，该函数将使用最新的数据执行并查询以计算频率
  refetchInterval: number | false | ((data: TData | undefined, query: Query) => number | false)
  // 如果设置为 true，则设置为使用 refetchInterval 连续重新获取的查询将在其选项卡/窗口处于后台时继续重新获取
  refetchIntervalInBackground: boolean
  // 默认为 true
  // 如果设置为 true，如果数据过时，查询将在挂载时重新获取
  // 如果设置为 false，查询将不会在挂载时重新获取
  // 如果设置为 always，查询将始终在挂载时重新获取
  // 如果设置为一个函数，该函数将与查询一起执行以计算值
  refetchOnMount: boolean | "always" | ((query: Query) => boolean | "always")
  // 默认为 true
  // 如果设置为 true，如果数据陈旧，查询将重新获取窗口焦点
  // 如果设置为 false，查询将不会重新获取窗口焦点
  // 如果设置为 always，查询将始终重新获取窗口焦点
  // 如果设置为一个函数，该函数将与查询一起执行以计算值
  refetchOnWindowFocus: boolean | "always" | ((query: Query) => boolean | "always")
  // 默认为 true
  // 如果设置为 true，如果数据过时，查询将在重新连接时重新获取
  // 如果设置为 false，查询将不会在重新连接时重新获取
  // 如果设置为 always，查询将始终重新获取窗口焦点
  // 如果设置为一个函数，该函数将与查询一起执行以计算值
  refetchOnReconnect: boolean | "always" | ((query: Query) => boolean | "always")
  // 如果设置，组件将仅在任何列出的属性更改时重新渲染
  // 例如，如果设置为 ['data', 'error']，组件将仅在数据或错误属性更改时重新呈现
  // 如果设置为“all”，组件将选择退出智能跟踪并在更新查询时重新呈现
  // 默认情况下，将跟踪对属性的访问，并且仅当跟踪的属性之一发生更改时，组件才会重新呈现
  notifyOnChangeProps: string[] | "all"
  // 如果设置，此值将用作查询缓存的初始数据（只要尚未创建或缓存查询）
  // 如果设置为一个函数，该函数将在共享/根查询初始化期间被调用一次，并期望同步返回 initialData
  // 默认情况下，初始数据被认为是陈旧的，除非设置了 staleTime。
  // initialData 被持久化到缓存
  initialData: TData | () => TData
  // 如果设置，该值将用作上次更新 initialData 本身的时间（以毫秒为单位）。
  initialDataUpdatedAt: number | (() => number | undefined)
  // 如果设置，当查询仍在加载数据中且未提供 initialData 时，此值将用作此特定查询观察器的占位符数据。
  // `placeholderData` 不会持久化到缓存
  placeholderData: TData | () => TData
  // 默认为 false 如果设置，则在获取新数据时将保留任何以前的数据，因为查询键已更改。
  keepPreviousData: boolean
  // 默认为 true 如果设置为 false，将禁用查询结果之间的结构共享
  // 如果设置为一个函数，旧数据值和新数据值将通过该函数传递，该函数应将它们组合成解析数据以供查询。 这样，您可以保留旧数据的引用以提高性能，即使该数据包含不可序列化的值也是如此
  structuralSharing: boolean | ((oldData: TData | undefined, newData: TData) => TData)
  // 默认为全局查询配置的 useErrorBoundary 值，未定义
  // 如果您希望在渲染阶段抛出错误并传播到最近的错误边界，请将此设置为 true
  // 将此设置为 false 以禁用 suspense 将错误抛出到错误边界的默认行为
  // 如果设置为函数，它将传递错误和查询，它应该返回一个布尔值，指示是在错误边界中显示错误 (true) 还是将错误作为状态返回 (false)
  useErrorBoundary: undefined | boolean | (error: TError, query: Query) => boolean
  // 如果设置，则存储有关查询缓存条目的附加信息，可根据需要使用。 只要查询可用，它就可以访问，它也是提供给 queryFn 的 QueryFunctionContext 的一部分
  meta: Record<string, unknown>
  // 使用它来使用自定义 React 查询上下文。 否则，将使用 defaultContext
  context: React.Context<QueryClient | undefined>
});
```


### useReactMutation

用于触发的 `API` 请求

```jsx
useReactMutation({
  mutationKey: ['user', dataForm],
  url: '/api/login'
});
```
<!--rehype:style=background:#00de2247;border: 0;-->

👆👆👆👆 上面是**推荐**使用，**dataForm** 用于给 `body` 传递的 *json* 数据 👆👆👆👆👆

```javascript
import { fetchFn, useReactMutation } from '@kkt/request';

useReactMutation({ mutationKey: ['user'], url: '/api/login' });
useReactMutation({ mutationKey: ['user'], url: '/api/login', method: 'PUT' });
useReactMutation({ mutationKey: ['user', dataForm], url: '/api/login' });
useReactMutation({
  mutationKey: ['user', dataForm], 
  mutationFn: () => fetchFn(`/api/login?id=${dataForm.userId}`, { method: 'PUT' })
});
useReactMutation({
  mutationKey: ['user', dataForm],
  mutationFn: () => fetchFn('/api/login', { method: 'POST', body: JSON.stringify(dataForm) }),
});
useReactMutation({
  mutationKey: ['user', dataForm],
  mutationFn: async () => {
    return fetchFn(`/api/login?id=${dataForm.username}`, { method: 'DELETE', body: JSON.stringify(dataForm) });
  },
});
useReactMutation({
  mutationKey: ['user', dataForm],
  mutationFn: (data) => {
    return fetchFn(`/api/login`, { method: 'POST', body: JSON.stringify(data) })
  },
});
```

**登录页面**示例

```javascript
import { useReactMutation, useAuth } from '@kkt/request';
import { useEffect, useState } from 'react';
import { Form, useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const [errors, setErrors] = useState()
  const [submitData, setSubmitData] = useState()
  const location = useLocation();
  const navigate = useNavigate();
  const mutation = useReactMutation({
    url: '/api/login',
    mutationKey: ['user-login', submitData],
  });

  useEffect(() => {
    sessionStorage.removeItem('token');
    // 默认进入登录页面清空 token，退出登录即可直接跳转到 `/login` 页面
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const result = await mutation.mutateAsync(submitData);
    if (result.error) {
      setErrors({ message: result.error });
      return;
    }
    // 存储 token，通过 sessionStorage 或者 localStorage
    sessionStorage.setItem('token', result.token);
    setTimeout(() => {
      // 跳转到上一个页面或者 `/`
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    });
  };
  const handleChange = (event) => {
    const formData = new FormData(event.target.form);
    const username = formData.get("username");
    const password = formData.get("password");
    const err = {};
    // 验证字段
    if (typeof username !== "string" || username.length < 3) {
      err.username = "用户名必须大于 3 个字符";
    }
    if (typeof password !== "string" || password.length < 3) {
      err.password = "密码必须大于 3 个字符";
    }
    setErrors({ ...err });
    if (!Object.entries(err).length) {
      const data = Object.fromEntries(formData)
      setSubmitData(data);
    }
  }
  return (
    <Form method="post" onChange={handleChange} onSubmit={submit}>
      <label>
        <input type="text" name="username" />
        {errors?.username && <span>{errors.username}</span>}
      </label>
      <label>
        <input type="text" name="password" />
        {errors?.password && <span>{errors.password}</span>}
      </label>
      <p>
        <button type="submit">Sign up</button>
      </p>
      {errors?.message && <div>{errors.message}</div>}
    </Form>
  );
}
```

在任何给定时刻，`mutation` 只能处于以下状态之一：

- `isIdle` or `status === 'idle'` - mutation 当前处于空闲状态或处于新鲜/重置状态
- `isLoading` or `status === 'loading'` - mutation 当前正在运行
- `isError` or `status === 'error'` - mutation 遇到错误
- `isSuccess` or `status === 'success'` - mutation 成功并且 mutation 数据可用

除了这些主要状态之外，还可以根据 `mutation` 状态获得更多信息：

- `error` - 如果 mutation 处于错误状态，则可以通过 error 属性获得错误。
- `data` - 如果 mutation 处于成功状态，则数据可通过 data 属性获得。

```javascript
const mutation = useReactMutation({
  url: '/api/login',
  mutationKey: ['user-login', data],
  method: 'PUT'
});
```

#### 副作用 mutation 选项

```js
const mutation = useReactMutation({
  url: '/api/login',
  onMutate: (variables) => {
    // mutation 即将发生！
    
    // 可选地返回包含数据的上下文，例如在回滚时使用
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // 发生错误！
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // 错误或成功......没关系！
  },
})
```

您可能会发现，在调用 `mutate` 时，您想要触发除 `useReactMutation` 上定义的回调之外的其他回调。 这可用于触发组件特定的副作用。 为此，您可以在 `mutate` 变量之后向 `mutate` 函数提供任何相同的回调选项。 支持的选项包括：`onSuccess`、`onError` 和 `onSettled`。 请记住，如果您的组件在变更完成之前卸载，那么这些额外的回调将不会运行。

```js
mutation.mutate(todo, {
  onSuccess: (data, variables, context) => {
    // I will fire second!
  },
  onError: (error, variables, context) => {
    // I will fire second!
  },
  onSettled: (data, error, variables, context) => {
    // I will fire second!
  },
})
```

### Query Keys

TanStack Query 的核心是基于查询键为您管理查询缓存。查询键必须是顶层的数组，并且可以像具有单个字符串的数组一样简单，也可以像包含许多字符串和嵌套对象的数组一样复杂。 只要查询键是可序列化的，并且对于查询数据是唯一的，就可以使用它！

```js
useReactQuery({
  url: `https://api.example.com/users?status=${status}&page=${page}`,
  queryKey: ['use-list', { status, page }],
});
```

### 请求重试

```js
const { isLoading, isError, data } = useReactQuery({
  url: `/api/user/list?id=${userId}`,
  queryKey: ['user-list', userId],
  retry: 10, // 在显示错误之前将重试失败的请求 10 次
});
```

修改 `.anerc.js` 配置，每次尝试的默认 `retryDelay` 设置为双倍（从 `1000` 毫秒开始），但不超过 `30` 秒：

```js
/** @type {import("anem").ANEMOptions} */
export const anem = {
  reactQuery: {
    "defaultOptions": {
      "queries": {
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      }
    }
  }
}
```

### 获取全局注册的 QueryClient

全局 `QueryClient` 是默认集成的，如果没有使用 `reactQuery=false` 取消注册，可以通过下面方式获取全局 `queryClient` 对象

```javascript
import { queryClient, fetchFn } from '@kkt/request';
// Or
import { queryClient, fetchFn } from '@kkt/pro';

/** @type {import("@kkt/request").QueryClient} */
const client = queryClient;
```


## 比较 | React Query vs SWR vs Apollo vs RTK Query vs React Router

|   | React Query | SWR [_(Website)_][swr] | Apollo Client [_(Website)_][apollo] | RTK-Query [_(Website)_][rtk-query]   | React Router [_(Website)_][react-router] |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Github Repo / Stars                                | [![][stars-react-query]][gh-react-query] | [![][stars-swr]][gh-swr]    | [![][stars-apollo]][gh-apollo]             | [![][stars-rtk-query]][gh-rtk-query] | [![][stars-react-router]][gh-react-router]                                |
| 平台要求 | React | React | React, GraphQL | Redux | React |
| 他们的比较 | | (none) | (none) | [Comparison][rtk-query-comparison]   | [Comparison][react-router-comparison] |
| 支持的查询语法 | Promise, REST, GraphQL | Promise, REST, GraphQL | GraphQL, Any (Reactive Variables) | Promise, REST, GraphQL | Promise, REST, GraphQL |
| 支持的框架 | React | React | React + Others | Any | React |
| 缓存策略 | Hierarchical Key -> Value | Unique Key -> Value | Normalized Schema | Unique Key -> Value | Nested Route -> value |
| 缓存键策略 | JSON | JSON | GraphQL Query | JSON | Route Path |
| 缓存变化检测 | Deep Compare Keys (Stable Serialization) | Shallow Compare Keys | Deep Compare Keys (Unstable Serialization) | Key Referential Equality (===) | Route Change |
| 数据变化检测 | Deep Comparison + Structural Sharing | Deep Compare (via `dequal`) | Deep Compare (Unstable Serialization) | Key Referential Equality (===) | Loader Run |
| 数据记忆 | Full Structural Sharing | Identity (===) | Normalized Identity | Identity (===) | Identity (===) |
| 捆绑尺寸 | [![][bp-react-query]][bpl-react-query]   | [![][bp-swr]][bpl-swr]      | [![][bp-apollo]][bpl-apollo]               | [![][bp-rtk-query]][bpl-rtk-query]   | [![][bp-react-router]][bpl-react-router]  [![][bp-history]][bpl-history] |
| API定义位置 | Component, External Config | Component | GraphQL Schema | External Config | Route Tree Configuration |
| 查询 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 缓存持久化 | ✅ | ✅ | ✅ | ✅ | 🛑 Active Routes Only <sup>8</sup> |
| 开发者工具 | ✅ | 🟡 | ✅ | ✅ | 🛑 |
| 轮询/间隔 | ✅ | ✅ | ✅ | ✅ | 🛑 |
| 并行查询 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 依赖查询  | ✅ | ✅ | ✅ | ✅ | ✅ |
| 分页查询  | ✅ | ✅ | ✅ | ✅ | ✅ |
| 无限查询 | ✅ | ✅ | ✅ | 🛑 | 🛑 |
| 双向无限查询 | ✅ | 🔶 | 🔶 | 🛑 | 🛑 |
| 无限查询重新获取 | ✅ | ✅ | 🛑 | 🛑 | 🛑 |
| 滞后查询数据[^1] | ✅ | 🔶 | 🛑 | ✅ | ✅ |
| 选择器 | ✅ | 🛑 | ✅ | ✅ | N/A |
| 初始数据 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 滚动恢复 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 缓存操作 | ✅ | ✅ | ✅ | ✅ | 🛑 |
| 过时的查询驳回 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 渲染批处理和优化[^2] | ✅ | 🛑 | 🛑 | ✅ | ✅ |
| 自动垃圾收集 | ✅ | 🛑 | 🛑 | ✅ | N/A |
| mutation 钩子 | ✅ | 🟡 | ✅ | ✅ | ✅ |
| 离线突变支持 | ✅ | 🛑 | 🟡 | 🛑 | 🛑 |
| 预取 API | ✅ | 🔶 | ✅ | ✅ | ✅ |
| 查询取消 | ✅ | 🛑 | 🛑 | 🛑 | ✅ |
| 部分查询匹配[^3] | ✅ | 🛑 | 🛑 | ✅ | N/A |
| 重新验证时陈旧 |✅ | ✅ | ✅ | ✅ | 🛑 |
| 陈旧时间配置 | ✅ | 🛑[^7] | 🛑 | ✅ | 🛑 |
| 使用前查询/变更配置[^4] | ✅ | 🛑 | 🛑 | ✅ | ✅ |
| 窗口焦点重新获取 | ✅ | ✅ | 🛑 | 🔶 | 🛑 |
| 网络状态重新获取 | ✅ | ✅ | ✅ | 🔶 | 🛑 |
| 一般缓存脱水/再水化 | ✅ | 🛑 | ✅ | ✅ | ✅ |
| 离线缓存 | ✅ (实验性的) | 🛑 | ✅ | 🔶 | 🛑 |
| React Suspense(实验性的) | ✅ | ✅ | 🛑 | 🛑 | ✅ |
| 抽象/不可知核心 | ✅ | 🛑 | ✅ | ✅ | 🛑 |
| 变异后自动重新获取[^5] | 🔶 | 🔶 | ✅ | ✅ | ✅ |
| 标准化缓存[^6] | 🛑 | 🛑 | ✅ | 🛑 | 🛑 |

[bpl-react-query]: https://bundlephobia.com/result?p=react-query
[bp-react-query]: https://badgen.net/bundlephobia/minzip/react-query?label=💾
[gh-react-query]: https://github.com/tannerlinsley/react-query
[stars-react-query]: https://img.shields.io/github/stars/tannerlinsley/react-query?label=%F0%9F%8C%9F

[swr]: https://github.com/vercel/swr
[bp-swr]: https://badgen.net/bundlephobia/minzip/swr?label=💾
[gh-swr]: https://github.com/vercel/swr
[stars-swr]: https://img.shields.io/github/stars/vercel/swr?label=%F0%9F%8C%9F
[bpl-swr]: https://bundlephobia.com/result?p=swr

[apollo]: https://github.com/apollographql/apollo-client
[bp-apollo]: https://badgen.net/bundlephobia/minzip/@apollo/client?label=💾
[gh-apollo]: https://github.com/apollographql/apollo-client
[stars-apollo]: https://img.shields.io/github/stars/apollographql/apollo-client?label=%F0%9F%8C%9F
[bpl-apollo]: https://bundlephobia.com/result?p=@apollo/client

[rtk-query]: https://redux-toolkit.js.org/rtk-query/overview
[rtk-query-comparison]: https://redux-toolkit.js.org/rtk-query/comparison
[rtk-query-bundle-size]: https://redux-toolkit.js.org/rtk-query/comparison#bundle-size
[bp-rtk]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[bp-rtk-query]: https://badgen.net/bundlephobia/minzip/@reduxjs/toolkit?label=💾
[gh-rtk-query]: https://github.com/reduxjs/redux-toolkit
[stars-rtk-query]: https://img.shields.io/github/stars/reduxjs/redux-toolkit?label=🌟
[bpl-rtk]: https://bundlephobia.com/result?p=@reduxjs/toolkit
[bpl-rtk-query]: https://bundlephobia.com/package/@reduxjs/toolkit

[react-router]: https://github.com/remix-run/react-router
[bp-react-router]: https://badgen.net/bundlephobia/minzip/react-router-dom?label=💾
[gh-react-router]: https://github.com/remix-run/react-router
[stars-react-router]: https://img.shields.io/github/stars/remix-run/react-router?label=%F0%9F%8C%9F
[bpl-react-router]: https://bundlephobia.com/result?p=react-router-dom
[bp-history]: https://badgen.net/bundlephobia/minzip/history?label=💾
[bpl-history]: https://bundlephobia.com/result?p=history

[^1]: 滞后查询数据 — React Query 提供了一种在加载下一个查询时继续查看现有查询数据的方法（类似于 suspense 很快将在本地提供的相同 UX）。 这在编写分页 UI 或无限加载 UI 时非常重要，因为您不希望在请求新查询时显示硬加载状态。 其他库没有此功能，并在新查询加载时为新查询呈现硬加载状态（除非它已被预取）。
[^2]: 渲染优化 - React Query 具有出色的渲染性能。 默认情况下，它会自动跟踪访问了哪些字段，并且仅在其中一个字段发生更改时才重新呈现。 如果您想选择退出此优化，将 notifyOnChangeProps 设置为 'all' 将在更新查询时重新呈现您的组件。 例如因为它有新数据，或者表明它正在获取。 React Query 还将批处理更新放在一起，以确保您的应用程序仅在多个组件使用相同查询时重新呈现一次。 如果您只对数据或错误属性感兴趣，则可以通过将 notifyOnChangeProps 设置为 ['data', 'error'] 来进一步减少渲染次数。
[^3]: 部分查询匹配 — 因为 React Query 使用确定性查询键序列化，这允许您操作可变的查询组，而不必知道您想要匹配的每个单独的查询键，例如。 您可以重新获取其键中以 todos 开头的每个查询，而不管变量如何，或者您可以使用（或不使用）变量或嵌套属性来定位特定查询，甚至可以使用过滤器函数来仅匹配通过特定条件的查询。
[^4]: 使用前查询配置 - 这只是一个奇特的名称，用于配置查询和变更在使用前的行为方式。 例如，一个查询可以预先完全配置为默认值，当需要使用它时，只需要 `useQuery({ queryKey })` ，而不是每次使用都需要传递 fetcher 和/或选项。 SWR 确实具有此功能的部分形式，它允许您预先配置一个默认的提取器，但只是作为一个全局提取器，而不是基于每个查询，而且绝对不是用于突变。
[^5]: 突变后自动重新提取 - 为了在突变发生后发生真正的自动重新提取，需要一个模式（就像 graphQL 提供的那样）以及帮助库知道如何识别该模式中的单个实体和实体类型的启发式方法。
[^6]: 规范化缓存 — React Query、SWR 和 RTK-Query 目前不支持自动规范化缓存，它描述了在平面架构中存储实体以避免一些高级数据重复。
[^7]: SWR 的不可变模式 — SWR 附带一个“不可变”模式，允许您在缓存的生命周期内只获取一次查询，但它仍然没有过时或条件自动重新验证的概念
[^8]: React Router 缓存持久性 - React Router 不会缓存超出当前匹配路由的数据。 如果留下一条路线，其数据将丢失。
