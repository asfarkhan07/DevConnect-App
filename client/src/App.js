import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";
import Alert from "./components/layout/Alert";
//Redux
import { Provider, useDispatch } from 'react-redux';
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
          <Navbar />
          <section className="cont">
            <Alert />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profiles" element={<Profiles/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-profile"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
               <Route
                path="/posts/:id"
                element={
                  <PrivateRoute>
                    <Post />
                  </PrivateRoute>
                }
              />
              <Route 
              path="/AddExperience"
              element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                }
                />
                <Route 
              path="/posts"
              element={
                  <PrivateRoute>
                    <Posts />
                  </PrivateRoute>
                }
                />
                <Route
                path="/AddEducation"
                element={
                  <PrivateRoute>
                    <AddEducation />
                  </PrivateRoute>
                }
              />
            </Routes>
          </section>
        </Fragment>
  )
}

const App = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <AppContent/>
      </Router>
    </Provider>
  );
};

export default App;
