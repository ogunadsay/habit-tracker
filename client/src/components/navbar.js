import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../reducers/authReducer';
import { Link } from "react-router-dom"

export class Navbar extends Component {

  render() {
    let isHidden = "";
    let isLogoutHidden = ""
    if (!this.props.userLoggedIn) {
      isHidden = "navbar-item";
      isLogoutHidden = "navbar-item has-dropdown is-hidden"
    }
    else {
      isHidden = "navbar-item is-hidden";
      isLogoutHidden = "navbar-item has-dropdown is-hoverable"
    }
    return (
      <nav id="navbar" className="navbar has-shadow is-info">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">Habit Tracker</Link>


            <div id="navbarBurger" className="navbar-burger burger" data-target="navMenuDocumentation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="navMenuDocumentation" className="navbar-menu">
            <div className="navbar-start">

            </div>

            <div className="navbar-end">
            <Link to="/login" className={isHidden}>Login</Link>
            <Link to="/register" className={isHidden}>Register</Link>
              <div className={isLogoutHidden}>
                <a className="navbar-link">

                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" onClick={this.props.logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return { userLoggedIn: state.authReducer.userLoggedIn }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
