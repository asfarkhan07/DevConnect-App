import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  id, // post id
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  function getCurrentDateFormatted(dateString) {
    const d = new Date(dateString);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = d.getDate();
    day = day < 10 ? "0" + day : day;
    return `${year}/${month}/${day}`;
  }


  console.log('CommentItem here')
  // For debugging: see what "user" actually is
  console.log("comment.user:", user);
  console.log("auth.user:", auth.user);

  const canDelete =
    !auth.loading &&
    auth.user && // make sure auth.user is loaded
    (
      // CASE 1: comment.user is just an ID string
      user === auth.user._id ||
      // CASE 2: comment.user is an object with _id
      (user && user._id === auth.user._id)
    );

  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user._id || user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
              style={{ height: "80px", width: "70px" }}
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {getCurrentDateFormatted(date)}</p>

          {canDelete && (
            <button
              onClick={(e) => deleteComment(id, _id)}
              className="btn btn-danger"
              type="button"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,          // post id
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);