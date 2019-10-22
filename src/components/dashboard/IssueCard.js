// Purpose of the file to display individual issues
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditIssueForm from "./EditIssueForm"
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";



class IssueCard extends Component {

	state = {
		helpingUserId: null,
		issueId: "",
		modal: false,
	};

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	activeUserId = parseInt(sessionStorage.getItem("userId"))

	handleDelete = id => {
		APIManager.delete("issues", id)
			.then(() => { this.props.getData() }
			);
	}

	lendAHand = (issueId, id, helpingUser) => {
		APIManager.get("issues", issueId)
			.then((APIManager.insert("issues", id, helpingUser)
				.then(() => { this.props.getData() }
				)));
	}

	render() {
		const closeBtn = (
			<button className="close" onClick={this.toggle}>
				&times;
			</button>
		);
		return (
			<>
				<div className="issue-card">
					<div className="issue-card-content">
						<h3>
							{this.props.issue.issueName}
							<span className="card-issueTitle"></span>
						</h3>

						<p><em>Additional Details:</em><br></br>{this.props.issue.issueDescription}</p>

						<p>Deadline: {this.props.issue.issueDeadline}</p>

						{this.props.activeUserId !== this.props.issueUserId && this.props.activeUserId !== this.props.helpingUserId ?
							<>
								<div className="card-buttons">
									<Button color="primary"
									type="button" className="accept-issue"
									onClick={() => {
										if (window.confirm("Lend this person a hand?")) {
											console.log(this.props.issueId)
											this.lendAHand(this.props.issueId, this.props.issueId, this.activeUserId);
										}
										else { }
									}}
								>Lend a Hand?</Button>
								</div>
							</>
							: null
						}

						{this.props.activeUserId === this.props.helpingUserId ?
							<>
								<div className="card-buttons">

									<Button color="danger"
										type="button" className="cancel-issue"
										onClick={() => {
											window.confirm("Change your mind?")
										}}
									>Drop Issue
									</Button>
									<Button color="primary"
										type="button" className="complete-issue"
										onClick={() => {
											window.confirm("Did you lend a hand?")
										}}
									>Task Complete!
									</Button>
								</div>
							</>
							: null
						}


						{(this.props.activeUserId === this.props.issueUserId) ?
							<>
								<div className="card-buttons">
									<Button
										color="danger"
										type="button"
										className="delete-issue"
										onClick={() =>
											this.handleDelete(this.props.issue.id)
										}
									>
										Delete
								</Button>

									<Button
										color="secondary"
										type="button"
										className="edit-issue"
										onClick={() => {
											this.toggle()
										}}
									>
										Edit
						</Button>
								</div>
							</>
							: null
						}
					</div>


					<Modal
						isOpen={this.state.modal}
						toggle={this.toggle}
						className={this.props.className}
					>
						<ModalHeader
							toggle={this.toggle}
							close={closeBtn}>
							Edit issue
							</ModalHeader>
						<ModalBody>
							<EditIssueForm {...this.props} issueId={this.props.issue.id} getData={this.props.getData} toggle={this.toggle} />
						</ModalBody>


					</Modal>

				</div>

			</>
		);
	}
}

export default IssueCard;