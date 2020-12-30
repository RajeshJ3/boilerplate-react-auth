import { Component } from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignUpComponent from "./components/auth/signup";
import SignUpEmailSent from "./components/auth/signup/emailSent";
import SignUpEmailVerify from "./components/auth/signup/verifyEmail";

import LogInComponent from "./components/auth/login";
import ForgotPasswordComponent from "./components/auth/login/forgotPassword";
import ForgotPasswordEmailSentComponent from "./components/auth/login/emailSent";
import ResetPassword from "./components/auth/login/resetPassword";

import NotFoundComponent from "./components/errors/NotFound";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" render={() => <SignUpComponent {...this.props} />} />
          <Route exact path="/signup/email-sent" render={() => <SignUpEmailSent {...this.props} />} />
          <Route exact path="/signup/verify-email/:key" render={(props) => <SignUpEmailVerify {...props} {...this.props} />} />

          <Route exact path="/login" render={() => <LogInComponent {...this.props} />} />
          <Route exact path="/login/forgot-password" render={() => <ForgotPasswordComponent {...this.props} />} />
          <Route exact path="/login/forgot-password/email-sent" render={() => <ForgotPasswordEmailSentComponent {...this.props} />} />
          <Route exact path="/login/reset-password/:uid/:token" render={(props) => <ResetPassword {...props} {...this.props} />} />

          <Route path="*" component={NotFoundComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
