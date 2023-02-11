/* eslint-disable no-undef */
import React from 'react';
import { defer, useLoaderData, Link } from 'react-router-dom';

const rand = () => Math.round(Math.random() * 100);
const resolve = (d, ms) => new Promise((r) => setTimeout(() => r(`${d} - ${rand()}`), ms));
const reject = (d, ms) =>
  new Promise((_, r) =>
    setTimeout(() => {
      if (d instanceof Error) {
        d.message += ` - ${rand()}`;
      } else {
        d += ` - ${rand()}`;
      }
      r(d);
    }, ms),
  );

/**
 * 定义一个“加载器”函数，挂载在组件上
 *
 * 以便在渲染之前向路由元素提供数据。
 */
HomePage.loader = async (props) => {
  // console.log('loader:', props)
  // console.log('loader.request:', props.request)
  // return fakeDb.from("teams").select("*");
  // return fetch(`/api/teams/${params.teamId}.json`);
  return defer({
    critical1: await resolve('Critical 1', 250),
    critical2: await resolve('Critical 2', 600),
    lazyResolved: Promise.resolve('Lazy Data immediately resolved - ' + rand()),
    lazy1: resolve('Lazy 1', 1000),
    lazy2: resolve('Lazy 2', 1500),
    lazy3: resolve('Lazy 3', 2000),
    lazyError: reject(new Error('Kaboom!'), 2500),
  });
};

/**
 * 默认 `export default` 导出约定为渲染页面
 */
export default function HomePage() {
  const data = useLoaderData();

  // eslint-disable-next-line no-undef
  console.log('data:', PREFIX, data);

  return (
    <div>
      <h2>首页 {PREFIX}</h2>
      <div>
        <Link to="Home">Home</Link>
      </div>
      <div>
        Edit <code>src/App.js</code> and save to reload.
      </div>
    </div>
  );
}
