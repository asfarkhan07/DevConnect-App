import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { deleteEducation } from "../../actions/profile";

const Education = ({ education,deleteEducation }) => {
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    // Format as YYYY/MM/DD
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const educations = education.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.school}</td>
      <td className="hide-sm">{exp.degree}</td>
      <td>
        {formatDate(exp.from)} - {exp.to == null ? "Now" : formatDate(exp.to)}
      </td>
      <td>
        <button className="btn btn-danger" onClick={()=> deleteEducation(exp._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">School</th>
            <th className="hide-sm">Degree</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null,{deleteEducation})(Education);

