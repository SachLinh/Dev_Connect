import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateEdu } from './ProfileSlice';
const initState = {
  school: "",
  degree: "",
  from:"",
  to:"",
  fieldofstudy: "",
  current: false,
  description: ""
}

export default function EditEdu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initState)
  const {school,
    degree,
    from,
    to,
    fieldofstudy,
    current,
    description } = formData;
    const onChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      dispatch(updateEdu({ formData, navigate }));
    };
  
    return (
        <div>
            <section class="container">
      <h1 class="large text-primary">
        Add Your Education
      </h1>
      <p class="lead">
        <i class="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={onSubmit}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={onChange}
          />
        </div>
        <div class="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange} />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  value={from}
            onChange={onChange}/>
        </div>
        <div class="form-group">
          <p>
            <input type="checkbox" name="current" value={current} onChange={onChange}/> Current School or Bootcamp
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={onChange} />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description" value={description} onChange={onChange}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
        </div>
    )
}
