import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import WelcomeDash from './components/WelcomeDash';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={WelcomeDash} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
