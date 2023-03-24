"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[997],{2997:function(n,t,e){e.r(t),t.default={components:{},data:{},source:'## \u5feb\u901f\u4e0a\u624b\n\n\u8fd9\u91cc\u662f\u901a\u8fc7 [`kktp`](https://github.com/kktjs/kktp-pro) \u547d\u4ee4\u5feb\u901f\u5f00\u59cb\u4e00\u4e2a\u9879\u76ee\u3002\n\n## \u73af\u5883\u51c6\u5907\n\n\u9996\u5148\u5f97\u6709 [nodejs](https://nodejs.org/en)\uff0c\u5e76\u786e\u4fdd [nodejs](https://nodejs.org/en) \u7248\u672c\u662f 14 \u6216\u4ee5\u4e0a\u3002\uff08\u63a8\u8350\u7528 [n](https://github.com/tj/n) \u6765\u7ba1\u7406 node \u7248\u672c\uff0cwindows \u4e0b\u63a8\u8350\u7528 [nvm-windows](https://github.com/coreybutler/nvm-windows)\uff09\n\n```bash\n# \ud83d\udea7 \u6ce8\u610f\uff1a\u4e0d\u9002\u7528\u4e8e Microsoft Windows \u4e0a\u7684\u672c\u673a shell\n# \u9002\u7528\u4e8e Linux \u7684 Windows \u5b50\u7cfb\u7edf\u548c\u5404\u79cd\u5176\u4ed6\u7c7b unix \u7cfb\u7edf\nnpm install -g n \n```\n\n\u5982\u679c npm \u6ca1\u6709\u7684\u60c5\u51b5\n\n```bash\ncurl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n\nbash n lts\n# \u73b0\u5728\u53ef\u4ee5\u4f7f\u7528 node \u548c npm\nnpm install -g n\n```\n\n\u4f7f\u7528 [`n`](https://github.com/tj/n) \u5b89\u88c5 [nodejs](https://nodejs.org/) \u6307\u5b9a\u7248\u672c\n\n```bash\n$ n 18.12.1\n$ n lts\n$ n\n\n  node/4.9.1\n\u03bf node/8.11.3\n  node/10.15.0\n```\n\n## \u521d\u59cb\u5316\u4e00\u4e2a\u9879\u76ee\n\n```shell\n# npm 6.x\n$ npm init kktp my-app --example basice\n# npm 7+, extra double-dash is needed:\n$ npm init kktp my-app -- --example basice\n\n$ yarn create kktp [appName]\n# or npm\n$ npm create kktp my-app\n# or npx\n$ npx create-kktp my-app\n```\n\n\u4f7f\u7528 `-e auth` \u6216 `--example auth` \u53c2\u6570\u751f\u6210\u5982\u4e0b\u5176\u4e2d\u4e4b\u4e00\u7684\u793a\u4f8b\uff1a\n\n```bash\n\u2514\u2500 examples\n   \u251c\u2500\u2500 access       # \u6743\u9650\u5b9e\u4f8b\n   \u251c\u2500\u2500 auto-routes  # \u81ea\u52a8\u751f\u6210\u8def\u7531\u5b9e\u4f8b\n   \u251c\u2500\u2500 basic        # \u57fa\u7840\u793a\u4f8b\n   \u251c\u2500\u2500 basic-js     # \u57fa\u7840js\u793a\u4f8b\n   \u251c\u2500\u2500 config       # config\u914d\u7f6e\u793a\u4f8b\n   \u251c\u2500\u2500 mocker       # \u6a21\u62df API \u5b9e\u4f8b\n   \u251c\u2500\u2500 rematch      # redux\u5b9e\u4f8b\n   \u2514\u2500\u2500 routes       # \u8def\u7531\u5b9e\u4f8b\n```\n\n## \u5e2e\u52a9\n\n\u4f60\u53ef\u4ee5\u901a\u8fc7`--help | h`\u6765\u67e5\u770b\u5e2e\u52a9. \n\n\u5b9e\u4f8b\u4e0b\u8f7d\uff1a http://kktjs.github.io/kkt-pro/zip/\n\n```bash\nUsage: create-kktp <app-name> [options] [--help|h]\n\nOptions:\n\n  --version, -v   Show version number\n  --help, -h      Displays help information.\n  --output, -o    Output directory.\n  --example, -e   Example from: http://kktjs.github.io/kkt-pro/, default: "auto-routes"\n  --path, -p      Specify the download target git address.\n                    default: "http://kktjs.github.io/kkt-pro/"\n\nExample:\n\n  yarn create kktp appName\n  npx create-kktp my-app\n  npm create kktp my-app\n  npm create kktp my-app -f\n  npm create kktp my-app -p http://kktjs.github.io/kkt-pro/zip/\n\nCopyright 2023\n```\n\n## License\n\n[MIT \xa9 Kenny Wong](https://github.com/jaywcjlove)\n'}}}]);
//# sourceMappingURL=997.d6129dac.chunk.js.map