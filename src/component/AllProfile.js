import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Link} from 'react-router-dom';
import { getAllProfile } from '../feature/AllProfile/AllProfileSlice';

export default function AllProfile() {
    const dispatch = useDispatch();
    useEffect( () => {
      dispatch(getAllProfile());        
    }, [])
    const profileFull = useSelector(state => state.Fullprofiles);
    console.log(profileFull);


    if(!profileFull.listProfile)
    {
      return(
        <Fragment>
          <p>Chua load du lieu</p>
          <Link to={"/dashboard"} >Quay lai Dashboard</Link>
        </Fragment>
      )
    }
    else
    {
      const DanhSachProfiles = profileFull.listProfile.map((item, index)=>{
        return (
          <div className="profile bg-light" key={index}>
          <img
            className="round-img"
            src={item.user.avatar}
            alt=""
          />
          <div>
            <h2>{item.user.name}</h2>
            <p>{item.status} at {item.company}</p>
            <p>{item.location}</p>
            <Link className="btn btn-primary" to={`/allprofiles/${item.user._id}`}>View Profile</Link>
          </div>

          <ul>{item.skills.map((skill,index)=>{
              return (
                  <li className="text-primary" key={index}>
                     <i className="fas fa-check"></i> {skill}
                  </li>
              )
          })}
          </ul>
        </div>

        )
      })
   return (
    <div>
         <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop"></i> Browse and connect with developers
           </p>
           <div className="profiles">
                  {DanhSachProfiles}
           </div>
        </section>
        {/* <Outlet/> */}
    </div>
  )
  
    }
}
