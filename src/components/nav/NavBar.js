import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
import { Navbar } from 'reactstrap'



class NavigationBar extends Component {

    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

    logOut = (event) => {
        this.props.clearUser()
        this.props.triggerRender()
        this.props.history.push("/login")
    }


    render() {
        return (
            <Navbar className="navbar navbar-light light-blue flex-md-nowrap p-0">
                <ul className="nav nav-pills nav-fill">
                    {(this.props.user) ?
                        <>
                            <li><span className="nav-link" onClick={null}>My Issues</span></li>

                            <li><span className="nav-link" onClick={null}>My Open Issues</span></li>

                            <li><span className="nav-link" onClick={null}>My Resolved Issues</span></li>

                            <li><span className="nav-link" onClick={this.logOut}>Logout</span></li>
                        </>
                        : null
                    }
                </ul>
            </Navbar>
        )
    }
}

export default withRouter(NavigationBar);
