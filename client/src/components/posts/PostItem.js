import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import './Posts.css';

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
  deletePost
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
    <div className="post p-1 my-1">
      <div>
        <Link to={`/profile/${user}`} style={{textDecoration:'none'}}>
          <img
            className="round-img"
            src={avatar}
            alt=""
            style={{ height: "80px", width: "70px" }}
          />
          <h6>{name}</h6>
        </Link>
      </div>
      <div>
        <p className="my-1" style={{fontSize:'1.3rem'}}>{text}</p>
        {showActions && (
          <Fragment>
            <p className="post-date">
              Posted on {getCurrentDateFormatted(date)}
            </p>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => addLike(_id,auth.user._id)}
            >
              <i className="fas fa-thumbs-up"></i>
              <span>
                {likes.length > 0 && (
                  <span className="comment-count">{likes.length}</span>
                )}
              </span>
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => removeLike(_id)}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => deletePost(_id)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps={
  showActions:true,
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem,
);
