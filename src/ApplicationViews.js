// Purpose of the File: to house the routes/paths to each aspect of our app

import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/auth/Login"
// import Register from "./components/auth/Register"
import Dashboard from "./components/dashboard/MainIssueView";
import Register from "./components/auth/Register";



export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Dashboard user={this.props.user} {...props} />
            // Returns the component which will show the dashboard
          }}
        />

        <Route exact path="/login" render={props => {
          return <Login triggerRender={this.props.triggerRender} setUser={this.props.setUser} {...props} />
        }} />

        <Route exact path="/register" render={props => {
          return <Register triggerRender={this.props.triggerRender} setUser={this.props.setUser} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
