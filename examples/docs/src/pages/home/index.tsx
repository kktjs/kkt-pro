import { config } from '@/config';
import { Wrap, Hero, BtnGroup, LinkMenu, LinkA, Footer } from './style';

const { name, github, quickStart } = config;

const Page = () => {
  return (
    <Wrap>
      <Hero>
        <h1>{name}</h1>
        <p>
          一个基于
          <a href="https://github.com/kktjs/kkt-pro" target="_blank">
            @kkt/pro
          </a>
          初始化文档网站项目
        </p>
        <BtnGroup>
          <LinkMenu to={quickStart}>立即上手</LinkMenu>
          <LinkA href={github} target="_blank">
            GitHub
          </LinkA>
        </BtnGroup>
      </Hero>
      <Footer>
        <h3>贡献者</h3>
        <p>感谢所有的贡献者，欢迎开发者为开源项目贡献力量。</p>
        <a href="https://github.com/kktjs/kkt-pro/graphs/contributors">
          <img src="https://kktjs.github.io/kkt-pro/CONTRIBUTORS.svg" />
        </a>
        <div style={{ height: 50 }} />
        <h3>License</h3>
        <p>Licensed under the MIT License.</p>
      </Footer>
    </Wrap>
  );
};
export default Page;
