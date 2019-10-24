import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, FormGroup, Label, Input, ModalFooter } from "reactstrap";

class CompleteIssueForm extends Component {
    state = {
        issueName: "",
        issueComplete: false,
        issueDescription: "",
        issueDeadline: "",
        loadingStatus: true,
        modal: false,
        activeUser: parseInt(sessionStorage.getItem("userId"))
    };

    componentDidMount() {
        return APIManager.get("issues", this.props.issueId)
            .then(
                issue => {
                    this.setState({
                        issueName: issue.issueName,
                        issueDescription: issue.issueDescription,
                        issueDeadline: issue.issueDeadline,
                        loadingStatus: false,
                    });
                });
    };

    render() {
        return (
            <>
                <ModalBody>
                    <form>
                        <fieldset>
                            <div className="formgrid">

                                <h5 htmlFor="issueName">Issue Title</h5>
                                <p>{this.state.issueName}</p>


                                <h5 htmlFor="issue">Entry</h5>
                                <p>{this.state.issueDescription}</p>

                                <h5 htmlFor="issue">Date of Completion</h5>
                                <p>{this.state.issueDeadline}</p>
                                <FormGroup>
                                    <Label for="exampleText">Tell About Your Experience:</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                            </div>
                            <div className="alignRight">

                            </div>
                        </fieldset>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={(evt) => {
                            this.updateExistingIssue(evt)
                            this.props.toggle()
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
