import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Link to="/" style={{ marginRight: 20 }}>
        home
      </Link>
      <Link to="/about" style={{ marginRight: 20 }}>
        about
      </Link>
      <Link to="/ceshi">ceshi</Link>
      <Outlet />
    </div>
  );
};

export default Layout;
