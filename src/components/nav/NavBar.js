import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './NavBar.css'



class NavBar extends Component {

    isAuthenticated = () => sessionStorage.getItem("activeUser") !== null

    logOut = (event) => {
        this.props.clearUser()
        this.props.triggerRender()
        this.props.history.push("/login")
    }


    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 ">
                <ul className="nav nav-pills nav-fill">
                    {(this.props.user) ?
                    <>
                    <li><span className="nav-link" onClick={this.logOut}>Logout</span></li>
                    </>
                    : null
                }
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar);
