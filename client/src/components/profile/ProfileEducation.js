import React from "react";
import PropTypes from "prop-types";

const ProfileEducation = ({
  education: { school, degree, description, to, from, fieldofstudy, current },
}) => {
  function formatDateToYYYYMMDD(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDateToYYYYMMDD(from)}-{!to ? "Now" : formatDateToYYYYMMDD(to)}
      </p>
      <p>
        <strong>Degree:</strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study:</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
