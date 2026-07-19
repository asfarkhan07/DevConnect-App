import React,{useState} from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({id,addComment}) => {
    const [text,setText]=useState('');



  return (
    <div className="post-form">
        <div className="p">
          <h5 style={{backgroundColor:'lightblue'}}>Leave a comment...</h5>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addComment(id,{text});
            setText('');
        }}>
          <textarea
            name="text"
            value={text}
            cols="30"
            rows="5"
            onChange={e=>setText(e.target.value)}
            placeholder="make a comment"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" style={{backgroundColor:'lightgray',color:'black'}} />
        </form>
      </div>
  )
}

CommentForm.propTypes = {
    addComment:PropTypes.func.isRequired,
}

export default connect(null,{addComment})(CommentForm)