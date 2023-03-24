## 快速上手

这里是通过 [`kktp`](https://github.com/kktjs/kktp-pro) 命令快速开始一个项目。

## 环境准备

首先得有 [nodejs](https://nodejs.org/en)，并确保 [nodejs](https://nodejs.org/en) 版本是 14 或以上。（推荐用 [n](https://github.com/tj/n) 来管理 node 版本，windows 下推荐用 [nvm-windows](https://github.com/coreybutler/nvm-windows)）

```bash
# 🚧 注意：不适用于 Microsoft Windows 上的本机 shell
# 适用于 Linux 的 Windows 子系统和各种其他类 unix 系统
npm install -g n 
```

如果 npm 没有的情况

```bash
curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
bash n lts
# 现在可以使用 node 和 npm
npm install -g n
```

使用 [`n`](https://github.com/tj/n) 安装 [nodejs](https://nodejs.org/) 指定版本

```bash
$ n 18.12.1
$ n lts
$ n

  node/4.9.1
ο node/8.11.3
  node/10.15.0
```

## 初始化一个项目

```shell
# npm 6.x
$ npm init kktp my-app --example basice
# npm 7+, extra double-dash is needed:
$ npm init kktp my-app -- --example basice

$ yarn create kktp [appName]
# or npm
$ npm create kktp my-app
# or npx
$ npx create-kktp my-app
```

使用 `-e auth` 或 `--example auth` 参数生成如下其中之一的示例：

```bash
└─ examples
   ├── access       # 权限实例
   ├── auto-routes  # 自动生成路由实例
   ├── basic        # 基础示例
   ├── basic-js     # 基础js示例
   ├── config       # config配置示例
   ├── mocker       # 模拟 API 实例
   ├── rematch      # redux实例
   └── routes       # 路由实例
```

## 帮助

你可以通过`--help | h`来查看帮助. 

实例下载： http://kktjs.github.io/kkt-pro/zip/

```bash
Usage: create-kktp <app-name> [options] [--help|h]

Options:

  --version, -v   Show version number
  --help, -h      Displays help information.
  --output, -o    Output directory.
  --example, -e   Example from: http://kktjs.github.io/kkt-pro/, default: "auto-routes"
  --path, -p      Specify the download target git address.
                    default: "http://kktjs.github.io/kkt-pro/"

Example:

  yarn create kktp appName
  npx create-kktp my-app
  npm create kktp my-app
  npm create kktp my-app -f
  npm create kktp my-app -p http://kktjs.github.io/kkt-pro/zip/

Copyright 2023
```

## License

[MIT © Kenny Wong](https://github.com/jaywcjlove)
