import React, {Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import {  getAllProfileByID } from '../feature/AllProfile/AllProfileSlice';

export default function ProfileById() {
    const param = useParams();
    let id = param.profileById;
    
    const dispatch = useDispatch();


    useEffect( () => {
     dispatch(getAllProfileByID(id));        
     }, [])


    const Fullprofiles = useSelector(state => state.Fullprofiles) ;
    console.log("FulData: ", Fullprofiles);
    if(!Fullprofiles.profile)
    {
      return(
        <Fragment>
          <p>Chua load du lieu</p>
          <Link to={"/dashboard"} >Quay lai Dashboard</Link>
        </Fragment>
      )
    }
    else{
      return (
          <div>
              <section className="container">
              <Link to="/allprofiles" className="btn btn-light">Back To Profiles</Link>
              <div className="profile-grid my-1">
  
  <div className="profile-top bg-primary p-2">
    <img
      className="round-img my-1"
      src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
      alt=""
    />
    <h1 className="large">{Fullprofiles.profile.user.name}</h1>
    <p className="lead">{Fullprofiles.profile.status} at {Fullprofiles.profile.company}</p>
    <p>{Fullprofiles.profile.location}</p>
    <div className="icons my-1">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-globe fa-2x"></i>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter fa-2x"></i>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook fa-2x"></i>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin fa-2x"></i>
      </a>
       <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube fa-2x"></i>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram fa-2x"></i>
      </a>
    </div>
  </div>
  
  
  <div className="profile-about bg-light p-2">
    <h2 className="text-primary">{Fullprofiles.profile.user.name} Bio</h2>
    <p>
     {Fullprofiles.profile.bio}
    </p>
    <div className="line"></div>
    <h2 className="text-primary">Skill Set</h2>
    <div className="skills">
      {Fullprofiles.profile.skills.map((item, index)=>{
        return(
          <div className="p-1" key={index}>
            <i className="fa fa-check"></i>{item}</div>
        )
      })}
  
    </div>
  </div>
  
  
  <div className="profile-exp bg-white p-2">
    <h2 className="text-primary">Experience</h2>
    {Fullprofiles.profile.experience.map((item, index)=>{
      return(
        <div key={index}>
        <h3 className="text-dark">{item.company}</h3>
        <p>{item.from} - {item.to}</p>
        <p><strong>Position: </strong>{item.title}</p>
        <p>
          <strong>Description: </strong>{item.description}
        </p>
      </div>
      )
    })}
  </div>
  
  <div className="profile-edu bg-white p-2">
    <h2 className="text-primary">Education</h2>
    {Fullprofiles.profile.education.map((item,index)=>{
      return(
        <div key={index}>
        <h3>{item.school}</h3>
        <p>{item.from} - {item.to}</p>
        <p><strong>Degree: </strong>{item.degree}</p>
        <p><strong>Field Of Study: </strong>{item.fieldofstudy}</p>
        <p>
          <strong>Description: </strong>{item.description}
        </p>
      </div>
      )
    })}
    
  </div>
  
  
  <div className="profile-github">
    <h2 className="text-primary my-1">
      <i className="fab fa-github"></i> Github Repos
    </h2>
    <div className="repo bg-white p-1 my-1">
      <div>
        <h4><a href="#" target="_blank"
            rel="noopener noreferrer">Repo One</a></h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, laborum!
        </p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">Stars: 44</li>
          <li className="badge badge-dark">Watchers: 21</li>
          <li className="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
    <div className="repo bg-white p-1 my-1">
      <div>
        <h4><a href="#" target="_blank"
            rel="noopener noreferrer">Repo Two</a></h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repellat, laborum!
        </p>
      </div>
      <div>
        <ul>
          <li className="badge badge-primary">Stars: 44</li>
          <li className="badge badge-dark">Watchers: 21</li>
          <li className="badge badge-light">Forks: 25</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
        
             </section>
          </div>
      )
        
         



    }

}
