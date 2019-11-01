import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import "../dashboard/issues.css";

class EditCompleteIssueForm extends Component {

    state = {
        comment: "",
        issueId: "",
        activeUserName: "",
        activeUser: parseInt(sessionStorage.getItem("userId")),
        loadingStatus: true,
        modal: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateComment = evt => {
        evt.preventDefault();
        this.props.toggle();
        // this.setState({ loadingStatus: true });
        const updatedComment = {
            id: parseInt(this.props.issueId),
            activeUserName: this.state.activeUserName,
            comment: this.state.commentInput,
            issueId: parseInt(this.props.issueId),
            userId: this.state.activeUser
        }
        APIManager.update("comments", updatedComment)
        .then(() => this.props.commentStateUpdate())

    };

    componentDidMount() {
		return APIManager.get("comments", this.props.issueId)
			.then(
				comment => {
					this.setState({
						activeUserName: comment.activeUserName,
						issueId: comment.issueId,
						comment: comment.comment,
						loadingStatus: false,
                    });
				});
	};

    render() {console.log("this is state", this.state)
        return (
            <>
                <ModalBody>
                    <div>
                        <div className="formgrid">

                            <h5 htmlFor="comment">Comments</h5>
                            {this.state.activeUserName}: {this.state.comment}

                        </div>
                        <div className="alignRight">

                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <div>
                        <FormGroup>
                            <Label for="commentInput">Something you forgot to add?</Label>
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
                            this.updateComment(evt)
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

export default EditCompleteIssueForm;
