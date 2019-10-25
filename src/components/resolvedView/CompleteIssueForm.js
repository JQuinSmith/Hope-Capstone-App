import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import "../dashboard/issues.css";

class CompleteIssueForm extends Component {
    state = {
        comment: {},
        commentInput: "",
        loadingStatus: true,
        modal: false,
        activeUser: parseInt(sessionStorage.getItem("userId"))
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addComment = evt => {
        evt.preventDefault();
        this.props.toggle();
        this.setState({ loadingStatus: true });
        const addedComment = {
            userId: this.state.activeUser,
            issueId: this.props.issueId,
            comment: this.state.commentInput
        };
        console.log(addedComment)
        APIManager.post("comments", addedComment)
            .then((responseComments => {
                this.setState({
                    comment: responseComments
                });
                console.log(this.state.comment.comment);
            }))
    };


    componentDidMount() {
        return APIManager.get("issues", this.props.issueId)
            .then(
                issue => {
                    this.setState({
                        issueName: issue.issueName,
                        issueDescription: issue.issueDescription,
                        issueDeadline: issue.issueDeadline,
                        loadingStatus: false
                    });
                    APIManager.getComment("comments", this.props.issueId)
                        .then(
                            comment => {
                                this.setState({
                                    comment: comment,
                                    loadingStatus: false
                                })
                            }
                        )
                })
    };

    render() {

        return (
            <>
                <ModalBody>
                    <div>
                        <div className="formgrid">

                            <h5 htmlFor="issueName">Issue Title</h5>
                            <p>{this.state.issueName}</p>


                            <h5 htmlFor="issueDescription">Entry</h5>
                            <p>{this.state.issueDescription}</p>

                            <h5 htmlFor="issueDeadline">Date of Completion</h5>
                            <p>{this.state.issueDeadline}</p>

                            <h5 htmlFor="comment">Comments</h5>
                            <p>{this.state.comment.comment}</p>

                        </div>
                        <div className="alignRight">

                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div>
                        <FormGroup>
                            <Label for="commentInput">Quick Notes About Your Experience:</Label>
                            <Input onChange={this.handleFieldChange}
                                type="textarea"
                                name="commentInput"
                                id="commentInput" />
                        </FormGroup>
                    </div>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={(evt) => {
                            this.addComment(evt)
                        }}
                        className="btn btn-primary"
                    >
                        Submit
							</Button>
                    <Button className="cancel" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </>
        )
    }
}

export default CompleteIssueForm;
