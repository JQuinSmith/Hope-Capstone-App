// Purpose of the File: to house the routes/paths to each aspect of our app

import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/auth/Login"
import Dashboard from "./components/dashboard/MainIssueView";
import MyIssuesView from "./components/myView/MyIssuesView";
import AcceptedIssuesView from "./components/acceptedView/AcceptedIssuesView";
import ResolvedIssuesView from "./components/resolvedView/ResolvedIssuesView";


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
          return <Login triggerRender={this.props.triggerRender} user={this.props.user} {...props} />
        }} />

        <Route exact path="/myissues" render={props => {
          return <MyIssuesView triggerRender={this.props.triggerRender} user={this.props.user} {...props} />
        }} />

        <Route exact path="/acceptedissues" render={props => {
          return <AcceptedIssuesView triggerRender={this.props.triggerRender} user={this.props.user} {...props} />
        }} />

        <Route exact path="/resolvedissues" render={props => {
          return <ResolvedIssuesView triggerRender={this.props.triggerRender} user={this.props.user} {...props} />
        }} />

      </React.Fragment>
    );
  }
}
