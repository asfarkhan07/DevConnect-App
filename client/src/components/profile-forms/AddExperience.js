import React, { Fragment, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Props from "prop-types";
import { connect } from "react-redux";
import {addExperience} from "../../actions/profile";
import './AddExperienceandEducation.css'

const AddExperience=({ addExperience, navigate })=> {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { title, company, location, from, to, current, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <div className="add-experience">

            <h1 class="large" style={{'color':"#27b8cf"}} >Add An Experience</h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form
                class="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addExperience(formData, navigate);
                } }
                >
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            onChange={(e) => {
                                setFormData({ ...formData, current: !current });
                                toggleDisabled(!toDateDisabled);
                            } } />{" "}
                        Current Job
                    </p>
                </div>
                <div class="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={toDateDisabled ? "disabled" : ""} />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        value={description}
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" style={{'width':'150px',margin:'auto'}} />
                <Link class="btn btn-dark my-1" to="/dashboard" style={{'width':'150px',margin:'auto'}}>
                    Go Back
                </Link>
            </form>
</div>
        </Fragment>
    );
}

AddExperience.propTypes = {
  addExperience: Props.func.isRequired,
};

const AddExperienceWrapper = (props) => {
  const navigate = useNavigate();
  return <AddExperience {...props} navigate={navigate} />;
};

export default connect(null, { addExperience })(AddExperienceWrapper);
