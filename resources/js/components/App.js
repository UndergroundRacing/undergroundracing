import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Race from "./pages/Race";
import Top from "./pages/Top";
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome from './pages/Admin/AdminHome';
import AddEngine from './pages/Admin/ActionPages/AddEngine';
import ForgotPass from './pages/ForgotPass';
import AddNos from './pages/Admin/ActionPages/AddNos';
import AddPart from './pages/Admin/ActionPages/AddPart';
import AddStops from './pages/Admin/ActionPages/AddStops';
import AddTurbo from './pages/Admin/ActionPages/AddTurbo';
import AddVehicle from './pages/Admin/ActionPages/AddVehicle';
import AddWheels from './pages/Admin/ActionPages/AddWheels';
import Menu from "./Menu";


function App() {
    return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={Main}/>
                        <Route path={'/Login'} component={Login}/>
                        <Route path={'/ChangePassword'} component={ForgotPass}/>
                        <Route path={'/Register'} component={Register}/>
                        <Route path={'/About'} component={About}/>
                        <Route path={'/Home'} component={Menu}/>
                        <Route path={'/Shop'} component={Menu}/>
                        <Route path={'/Club'} component={Menu}/>
                        <Route path={'/Top'} component={Menu}/>
                        <Route path={'/Garage'} component={Menu}/>
                        <Route path={'/UserPage'} component={Menu}/>
                        <Route path={'/Chat'} component={Menu}/>
                        <Route path={'/Summary'} component={Menu}/>
                        <Route path={'/AdminLogin'} component={AdminLogin}/>
                        <Route path={'/AdminHome'} component={AdminHome}/>
                        <Route path={'/AddVehicle'} component={AddVehicle}/>
                        <Route path={'/AddEngine'} component={AddEngine}/>
                        <Route path={'/AddStops'} component={AddStops}/>
                        <Route path={'/AddWheels'} component={AddWheels}/>
                        <Route path={'/AddNos'} component={AddNos}/>
                        <Route path={'/AddTurbo'} component={AddTurbo}/>
                        <Route path={'/AddPart'} component={AddPart}/>
                    </Switch>
                </div>
            </Router>
    );
}

export default App;
