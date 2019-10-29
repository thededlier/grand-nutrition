import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Router as Router, Route} from 'react-router-dom';

import SignInComponent from "./components/SignIn/SignIn.component";
import SignUp from "./components/SignUp/SignUp.component";
import MenuAppBar from "./components/MenuAppBar/MenuAppBar.component";
import history from "./history";
import Dashboard from "./components/Dashboard/Dashboard.component";


const routing = (
    <React.Fragment>
    <MenuAppBar/>
    <Router history={history}>
        <div>
            <Route exact path="/" component={SignInComponent} />
            <Route path="/signin" component={SignInComponent} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
        </div>
    </Router>
    </React.Fragment>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
