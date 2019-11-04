import React from 'react';
import '../App.css';
import MenuAppBar from "./MenuAppBar/MenuAppBar.component";
import history from "../history";
import SignInComponent from "./SignIn/SignIn.component";
import SignUp from "./SignUp/SignUp.component";
import {Route, Router} from 'react-router-dom';
import DashboardContainer from "../containers/Dashboard.container";


function App() {
  return (
      <React.Fragment>
          <MenuAppBar/>
          <Router history={history}>
              <div>
                  <Route exact path="/" component={SignInComponent} />
                  <Route path="/signin" component={SignInComponent} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/dashboard" component={DashboardContainer} />
              </div>
          </Router>
      </React.Fragment>
  );
}

export default App;
