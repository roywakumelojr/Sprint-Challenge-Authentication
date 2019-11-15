import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
      <Route path='/register' component={Register} />
      <Route  path='/' component={Login}/>
      <Route path='/dashboard' component={Dashboard}/>
    </Router>
  );
}

export default App;
