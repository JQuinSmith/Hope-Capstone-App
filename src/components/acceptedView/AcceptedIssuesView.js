import React, { Component } from "react"
import AcceptedIssuesList from "./AcceptedIssuesList"

class AcceptedIssuesView extends Component {
    render() {
        return (
            <div>
                <AcceptedIssuesList
                user={this.props.user}/>

            </div>
        );
    }
}


export default AcceptedIssuesView