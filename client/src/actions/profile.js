import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,CLEAR_PROFILE,ACCOUNT_DELETED, GET_PROFILES,GET_REPOS } from "./types";

// Utility to set token in axios headers
// const setAuthToken = token => {
//   if (token) {
//     axios.defaults.headers.common['x-auth-token'] = token;
//   } else {
//     delete axios.defaults.headers.common['x-auth-token'];
//   }
// };


// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Set token from localStorage or wherever you store it
    const token = localStorage.getItem("token");
    setAuthToken(token);
    console.log(token); // Log the token for debugging

    const res = await axios.get("/api/profile/me");
    console.log("Profile data:", res.data); // Log the response data for debugging
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    console.log("Error fetching profile:", err.response); // Log the error for debugging
  }
};

//Get All Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({type:CLEAR_PROFILE,})
  try {
    const res= await axios.get('/api/profile');
    dispatch({
      type:GET_PROFILES,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
    });
  }
}

//Get Profile by ID
export const getProfilebyId=(userId)=> async (dispatch)=>{
  try {
    const res=await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type:GET_PROFILE,
      payload:res.data
    });

  } catch (err) {
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
    })
  }
}

//Get Github Repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res= await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type:GET_REPOS,
      payload:res.data
    });
  } catch (err) {
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText,status:err.response.status}
    });
  }
}



//Create or Update a profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success"),
      );
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

//Add Experience
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : err.message,
        status: err.response ? err.response.status : 500,
      },
    });
  }
};


//Add Education
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : err.message,
        status: err.response ? err.response.status : 500,
      },
    });
  }
};


//Delete Experience by ID
export const deleteExperience= id => async dispatch =>{
  try {
    const res=await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data,
    });
    dispatch(setAlert("Experience removed", "success"));
    
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : err.message,
        status: err.response ? err.response.status : 500,
      },
    });
  }
}

//Delete Education by ID
export const deleteEducation= id => async dispatch =>{
  try {
    const res=await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data,
    });
    dispatch(setAlert("Education removed", "success"));
    
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : err.message,
        status: err.response ? err.response.status : 500,
      },
    });
  }
}

//DELETE account and profile
export const deleteAccount=() => async dispatch =>{
  if(window.confirm('Are you sure?This cannot be undone.')){
  try {
    await axios.delete(`/api/profile`);
    dispatch({
      type:CLEAR_PROFILE,
    });
    dispatch({
      type:ACCOUNT_DELETED,
    });
    dispatch(setAlert("Account and profile deleted", "success"));
    
  } catch (err) {
    const errors =
      err.response && err.response.data && err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : err.message,
        status: err.response ? err.response.status : 500,
      },
    });
  }
}
}