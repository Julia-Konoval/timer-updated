import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginHome from './login/LoginHome';
import PrivateRoute from './PrivateRoute';
import Home from './Home';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={LoginHome} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
