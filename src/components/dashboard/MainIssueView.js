import React, { Component } from "react"
import IssueList from "./IssueList"
import "./issues.css"

class Dashboard extends Component {

render() {
    return (
        <div>

            <h1 className="header">This is the Dashboard</h1>
            <IssueList 
            user={this.props.user}/>

        </div>
    );
}
}

export default Dashboard;