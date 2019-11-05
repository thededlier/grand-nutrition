import React from 'react';
import '../App.css';
import history from "../history";
import SignInComponent from "./SignIn/SignIn.component";
import SignUp from "./SignUp/SignUp.component";
import {Route, Router} from 'react-router-dom';
import DashboardContainer from "../containers/Dashboard.container";
import MenuAppBarContainer from "../containers/MenuAppBar.container";


function App() {
  return (
      <React.Fragment>
          <MenuAppBarContainer/>
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
