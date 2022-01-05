import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "./authSlice";

export default function Login() {
  const [formData, setformData] = useState({
    email:"",
    password:""
  });
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  console.log("auth:", auth);
  const {email, password} = formData;
  const onChange = (e) =>{
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(loginUser({email,password}));
    
  }
  if(auth.token)
  { 
    return <Navigate to={"/dashboard"}/>
  }
  // else{
  //   dispatch(setAlert({msg:"Email hoac Pass khong dung", alertType:"danger"}));
  // }
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input type="password" 
          placeholder="Password"
           name="password" 
           onChange={onChange}
            value={password}/>
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
}
