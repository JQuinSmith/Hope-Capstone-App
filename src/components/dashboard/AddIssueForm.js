// Purpose of the file to hold add issue form function

import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../dashboard/issues.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fas fa-plus-circle fa-1x } from '@fortawesome/free-solid-svg-icons'

const uploadPreset = 'hopeapp';
const uploadURL = 'https://api.cloudinary.com/v1_1/hopeapp/image/upload';

class AddIssueForm extends Component {

    //set the initial state
    state = {
        issueName: "",
        issueComplete: false,
        issueDescription: "",
        issueDeadline: "",
        userId: "",
        helpingUserId: null,
        imageURL: "",
        uploadedFile: null,
        latitudeValue: null,
        longitudeValue: null,
        locationName: null,
        id: [],
        loadingStatus: true,
        modal: false
    };

    activeUserId = parseInt(sessionStorage.getItem("userId"))


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

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    addIssue = evt => {
        evt.preventDefault();
        this.toggle();
        if (this.state.issueName === "" || this.state.issueDescription === "" || this.state.issueDeadline === "") {
            window.alert("Please input an issue");
        } else {
            this.setState({ loadingStatus: true });
            const addedIssue = {
                userId: this.activeUserId,
                issueName: this.state.issueName,
                issueDescription: this.state.issueDescription,
                issueDeadline: this.state.issueDeadline,
                issueComplete: this.state.issueComplete,
                imageURL: this.state.imageURL,
                uploadedFile: this.state.uploadedFile,
                helpingUserId: this.state.helpingUserId,
                latitudeValue: this.state.latitudeValue,
                longitudeValue: this.state.longitudeValue,
                locationName: this.state.locationName
            };

            APIManager.post("issues", addedIssue)
                .then(() => { this.props.getData() }
                );
        };
    }
    render() {
        const closeBtn = (
            <button className="close" onClick={this.toggle}>
                &times;
				</button>
        );
        return (
            <>
                {" "}
                <Button outline color="secondary" className="addIssue" onClick={this.toggle}>
                    I need a hand!</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggle} close={closeBtn}>
                        What Did You Need Help With?
					</ModalHeader>
                    <ModalBody>
                        <form>
                            <fieldset>
                                <div className="formgrid">
                                    <label htmlFor="issueName">
                                        Give Your Issue a Name
									</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="issueName"
                                        value={this.state.issueName}
                                    />
                                    <br></br>
                                    <label htmlFor="issue">Any Details?</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="issueDescription"
                                        value={this.state.issueDescription}
                                    />
                                    <br></br>
                                    <label htmlFor="issue">How Long Do We Have?</label>
                                    <input
                                        type="date"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="issueDeadline"
                                        value={this.state.issueDeadline}
                                    />
                                    <br></br>
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
                                            <img alt="previewImg" className="preview-img" src={this.state.imageURL} />
                                        </div>}
                                </div>
                            </fieldset>
                        </form>
                    </ModalBody>
                <ModalFooter>
                    <Button
                        className="add"
                        onClick={this.addIssue}
                    >
                        Add
						</Button>{" "}
                    <Button className="cancel" onClick={this.toggle}>
                        Cancel
						</Button>
                </ModalFooter>
            </Modal>
            </>
        );
    }
}

export default AddIssueForm;
