// Purpose of the file to display all issues
import React, { Component } from "react";
import IssueCard from "../dashboard/IssueCard";
import APIManager from "../../modules/APIManager";

class MyIssuesList extends Component {
    //define what this component needs to render
    state = {
        issues: [],
        comments: [],
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    deleteissue = id => {
        APIManager.delete("issues", id).then(() => {
            APIManager.getAll("issues").then(newissues => {
                this.setState({
                    issues: newissues
                });
            });
        });
    };

    getData = () => APIManager.getAll("issues").then(issues => {
        this.setState({
            issues: issues
        });
    });

    componentDidMount() {
        //getAll from APIManager and hang on to that data; put it in state
        APIManager.getAllMy("issues", this.activeUserId).then(issues => {
            this.setState({
                issues: issues
            });
            APIManager.getComment("comments", this.activeUserId)
                .then(
                    comment => {
                        this.setState({
                            comments: comment,
                            loadingStatus: false
                        })
                    });
        });
    }

    render() {
        return (
            <>
                <div className="issues-container">
                    <div className="issues-intro">
                        <h2>My Issues List</h2>
                    </div>
                    <div className="issue-container-cards">
                        {this.state.issues.map(issue => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                                deleteIssue={this.deleteIssue}
                                user={this.props.user}
                                activeUserId={this.activeUserId}
                                issueUserId={issue.userId}
                                {...this.props}
                                getData={this.getData}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default MyIssuesList;
