Creates a [`kktp`](https://github.com/kktjs/kktp-pro) application using the command line.

## Usage

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

## Command Help

Below is a help of commands you might find useful. The example download is from http://kktjs.github.io/kkt-pro/zip/

```bash
Usage: create-kktp <app-name> [options] [--help|h]

Options:

  --version, -v   Show version number
  --help, -h      Displays help information.
  --output, -o    Output directory.
  --example, -e   Example from: http://kktjs.github.io/kkt-pro/, default: "basic"
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
