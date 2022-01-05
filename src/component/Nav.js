import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../feature/auth/authSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const authLink=(
    <ul>
        <li>
          <Link to="/allprofiles">{" "} Developers</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        <li>
        <a
          onClick={() => {
            dispatch(logout());
          }}
          href="#"
        >
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      </ul>
  );
  const guesLink=(
    <ul>
        <li>
          <Link to="/allprofiles">Developers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        {auth.token ? <Link to="/dashboard">
          <i className="fas fa-code"></i> DevConnector
        </Link> : <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>}
        
      </h1>
      <Fragment>{auth.token ? authLink : guesLink}</Fragment>
    </nav>
  );
}
