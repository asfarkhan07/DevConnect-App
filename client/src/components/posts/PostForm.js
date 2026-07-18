import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({addPost}) => {
    const [text,setText]=useState('');
  return (
    <div className="post-form">
        <div className="bg-light p">
          <h5>Say Something...</h5>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addPost({text});
            setText('');
        }}>
          <textarea
            name="text"
            value={text}
            cols="30"
            rows="5"
            onChange={e=>setText(e.target.value)}
            placeholder="Create a post"
            required
            style={{margin:'auto',height:'50%',width:'50%'}}
          ></textarea>
          <input type="submit" className="btn my-1" value="Submit" style={{margin:'auto',height:'50%',width:'50%',backgroundColor:'#dcd4d4'}} />
        </form>
      </div>
  )
}

PostForm.propTypes = {
    addPost:PropTypes.func.isRequired,
}

export default connect(null,{addPost})(PostForm)