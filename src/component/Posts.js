import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { CreatePost, getLike, getPosts, getUnLike } from '../feature/post/PostSlice';
import { getLoggedProfile } from '../feature/profile/ProfileSlice';

const initState= {
  _id: "",
  text: "",
  name: "",
  avatar: "",
  user: "",
  likes: [],
  comments: [],
  date: "",
  __v: 0
}
export default function Posts() { 
  const posts = useSelector(state => state.posts)
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initState);
  const { text} = formData;
  useEffect( () => {
     dispatch(getPosts());
     dispatch(getLoggedProfile());
  }, [])
  const onChange = (e) => {
    setFormData({
       user : profile.data.user._id,
       text : e.target.value,
       name : profile.data.user.name,
       avatar : profile.data.user.avatar,
       likes : [],
       comments : [],
       date : Date.now,
       __v:0
    });
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(CreatePost({ formData, navigate }));
    dispatch(getPosts());
    setFormData({
      text:""
    })
  };
  if(!posts.dataPosts)
  {
    return(
      <Fragment>
        <p>Chua load du lieu</p>
        <Link to={"/dashboard"} >Quay lai Dashboard</Link>
      </Fragment>
    )
  }
  else{
    const post = posts.dataPosts.map((item,index)=>{
      return(
        <div key={index}>
              <div className="posts">
           <div className="post bg-white p-1 my-1">
           <div>
            <Link to="/profile">
              <img
                className="round-img"
                src={item.avatar}
                alt=""
              />
              <h4>{item.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {item.text}
            </p>
             <p className="post-date">
                {item.date}
            </p>
            <button type="button" className="btn btn-light" onClick={() => {dispatch(getLike(item._id))}}>
              <i className="fas fa-thumbs-up"></i>
              <span>{(item.likes).length}</span>
            </button>
            <button type="button" className="btn btn-light" onClick={() => {dispatch(getUnLike(item._id))}}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${item._id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>2</span>
            </Link>
            <button      
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
          </div>
        </div>
      </div>
         </div>
      )
    })

    return (
      <div>
          <section className="container">
    <h1 className="large text-primary">
      Posts
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
    {post}
  </section>
      </div>
  )
  }
  
    
}
