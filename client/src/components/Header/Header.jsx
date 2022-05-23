import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { logout } from "../../redux/actions/userAction";
import './index.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();


  const logoutHandler = async () => {
    const responce = await fetch('/auth/logout');
    if (responce.ok) {
      dispatch(logout());
      navigate('/login');
    }
  };

  function navbarFilter(user) {
    if (user?.id && user.roles) {
      return (<><Link className="nav-link active" to="/">
        Home
      </Link>
        <Link className="nav-link active" to="/form">
          New Lesson
        </Link>
        <li className="nav-item">
          <button onClick={() => logoutHandler()} className="nav-link active logout" aria-current="page">Log Out
          </button>
        </li>
      </>);
    } else if (user?.id) {
      return (<><Link className="nav-link active" to="/">
        Home
      </Link>
        <li className="nav-item">
          <button onClick={() => logoutHandler()} className="nav-link active logout" aria-current="page">Log Out
          </button>
        </li>
      </>);
    } else {
      return (<>
        <Link className="nav-link active" to="/registration">
          Sign Up
        </Link>
        <Link className="nav-link active" to="/login">
          Sign In
        </Link>
      </>);
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              {navbarFilter(user)}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
