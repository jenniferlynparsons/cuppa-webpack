import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logoutUser } from "../../../actions/authActions";
import NavBar from "./NavBar";

class NavBarContainer extends Component {
  state = {
    menuActive: false,
    dropdownActive: false
  };

  handleNavToggle = () => {
    this.setState(prevState => ({
      menuActive: !prevState.menuActive
    }));
  };

  handleDropDownToggle = () => {
    this.setState(prevState => ({
      dropdownActive: !prevState.dropdownActive
    }));
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.handleDropDownToggle();
    this.props.logoutUser();
  };

  render() {
    return (
      <NavBar
        auth={this.props.auth}
        menuActive={this.state.menuActive}
        dropdownActive={this.state.dropdownActive}
        handleNavToggle={this.handleNavToggle}
        handleDropDownToggle={this.handleDropDownToggle}
        handleLogoutClick={this.handleLogoutClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBarContainer);

export const NavBarContainerComponent = NavBarContainer;

NavBarContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
