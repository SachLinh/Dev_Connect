import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, Navigate } from "react-router-dom";
import { setAlert } from "../alert/AlertSlice";
import { registerUser } from "./authSlice";

export default function Register() {
  const [formData, setformData] = useState({
    name:"",
    email:"",
    password:"",
    password2:"",
  });
   const dispatch = useDispatch();
   const auth = useSelector(state => state.auth);
   const {name, email, password,password2} = formData;
   const onChange = (e) =>{
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    })
   }
  const onSubmit=(e)=>{
    e.preventDefault();
    if(password2 !== password)
    {
      dispatch(setAlert({msg:"Pass khong khop", alertType:"danger"}));
    }
    else{
      dispatch(registerUser({name, email, password}));
    }
   }
  if(auth.token)
  {
    return <Navigate to={"/dashboard"}/>
  }
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            onChange={onChange}
            value={name}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            onChange={onChange}
            placeholder="Email Address"
            value={email}
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="password"
            value={password}
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            onChange={onChange}
            type="password"
            value={password2}
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
}
