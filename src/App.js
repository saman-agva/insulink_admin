import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import WelcomeDash from './components/WelcomeDash';

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route exact path='/' component={WelcomeDash} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
        <p>Hello react</p>
    </div>
  );
}

export default App;
