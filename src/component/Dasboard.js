import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { DeleteEdu, DeleteExp, getLoggedProfile } from '../feature/profile/ProfileSlice';

export default function Dasboard() {
    const profile = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getLoggedProfile());
    },[]);
    const onClickDeleteExp= (id)=>
    {
       dispatch(DeleteExp(id));
    }
    const onClickDeleteEdu= (id)=>
    {
      dispatch(DeleteEdu(id));
    }
    if (!profile.data) {
      return (
        <Fragment>
          <p>Bạn chưa update profile, vui lòng cập nhật</p>
          <Link className="btn btn-primary" to={"/createProfile"}>
            Create profile
          </Link>
        </Fragment>
      );
    }
    else{
      const exp = profile.data?.experience.map((item,index)=>{
        return(
          <tr key={index}>
            <td>{item.company}</td>
            <td className="hide-sm">{item.title}</td>
            <td className="hide-sm">{item.from} - {item.to}</td>
            <td>
              <button className="btn btn-danger" onClick={() => onClickDeleteExp(item._id)}>Delete</button>
            </td>
          </tr>
        )
      })
      const edu = profile.data?.education.map((item,index)=>{
        return(
          <tr key={index}>
             <td>{item.school}</td>
             <td className="hide-sm">{item.degree}</td>
             <td className="hide-sm">{item.from} - {item.to}</td>
             <td>
               <button className="btn btn-danger"  onClick={() => onClickDeleteEdu(item._id)}>Delete</button>
             </td>
           </tr>
        )
      })
      return (
        <div>
            <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {profile.data?.user?.name}
      </p>
      <div className="dash-buttons">
        <Link to="/createProfile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/EditEx" className="btn btn-light">
          <i className="fab fa-black-tie text-primary"></i> Add Experience
        </Link>
        <Link to="/EditEdu" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary"></i> Add Education
        </Link>
      </div>

      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exp}
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {edu}
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </section>
        </div>
    )
    }
}
