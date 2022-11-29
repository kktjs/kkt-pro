kktp
===

kktp ===> `kkt pro`

把现存的`uiw-admin`进行简化

功能参考：`umi`、 `antd component pro`

## 功能

对`kkt`进行封装配置集成,功能方面可以使用插件(plugin)

1. 入口文件自动生成
2. 默认全局样式文件
3. 配置文件路由自动生成/通过配置自动通过文件路径生成路由
4. 菜单icon图标处理
5. 支持`react-router 6`
6. 支持`react-redux`
7. 默认封装`mocker`代理配置

## 约定配置位置

```bash
.
├── config # 配置文件
│    ├── index.js
│    ├── proxy.js
│    └── router.json
└── mock # mock 数据
    └── index.js
```
