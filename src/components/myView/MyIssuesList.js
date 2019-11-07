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

    deleteMyIssue = id => {
        APIManager.delete("issues", id).then(() => {
            APIManager.getAllMy("issues", this.activeUserId).then(newissues => {
                this.setState({
                    issues: newissues
                });
            });
        });
    };

    getMyIssuesData = () => APIManager.getAllMy("issues", this.activeUserId).then(issues => {
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
            APIManager.getAllMy("comments", this.activeUserId)
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
                    <div className="issue-container-cards">
                        {this.state.issues.map(issue => (
                            <IssueCard
                                key={issue.id}
                                issue={issue}
                                deleteMyIssue={this.deleteMyIssue}
                                user={this.props.user}
                                activeUserId={this.activeUserId}
                                issueUserId={issue.userId}
                                {...this.props}
                                getMyIssuesData={this.getMyIssuesData}
                            />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default MyIssuesList;
