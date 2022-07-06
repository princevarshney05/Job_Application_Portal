import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unAuthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-bar nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-bar nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-bar nav-link">Register</li>
        </Link>
      </>
    );
  };

  const AuthenticatedNavbarRecruiter = (props) => {
    return (
      <>
        <Link to="/">
          <li className="nav-bar nav-link">Home</li>
        </Link>
        <Link to="/recruiter">
          <li className="nav-bar nav-link">Dashboard</li>
        </Link>
        <button
          type="button"
          className="btn btn-link nav-link nav-item"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  const AuthenticatedNavbarApplicant = (props) => {
    return (
      <>
        <Link to="/">
          <li className="nav-bar nav-link">Home</li>
        </Link>
        <Link to="/profileapplicant">
          <li className="nav-bar nav-link">My profile</li>
        </Link>

        <Link to="/findjobs">
          <li className="nav-bar nav-link">Apply</li>
        </Link>
        <Link to="/myapplications">
          <li className="nav-bar nav-link">My Applications</li>
        </Link>
        <button
          type="button"
          className="btn btn-link nav-link nav-item"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand">Job Portal</div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated
              ? unAuthenticatedNavbar()
              : user.role === "applicant"
              ? AuthenticatedNavbarApplicant(props)
              : AuthenticatedNavbarRecruiter(props)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
