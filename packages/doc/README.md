kkt doc
====

## 简介

用于本地预览静态资源

## 安装

```bash
$ npm install @kkt/doc # yarn add @kkt/doc
```

## 命令

```Bash

  Usage: kktd [input-file] [--help|h]

  Displays help information.

  Options:

   --version, -v         Show version number
   --help, -h            Displays help information.
   --local               Local address preview or not.

  Example:

   $ kktd ./examples/doc

```

## 文档命令使用

```bash

$ kktd ./examples/doc  --local  # 使用本地地址进行预览

$ kktd @uiw/doc/doc # 使用文档包进行预览

```

package.json 中配置命令

```json

  // ....
  "script":{
    "doc":"kktd @uiw/doc/doc", 
    "doc2":"kktd ./examples/doc --local", 
  }

```
