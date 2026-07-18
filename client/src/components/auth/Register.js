import React, { Fragment, useState } from "react";
import "./Register.css";
import { Link ,Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register,isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password doesnt match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return (
    <Fragment>
      <div className="signuppage">
        <div className="signupsign">
          <h1>Sign Up</h1>
        </div>
        <div className="accountmsg">
          <p>Create your Account</p>
        </div>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter Name"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Enter email"
          />
          <small>
            This site uses gravatar,so if you want a profile image use a
            gravatar email
          </small>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Enter password"
          />
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
          />
          <button type="submit">Submit</button>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
};

const mapStatetoProps= state => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStatetoProps, { setAlert, register })(Register);
