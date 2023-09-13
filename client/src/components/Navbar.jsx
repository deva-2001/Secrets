import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { base_url } from "../url";
const Navbar = () => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/v1/sign-out`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    if(res.status===500){
      console.log("Internal Server Error");
    }
    else if (!(res.status === 200) && !(res.status===500)) {
      console.log("Error in log out");
      const resp=await res.json();
      const {message}=resp
      alert(message)
      // navigate("/");
    } else {
      window.alert("Logout Sucessfull");
      // window.open(`${base_url}/sign-in`, "_self");
      navigate("/");
    }
    
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Secrets
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {cookies.jwt != null ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/secret-page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <button
                    className="nav-link "
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  {/* <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="https://secret-web.netlify.app/secret-page">
                User
              </NavLink>
            </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about">
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/contact">
                      Contact Us
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
