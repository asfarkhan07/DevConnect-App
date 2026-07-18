import React, { Fragment } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div
      style={{
        textAlign: "right",
        display: "flex",
        justifyContent: "right",
        width: "77%",
        position: "relative",
        bottom: "50px",
        left: "22%",
      }}
    >
      <ul>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/profiles">
            Developers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/posts">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a onClick={logout} className="logout btn" href="#!" style={{position:'relative',bottom:'6px',color:'white'}}>
            {" "}
            Logout
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div
      style={{
        "text-align": "right",
        display: "flex",
        "justify-content": "right",
        position: "relative",
        width: "100%",
        bottom: "39px",
      }}
    >
      <ul>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/profiles">
            Developers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="first-div-navbar">
        <h2>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            {"</>"}DevConnector
          </Link>
        </h2>
      </div>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { logout })(Navbar);
