import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getposts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import './Posts.css'

const Posts = ({getposts,post:{posts,loading}}) => {
    useEffect(()=>{
        getposts();
    },[getposts])


  return (
    loading ? <Spinner/> : <Fragment>
        <div className='posts-page'>

        <h3 className="large" style={{color:'black'}}>Posts</h3>
        <p className='lead'>
            <i className='fas fa-user'/>Welcome to the Community
        </p>
        <PostForm/>
        <div className='posts'>
            {posts.map((post)=>(
                <PostItem key={post._id} post={post}/>
            ))}
        </div>
            </div>
    </Fragment>
  )
}

Posts.propTypes = {
    getposts:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    post:state.post

})

export default connect(mapStateToProps,{getposts})(Posts)