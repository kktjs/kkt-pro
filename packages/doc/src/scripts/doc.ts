import express from 'express';
import clearConsole from 'react-dev-utils/clearConsole';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import { getDocsData } from '../utils';
import openBrowser from 'react-dev-utils/openBrowser';
import chalk from 'chalk';

const app = express();

export const staticDocServer = async (docs: string, isLocal: boolean) => {
  try {
    if (!docs) {
      throw new Error('entry does not exist!');
    }
    // 端口
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 9666;
    const HOST = process.env.HOST || '0.0.0.0';
    /**端口处理*/
    const port = await choosePort(HOST, DEFAULT_PORT);
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const { route, docRoot, dirPath } = getDocsData(docs, isLocal);
    app.use(route, express.static(docRoot));
    /**监听端口*/
    app.listen(port, () => {
      const urls = prepareUrls(
        protocol,
        HOST,
        port,
        // @ts-ignore
        route,
      );
      /**清空之前的命令行内容**/
      clearConsole();
      console.log(chalk.green('Doc start-up successfully!'));
      console.log();
      console.log(`You can now view \x1b[37;1m${dirPath}\x1b[0m in the browser.`);
      console.log();
      if (urls.lanUrlForTerminal) {
        console.log(`  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`);
        console.log(`  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`);
      } else {
        console.log(`  ${urls.localUrlForTerminal}`);
      }
      console.log();
      /**打开地址**/
      openBrowser(urls.localUrlForBrowser);
    });
  } catch (err) {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  }
};
