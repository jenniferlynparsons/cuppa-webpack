import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

class NavBar extends React.PureComponent {
  render() {
    return (
      <nav
        className="navbar is-dark"
        role="navigation"
        aria-label="main navigation"
        data-testid="navbar"
      >
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to={this.props.auth.isAuthenticated ? "/tea-collection" : "/"}
          >
            Cuppa
          </Link>
        </div>
        <div className="navbar-menu is-active">
          <div className="navbar-start" />
          <div className="navbar-end">
            <Link className="navbar-item" to={"/tea-collection"}>
              Tea Collection
            </Link>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/">
                My Account
              </a>

              <div className="navbar-dropdown">
                <Link className="navbar-item" to={"/dashboard"}>
                  Dashboard
                </Link>
                <hr className="navbar-divider" />
                <span className="navbar-item">
                  <button
                    className="button is-small is-dark"
                    onClick={this.props.onLogoutClick}
                    data-testid="logout"
                  >
                    Logout
                  </button>
                </span>
              </div>
            </div>
            <ul>
              <li>
                <Link
                  className={
                    this.props.auth.isAuthenticated
                      ? "button is-primary"
                      : "button is-disabled"
                  }
                  to={"/new-tea"}
                >
                  Add a Tea
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
