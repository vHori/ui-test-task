import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path='/v1/banks/page=:pageNumber' component={Home}/>
          <Route path='/v1/banks/create' component={CreateForm}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
