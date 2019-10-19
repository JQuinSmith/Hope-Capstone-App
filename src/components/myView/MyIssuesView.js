import React, { Component } from "react"
import MyIssuesList from "./MyIssuesList"

class MyIssuesView extends Component {

    render() {
        return (
            <div>

                <h1 className="header">This is the My Issues View</h1>
                <MyIssuesList 
                user={this.props.user}/>

            </div>
        );
    }
}

    export default MyIssuesView;