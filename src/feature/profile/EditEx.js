import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UpdateExp } from './ProfileSlice';
const initState = {
     title: "",
     company: "",
     from:"",
     location: "",
     to:"",
     current: false,
     description : ""
}
export default function EditEx() {
  const [formData, setFormData] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {title, company, from, location,to, current, description} = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateExp({ formData, navigate }));
  };
  return (
        <div>
            <section className="container">
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" 
          placeholder="* Job Title" 
          name="title" required
          value={title} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" 
          placeholder="* Company" 
          name="company" required
          value={company} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="text" 
          placeholder="Location" 
          name="location"
          value={location} onChange={onChange} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value={current} onChange={onChange} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description" value={description} onChange={onChange} 
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back</Link>
      </form>
    </section>
        </div>
    )
}
