import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'
import { Navbar } from 'reactstrap'



class NavigationBar extends Component {

    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null
    activeUserName = (sessionStorage.getItem("name"))


    logOut = (event) => {
        this.props.clearUser()
        this.props.triggerRender()
        this.props.history.push("/login")
    }


    render() {
        return (
            <Navbar className="navbar navbar-light light-blue flex-md-nowrap p-0">

                {(this.props.user) ?
                    <>
                        <h4 className="welcome-sign">Welcome, {this.activeUserName}!</h4>
                        <ul className="nav nav-pills nav-fill">

                            <li><Link className="nav-link" to="/">Home</Link></li>

                            <li><Link className="nav-link" to="/myissues">My Issues</Link></li>

                            <li><Link className="nav-link" to="/acceptedissues">My Accepted Issues</Link></li>

                            <li><Link className="nav-link" to="/resolvedissues">My Resolved Issues</Link></li>

                            <li><Link className="nav-link" to="/login" onClick={this.logOut}>Logout</Link></li>
                </ul>
                        </>
                        : null
                    }
            </Navbar>
        )
    }
}

export default withRouter(NavigationBar);
