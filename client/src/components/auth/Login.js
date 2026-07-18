import React,{Fragment,useState} from 'react';
import { Link , Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './Login.css'

const Login = ({ login,isAuthenticated }) => {
    const [formData, setFormData ] = useState({
        email:'',
        password:''
      });
    
      const{email,password}=formData;
    
      const onChange = e => setFormData({...formData, [e.target.name]:e.target.value})
    
      const onSubmit = e =>{
        e.preventDefault();
        login(email,password)
      }

      // //Redirect if loggedIn
      if(isAuthenticated){
      return <Navigate to="/dashboard"/>
      }
    
      return (
        <Fragment>
          <div className="signinpage">
            <div className="signinsign">
              <h1>Sign In</h1>
            </div>
            <form className="form" onSubmit={onSubmit}>
              <input type="email" name="email" value={email} onChange={e=> onChange(e)} placeholder="Enter email"/>
              <input
                type="password"
                name="password"
                value={password}
                onChange={e=> onChange(e)}
                placeholder="Enter password"
          
              />
              <button type="submit">Submit</button>
              <p>
                Dont have an Account?<Link to="/login">Sign up</Link>
              </p>
            </form>
          </div>
        </Fragment>
  )
}

Login.propTypes={
  login:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStatetoProps= state => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStatetoProps,{ login })(Login)
