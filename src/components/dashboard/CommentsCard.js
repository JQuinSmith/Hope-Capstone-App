import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";


export default class CommentsCard extends Component {

    render() {
        console.log(this.props.comment.comment)
        return (
            <>
                <p className="comment">{this.props.comment.user.name}: {this.props.comment.comment}</p>
                <div className="card-buttons">

                    <Button outline color="info"
                        type="button" className="edit-comment"
                        onClick={() => {
                            this.setState({
                                editCommentId: this.props.comment.id
                            },
                                this.editCommentToggle
                            )
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
        )
    }

}