import React, { Fragment, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Props from "prop-types";
import { connect } from "react-redux";
import {addEducation} from "../../actions/profile";
import './AddExperienceandEducation.css'

const AddEducation=({ addEducation, navigate })=> {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <div className="add-education">

            <h1 class="large text-primary">Add an education</h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i> Add your education credentials
            </p>
            <small>* = required field</small>
            <form
                class="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    addEducation(formData, navigate);
                } }
            >
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* School"
                        name="school"
                        value={school}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Degree"
                        name="degree"
                        value={degree}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
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
                        Current School
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
                        placeholder="Description"
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

AddEducation.propTypes = {
    addEducation: Props.func.isRequired,
};

const AddEducationWrapper = (props) => {
  const navigate = useNavigate();
  return <AddEducation {...props} navigate={navigate} />;
};

export default connect(null, { addEducation })(AddEducationWrapper);
