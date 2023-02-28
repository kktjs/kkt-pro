const Home = (props: any) => {
  const { navigate } = props;
  const click = () => {
    navigate('/ceshi');
  };
  return (
    <div>
      <button onClick={click}>add route</button>
    </div>
  );
};
Home.loader = () => {
  // console.log(3333);
  return true;
};
export default Home;
