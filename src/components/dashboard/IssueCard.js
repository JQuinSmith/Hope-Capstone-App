// Purpose of the file to display individual issues
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import EditIssueForm from "./EditIssueForm"
import CompleteIssueForm from "../resolvedView/CompleteIssueForm"
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";



class IssueCard extends Component {

	state = {
		helpingUserId: null,
		issueId: "",
		comments: [],
		modal: false,
		commentModal: false
	};

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	commentToggle = () => {
		this.setState(prevState => ({
			commentModal: !prevState.commentModal
		}))
	}

	activeUserId = parseInt(sessionStorage.getItem("userId"))
	activeUsername =(sessionStorage.getItem("name"))

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

	completeIssue = (issueId, id, issueComplete) => {
		APIManager.get("issues", issueId)
			.then((APIManager.complete("issues", id, issueComplete)
				.then(() => { this.props.getData() }
				)));
	}

	componentDidMount() {
		APIManager.getComment("comments", this.props.issueId)
			.then(
				comment => {
					this.setState({
						comments: comment,
						loadingStatus: false
					})
				}
			)
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
												console.log(this.props.issue.id)
												this.lendAHand(this.props.issue.id, this.props.issue.id, this.activeUserId);
											}
											else { }
										}}
									>Lend a Hand?</Button>
								</div>
							</>
							: null
						}

						{this.props.activeUserId === this.props.helpingUserId && this.props.issue.issueComplete === false ?
							<>
								<div className="card-buttons">

									<Button color="danger"
										type="button" className="cancel-issue"
										onClick={() => {
											if (window.confirm("Change your mind?")) {
												this.lendAHand(this.props.issueId, this.props.issueId, null);
												this.completeIssue(this.props.issueId, this.props.issueId, false);
											} else { }
										}}
									>Drop Issue
									</Button>
									<Button color="success"
										type="button" className="complete-issue"
										onClick={() => {
											if (window.confirm("Did you lend a hand?")) {
												this.completeIssue(this.props.issueId, this.props.issueId, true);
											} else { }
										}}
									>Task Complete!
									</Button>
								</div>
							</>
							: null
						}

						{this.props.activeUserId === this.props.helpingUserId || this.props.activeUserId === this.props.issueUserId && this.props.issue.issueComplete === true ?

							<>
								<p>Comments: </p>
								{this.activeUsername}: {this.state.comments.map(oneComment => <p>{oneComment.comment}</p>)}
								<div className="card-buttons">

									<Button color="secondary"
										type="button" className="complete-issue"
										onClick={() => {
											this.commentToggle();
										}}
									>Edit Comments!
									</Button>
									<Button color="success"
										type="button" className="complete-issue"
										onClick={() => {
											this.commentToggle();
										}}
									>Add Comments!
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
							<EditIssueForm
								{...this.props}
								issueId={this.props.issue.id}
								getData={this.props.getData}
								toggle={this.toggle} />
						</ModalBody>


					</Modal>

					<Modal
						isOpen={this.state.commentModal}
						toggle={this.commentToggle}
						className={this.props.className}
					>
						<ModalHeader
							toggle={this.commentToggle}
							close={closeBtn}>
							Issue Resolved - Leave a Comment!
							</ModalHeader>
						<ModalBody>
							<CompleteIssueForm
								{...this.props}
								issueId={this.props.issue.id}
								getData={this.props.getData}
								toggle={this.commentToggle} />
						</ModalBody>


					</Modal>


				</div>

			</>
		);
	}
}

export default IssueCard;