import React, { Component } from "react"
import MyIssuesList from "./MyIssuesList"

class MyIssuesView extends Component {

    render() {
        return (
            <div>
                <MyIssuesList
                user={this.props.user} />

            </div>
        );
    }
}

    export default MyIssuesView;