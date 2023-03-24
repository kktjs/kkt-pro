## 目录结构

这里罗列了 `kktp` 项目中约定(或推荐)的目录结构，在项目开发中，请遵照这个目录结构组织代码

```bash
.
├── README.md
├── build           # 编译后生成的目录
├── config
│   └── outes.json  # 【约定】路由文件
├── mocker
│   ├── index.js    # 【约定】mock API 入口目录
│   ├── login.js
│   └── page.js
├── package.json
├── .kktprc.js      # 可选，配置文件，包含内置功能
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── robots.txt
└── src
    ├── .kktp            # 自动生成内容, 可通过配置自定义生成
    ├── components
    ├── global.css       # 【约定】全局样式文件, 文件存在则会加载到全局入口处
    ├── pages            # 页面入口文件
    ├── access.js        # 【约定】开启 access 配置 自动生成的文件
    └── services
```

## 根目录

### .kktprc.js

可选，配置文件，包含内置功能

```bash
├── .kktprc.js       # 可选，配置文件，包含内置功能
└── src
```

### build 目录

执行 `anem build` 后，产物默认会存放在这里

```bash
├── build           # 编译后生成的目录
└── src
```

### mocker 目录

存储 `mocker` 文件，此目录下所有 `js` 文件会被解析为 `mocker` 入口文件。用于本地的模拟数据服务。

```bash
├── mocker
│   └── index.js    # 【约定】mock API 入口目录
└── src
```

### public 目录

此目录下所有文件会被 `copy` 到输出路径

```bash
├── public
└── src
```

## License

[MIT © Kenny Wong](https://github.com/jaywcjlove)