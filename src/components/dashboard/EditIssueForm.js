// Purpose of the file to hold edit issue form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { Button, ModalBody, ModalFooter} from "reactstrap";
import "./issues.css";

class EditIssueForm extends Component {
	//set the initial state
	state = {
		issueName: "",
		issueComplete: false,
		issueDescription: "",
		issueDeadline: "",
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
	};

	updateExistingIssue = evt => {
		evt.preventDefault();
		this.setState({ loadingStatus: true });
		const editedIssue = {
			id: parseInt(this.props.issueId),
			issueName: this.state.issueName,
			issueDescription: this.state.issueDescription,
			issueComplete: this.state.issueComplete,
			issueDeadline: this.state.issueDeadline,
			userId: this.state.activeUser
		};
		console.log(editedIssue)
		APIManager.update("issues", editedIssue)
			.then(() => { this.props.getData() }
			);
	}


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
		// const closeBtn = (
		// 	<button className="close" onClick={this.toggle}>
		// 		&times;
		// 	</button>
		// );
		return (
			<>
				<ModalBody>
					<form>
						<fieldset>
							<div className="formgrid">
								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="issueName"
									value={this.state.issueName}
								/>
								<label htmlFor="issueName">
									Issue Title
									</label>

								<input
									type="text"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="issueDescription"
									value={this.state.issueDescription}
								/>
								<label htmlFor="issue">Entry</label>

								<input
									type="date"
									required
									className="form-control"
									onChange={this.handleFieldChange}
									id="issueDeadline"
									value={this.state.issueDeadline}
								/>
								<label htmlFor="issue">Date of Completion</label>
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
		);
	}
}


export default EditIssueForm;
