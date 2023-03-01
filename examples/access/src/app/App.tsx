import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import styles from './App.module.css';
import './App.css';

const App = () => {
  const store = useSelector((store) => store);
  console.log('store', store);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className={styles.warpper}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {VERSION}
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </header>
    </div>
  );
};

export default App;
