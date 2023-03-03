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

## models ts 实例

```ts
// src/models/demo.ts
export interface DemoState {
  test?: string;
}

const demo = {
  name: 'demo',
  state: {
    test: '测试State',
  },
  reducers: {
    updateState: (state: DemoState, payload: DemoState): DemoState => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch) => {
    const { demo } = dispatch;
    return {
      async verify() {
        demo.updateState({ test: '测试22' });
      },
    }
  },
};
export default demo;


// src/pages/ceshi.tsx
import { RootState, useSelector, dispatch } from '@kkt/pro';
const Ceshi = () => {
  // 获取demo数据
  const store = useSelector((store: RootState) => store.demo);
  // Dispatch
  const dispatch = useDispatch<Dispatch>();

  const click = () => {
    dispatch({
      type: 'demo/verify',
      payload: {}
    })
  }
  return <div />
}
export default Ceshi;
```

## 自动收集文件引入

1. 约定`src/**/models/**/*.(js|ts)`文件

## `kktp`配置文件

```ts
// .kktprc.ts
export default {
  // ...
  initModel:true,
}
```
