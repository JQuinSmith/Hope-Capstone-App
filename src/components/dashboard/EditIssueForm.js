// Purpose of the file to hold edit issue form function
import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button, ModalBody, ModalFooter } from "reactstrap";
import "./issues.css";

const uploadPreset = 'hopeapp';
const uploadURL = 'https://api.cloudinary.com/v1_1/hopeapp/image/upload';

class EditIssueForm extends Component {
	//set the initial state
	state = {
		issueName: "",
		issueComplete: false,
		issueDescription: "",
		issueDeadline: "",
		imageURL: "",
		uploadedFile: "",
		loadingStatus: true,
		modal: false,
		activeUser: parseInt(sessionStorage.getItem("userId"))
	};

	onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(uploadURL)
            .field('upload_preset', uploadPreset)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    imageURL: response.body.secure_url
                });
            }
        });
    }

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
			imageURL: this.state.imageURL,
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
						imageURL: issue.imageURL,
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
							<br></br>
							<div>
								<Dropzone
									onDrop={this.onImageDrop.bind(this)}
									accept="image/*"
									multiple={false}>
									{({ getRootProps, getInputProps }) => {
										return (
											<div className="dropped-image"
												{...getRootProps()}
											>
												<input {...getInputProps()} />
												{
													<p>Try dropping some files here, or click to select files to upload.</p>
												}
											</div>
										)
									}}
								</Dropzone>
							</div>
							<div>
								{this.state.imageURL === '' ? null :
									<div>
										<p>{this.state.uploadedFile.name}</p>
										<img className="preview-img" src={this.state.imageURL} />
									</div>}
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
