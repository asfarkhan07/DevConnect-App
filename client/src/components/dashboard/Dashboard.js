import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount } from "../../actions/profile";
import './Dashboard.css'

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth,
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="dashboard">

      <h1 style={{ "fontFamily": "cursive", color: "#278bcd" }}>Dashboard</h1>
      <p>
        <i></i>Welcome, {auth.user && auth.user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions/>
          <Experience experience={profile.experience}/>
          <Education education={profile.education}/>
          <div className="my-2">
            <button className="btn btn-danger" onClick={()=> deleteAccount() }>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile,please add some information</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
