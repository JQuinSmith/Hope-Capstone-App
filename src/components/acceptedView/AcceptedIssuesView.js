import React, { Component } from "react"
import AcceptedIssuesList from "./AcceptedIssuesList"

class AcceptedIssuesView extends Component {
    render() {
        return (
            <div>

                <h1 className="header">This is the Accepted Issues View</h1>
                <AcceptedIssuesList 
                user={this.props.user}/>

            </div>
        );
    }
}


export default AcceptedIssuesView