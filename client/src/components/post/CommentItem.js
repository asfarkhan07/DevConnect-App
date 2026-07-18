import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  id,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => {
  function getCurrentDateFormatted() {
    const date = new Date();

    const year = date.getFullYear();

    // getMonth() returns month from 0 to 11, so add 1
    let month = date.getMonth() + 1;
    // Add leading zero if month is less than 10
    month = month < 10 ? "0" + month : month;

    let day = date.getDate();
    // Add leading zero if day is less than 10
    day = day < 10 ? "0" + day : day;

    return `${year}/${month}/${day}`;
  }
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user._id}`}>
            <img className="round-img" src={avatar} alt="" style={{'height':'80px','width':'70px'}}/>
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {getCurrentDateFormatted(date)}</p>
          {!auth.loading && user===auth.user._id && (
            <button onClick={e=> deleteComment(id,_id)} className="btn btn-danger" type="button">
                <i className="fas fa-times"/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  Id: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
