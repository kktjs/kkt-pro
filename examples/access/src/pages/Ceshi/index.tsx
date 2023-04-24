const About = (props: any) => {
  return <div>测试页面</div>;
};
About.loader = async () => {
  console.log('::进入页面请求API:');
  return null;
};
export default About;
