import React from 'react';
import '../App.css';
import MenuAppBar from "./MenuAppBar/MenuAppBar.component";
import history from "../history";
import SignInComponent from "./SignIn/SignIn.component";
import SignUp from "./SignUp/SignUp.component";
import Dashboard from "./Dashboard/Dashboard.component";
import {Router, Route} from 'react-router-dom';


function App() {
  return (
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
}

export default App;
