import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Navbar} from './components';
import {Dashboard,Login,Register} from './pages';

const App = () =>{
  return (
    <BrowserRouter>
    <Navbar />
        <Switch>
            <Route component={Dashboard} path="/" exact/>
            <Route component={Login} path="/login" exact/>
            <Route component={Register} path="/register" exact/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
