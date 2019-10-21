import React, { Component } from "react"
import ResolvedIssuesList from "./ResolvedIssuesList"
// import "./issues.css"

class ResolvedIssuesView extends Component {

render() {
    return (
        <div>

            <h1 className="header">This is the Resolved Issues View</h1>
            <ResolvedIssuesList 
            user={this.props.user}/>

        </div>
    );
}
}

export default ResolvedIssuesView;