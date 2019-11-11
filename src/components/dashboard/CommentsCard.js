import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import CompleteIssueForm from "../resolvedView/CompleteIssueForm";
import EditCompleteIssueForm from "../resolvedView/EditCompleteIssueForm";


export default class CommentsCard extends Component {

    state = {
        modal: false,
        commentModal: false,
        editCommentModal: false,
    };

    commentToggle = () => {
        this.setState(prevState => ({
            commentModal: !prevState.commentModal
        }))
    }

    editCommentToggle = () => {
        this.setState(prevState => ({
            editCommentModal: !prevState.editCommentModal
        }))
    }

    render() {
        console.log(this.props.comment.comment)

        const commentCloseBtn = (
            <button className="close" onClick={this.commentToggle}>
                &times;
			</button>
        );
        const editCloseBtn = (
            <button className="close" onClick={this.editCommentToggle}>
                &times;
			</button>
        );

        return (
            <>
                <p className="comment">{this.props.comment.user.name}: {this.props.comment.comment}</p>

                <Modal
                    isOpen={this.state.commentModal}
                    toggle={this.commentToggle}
                    className={this.props.className}
                >
                    <ModalHeader
                        toggle={this.commentToggle}
                        close={commentCloseBtn}>
                        Issue Resolved - Leave a Comment!
							</ModalHeader>

                    <ModalBody>

                        <CompleteIssueForm
                            key={this.props.issue.id}
                            {...this.props}
                            commentStateUpdate={this.commentStateUpdate}
                            issueId={this.props.issue.id}
                            getData={this.props.getData}
                            toggle={this.commentToggle} />
                    </ModalBody>


                </Modal>

                <Modal
                    isOpen={this.state.editCommentModal}
                    toggle={this.editCommentToggle}
                    className={this.props.className}
                >
                    <ModalHeader
                        toggle={this.editCommentToggle}
                        close={editCloseBtn}>
                        Issue Resolved - Edit Your Comment!
							</ModalHeader>
                    <ModalBody>

                        <EditCompleteIssueForm
                            key={this.props.issue.id}
                            {...this.props}
                            commentStateUpdate={this.props.commentStateUpdate}
                            issueId={this.props.issue.id}
                            issue={this.props.issue}
                            commentId={this.props.comment.id}
                            getData={this.props.getData}
                            toggle={this.editCommentToggle} />

                    </ModalBody>
                </Modal>

                {this.props.activeUserId === this.props.comment.userId && this.props.issue.issueComplete === true ?
                    <>
                        <div className="card-buttons">
                            <Button outline color="info"
                                type="button" className="edit-comment"
                                onClick={() => {
                                    this.editCommentToggle()
                                }}
                            >Edit Comments
                            </Button>

                            <Button outline color="success"
                                type="button" className="add-comment"
                                onClick={() => {
                                    this.commentToggle();
                                }}
                            >Add Comments
                            </Button>
                        </div>
                    </>
                    : null
                }
            </>
        )
    }

}