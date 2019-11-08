// Purpose of the file to display all issues
import React, { Component } from "react";
import IssueCard from "../dashboard/IssueCard";
import APIManager from "../../modules/APIManager";
import AddIssueForm from "./AddIssueForm";
import ReactMap from "../map/Map"
import "./issues.css";

class IssueList extends Component {
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

    deleteIssue = id => {
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
        APIManager.getAll("issues").then(issues => {
            this.setState({
                issues: issues
            });
        });
    }

    render() {
        return (
            <>
                <AddIssueForm
                    {...this.props}
                    getData={this.getData} />
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

export default IssueList;
