import React from "react";
import PropTypes from "prop-types";

const ProfileExperience = ({
  experience: { company, title, description, to, from, location, current },
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
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDateToYYYYMMDD(from)}-{!to ? "Now" : formatDateToYYYYMMDD(to)}
      </p>
      <p>
        <strong>Position:</strong>
        {title}
      </p>
      <p>
        <strong>Description:</strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.shape({
    company: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.string.isRequired,
    location: PropTypes.string,
    current: PropTypes.bool,
  }).isRequired,
};
export default ProfileExperience;
