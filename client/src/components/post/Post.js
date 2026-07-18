import React, { Fragment, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import './Post.css'

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading || post === null) {
    return <Spinner />;
  }
  return <Fragment>
    <div className="post-single">
    <Link to='/posts' className="btn btn-danger">Back to Posts</Link>
    <PostItem post={post} showActions={false}/>
    <CommentForm id={post._id}/> 
    <div className="comments">
        {post.comments.map(comment=>(
          <CommentItem key={comment._id} comment={comment} id={post._id}/>
        ))}
          
    </div>
        </div>
  </Fragment>;
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
