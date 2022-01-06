import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { DeleteComment, getComment, getPostsById } from '../feature/post/PostSlice';
import { getLoggedProfile } from '../feature/profile/ProfileSlice';
const init = {
  text:"",
  _id:"",
  user:"",
  avatar:"",
  date:"",
  name:""
}

export default function Post() {
   const params = useParams();
   let id = params.postId;
   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(getLoggedProfile());
    dispatch(getPostsById(id));
   }, [])
   const posts = useSelector(state => state.posts);
   const profile = useSelector(state => state.profile)


   const [formData, setformData] = useState(init);
   const {text} = formData;
   const onChangeText = (e)=>{
     setformData({
      user : profile.data.user._id,
      text : e.target.value,
      name : profile.data.user.name,
       avatar : profile.data.user.avatar,
       date: Date.now
     })
   }
   const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(getComment({id,formData}));
    await dispatch(getPostsById(id));
    setformData({
      text:""
    })
  };
   if(!posts.dataPost)
    {
      return(
        <Fragment>
          <p>Chua load du lieu bai post</p>
          <Link to={"/dashboard"} >Quay lai Dashboard</Link>
        </Fragment>
      )
    }
    else{
      return (
        <div>
            <section className="container">
      <Link to="/posts" className="btn">Back To Posts</Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to="/profile">
            <img
              className="round-img"
              src={posts.dataPost.avatar}
              alt=""
            />
            <h4>{posts.dataPost.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
           {posts.dataPost.text}
          </p>
          <p className="post-date">
          post on <span> {posts.dataPost.date} </span> 
          </p>
        </div>
      </div>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={onSubmit}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
            value = {text}
            onChange={onChangeText}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        {posts.dataPost.comments.map((item, index)=>{
          let IdCM = item._id;
          const clickDelete = async ()=>{
            await dispatch(DeleteComment({id,IdCM}));
            await dispatch(getPostsById(id));
          }
          return (
            <div className="post bg-white p-1 my-1" key={index}>
            <div>
            <Link className="btn" to={`/allprofiles/${item.user}`}>View Profile
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
                  Posted on {item.date}
              </p>
              {profile.data.user._id === item.user ?  <button      
            type="button"
            className="btn btn-danger"
            onClick={() => {clickDelete()} }
          >
            <i className="fas fa-times"></i>
          </button> : " "}
            </div>
          </div>
          )
        })}

      </div>
    </section>
        </div>
    )
    }
    
}
