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
export default Home;
