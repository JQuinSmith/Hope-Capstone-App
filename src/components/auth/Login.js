// Purpose of the File: Landing page that holds the login and registration data and returns the login and registration input fields.
import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Register from "./Register"
import "./auth.css";
import APIManager from "../../modules/APIManager";


//Reactstrap Modal code from line 10 to 21
class Login extends Component {

    // Set initial state

    state = {
        name: "",
        email: "",
        password: "",
        userId: "",
        modal: false
    };

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()
        APIManager.getAll("users").then((users) => {
            let singleUser = users.find(
                user =>
                    user.password.toLowerCase() === this.state.password.toLowerCase() &&
                    user.email.toLowerCase() === this.state.email.toLowerCase()
            );
            if (this.state.email === "") {
                window.alert("Please enter email")
            } else if (this.state.password === "") {
                window.alert("Please enter password")
            } else if (this.state.name === "") {
                window.alert("Please enter your name")
            } else if (singleUser) {
                sessionStorage.setItem("userId", singleUser.id);
                sessionStorage.setItem("email", this.state.email);
                sessionStorage.setItem("name", this.state.name);
                this.props.triggerRender();
                this.props.history.push("/");
            } else {
                window.alert("Credentials do not match")
            }

        })
    }


    //Login modal code goes here. 👇
    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (
            <div>

                <div className="registrationDiv">
                    <Button
                        className="loginButton"
                        onClick={this.toggle}
                    >
                        Login
				</Button>

                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle} close={closeBtn}>
                            Please Sign In
					</ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.handleLogin}>
                                <fieldset>
                                    <div className="formgrid">
                                        <label htmlFor="inputEmail">Name</label><br></br>
                                        <input onChange={this.handleFieldChange} type="text"
                                            id="name"
                                            placeholder="Name"
                                            required="" autoFocus="" /><br></br>
                                        <label htmlFor="inputEmail">
                                            Email address
									</label>
                                        <br></br>
                                        <input
                                            onChange={this.handleFieldChange}
                                            type="email"
                                            id="email"
                                            placeholder="Email address"
                                            required=""
                                            autoFocus=""
                                        />
                                        <br></br>
                                        <label htmlFor="inputPassword">
                                            Password
									</label>
									<br></br>
									<input
										onChange={this.handleFieldChange}
										type="password"
										id="password"
										placeholder="Password"
										required=""
									/>
								</div>
							</fieldset>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.handleLogin}>
							Sign In!
						</Button>{" "}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
                        </ModalFooter>
                    </Modal>

                    {/* <Register /> calls the component Register and its contents from Register.js to display on the login page. */}
                    <Register triggerRender={this.props.triggerRender} {...this.props}/>
                </div>
            </div>
        );
    }

}

export default Login