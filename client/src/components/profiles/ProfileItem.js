import React from "react";
import { Link } from "react-router-dom";
import './ProfileItem.css';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return <div className="profile">
    <img src={avatar} alt="" className="round-img" style={{height:'80px',width:'90px'}}/>
    <div>
        <h3>{name}</h3>
        <p>{status} {company && <span>at {company}</span>}</p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
    </div>
    <ul>
        {skills.slice(0,4).map((skill,index)=> (
            <li key={index} className="text-primary">
                <i className="fas fa-check"/>{skill}
            </li>
        ))}
    </ul>
  </div>;
};



export default ProfileItem;
