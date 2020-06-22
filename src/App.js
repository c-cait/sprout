import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import routes from './routes';
import {withRouter} from 'react-router-dom';

const Navigation = withRouter(props => props.location.pathname === '/' ? '' : <NavBar />)

function App() {
  return (
    <div className="App">
      <Navigation/>
      {routes}
    </div>
  );
}

export default App;
