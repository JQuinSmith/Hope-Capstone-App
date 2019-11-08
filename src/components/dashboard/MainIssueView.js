import React, { Component } from "react"
import IssueList from "./IssueList"
import "./issues.css"




class Dashboard extends Component {

    render() {
        return (
            <>
                <div>

                    <IssueList
                        user={this.props.user} />

                </div>
            </>
        );
    }
}

export default Dashboard;