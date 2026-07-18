import React from 'react';
import '../../App.css';
import { Link, Navigate } from 'react-router-dom';
import {connect}  from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner'

function Landing({ isAuthenticated,loading}) {
  if (loading) {
    return <Spinner/>; // or a spinner component while auth state is loading
  }



  if(isAuthenticated) {
    return <Navigate to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='darkoverlay'>
        <h1 className='x-large'>DevConnector</h1>
        <p style={{'font-family': 'cursive'}}>Create a developer profile/portfolio, share posts and get help from other <span style={{'color':'white'}}>developers</span></p>
        <div className='buttons'>
          <Link to='/register' style={{'background-color': 'rgb(96, 177, 235)','color':'white','border':'2px','borderRadius':'5px'}}>Sign up</Link>
          <Link to='/login' style={{'background-color': 'white','color':'black','border':'2px','borderRadius':'5px'}}>Login</Link>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})

export default connect(mapStateToProps)(Landing)