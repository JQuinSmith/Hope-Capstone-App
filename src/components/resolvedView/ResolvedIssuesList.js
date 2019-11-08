// Purpose of the file to display all issues
import React, { Component } from "react";
import IssueCard from "../dashboard/IssueCard";
import ReactMap from "../map/Map"
import APIManager from "../../modules/APIManager";

class ResolvedIssuesList extends Component {
    //define what this component needs to render
    state = {
        issues: [],
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

    getData = () => APIManager.getAllMyResolved("issues", this.activeUserId)
        .then(issues => {
            this.setState({
                issues: issues
            });
        });

    componentDidMount() {
        //getAll from APIManager and hang on to that data; put it in state
        APIManager.getAllMyResolved("issues", this.activeUserId)
            .then(issues => {
                this.setState({
                    issues: issues
                });
                APIManager.getComment(this.props.issueId)
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
                                issueId={issue.id}
                                deleteIssue={this.deleteIssue}
                                user={this.props.user}
                                activeUserId={this.activeUserId}
                                issueUserId={issue.userId}
                                helpingUserId={issue.helpingUserId}
                                issueComplete={issue.issueComplete}
                                {...this.props}
                                getData={this.getData}
                            />
                        ))}
                    </div>
                    <div className="AppWrapper">
                        <div className="Container">
                            <ReactMap />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ResolvedIssuesList;
