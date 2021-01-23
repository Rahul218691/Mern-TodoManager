import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Navbar,PrivateRoute} from './components';
import {Dashboard,Login,Register,ForgotPass,UpdatePass,ChangePass,Profile} from './pages';

const App = () =>{
  return (
    <BrowserRouter>
    <Navbar />
        <Switch>
            <PrivateRoute component={Dashboard} path="/" exact/>
            <Route component={Login} path="/login" exact/>
            <Route component={Register} path="/register" exact/>
            <Route component={ForgotPass} path='/forgotpass' exact/>
            <Route component={UpdatePass} path='/verification' exact/>
            <PrivateRoute component={Profile} path='/profile' exact/>
            <PrivateRoute component={ChangePass} path='/changepassword' exact/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
