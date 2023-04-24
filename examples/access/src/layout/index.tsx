import { Outlet, Link } from 'react-router-dom';

const Layout = (props: any) => {
  const a = () => {
    props.navigate?.('/ceshi');
  };
  return (
    <div>
      <Link to="/home" style={{ marginRight: 20 }}>
        home
      </Link>
      <Link to="/about" style={{ marginRight: 20 }}>
        about
      </Link>
      <Link to="/ceshi">ceshi</Link>
      <div onClick={a}>ddd</div>
      <Outlet />
    </div>
  );
};

export default Layout;
