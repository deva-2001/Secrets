import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!cookies.jwt) {
      // console.log("Not Logged in user");
    } else {
      navigate("/secret-page");
    }
  };
  useEffect(() => {
    handleLogin();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="jumbotron centered">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <br />
        {/* <a class="btn btn-light btn-lg" href="/users/sign-out" role="button">Sign Out</a>
    <a class="btn btn-dark btn-lg" href="/users/secrets" role="button">Share your Secret</a> */}

        <NavLink className="btn btn-light btn-lg" to="/sign-up" role="button">
          Register
        </NavLink>
        <NavLink className="btn btn-dark btn-lg" to="/sign-in" role="button">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
