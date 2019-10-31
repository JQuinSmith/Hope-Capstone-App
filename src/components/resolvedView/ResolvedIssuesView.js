import React, { Component } from "react"
import ResolvedIssuesList from "./ResolvedIssuesList"
// import "./issues.css"

class ResolvedIssuesView extends Component {

render() {
    return (
        <div>
            <ResolvedIssuesList
            key={this.props.user.id}
            user={this.props.user}/>

        </div>
    );
}
}

export default ResolvedIssuesView;