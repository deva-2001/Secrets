import React, { useState } from "react";
// import Authenticate  from './Authenticate';
import { useNavigate, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { base_url } from "../url";
const Form = (props) => {
  const { user } = props;
  // const navigate = useNavigate();
  const [cookies] = useCookies();


  const [secret, setSecret] = useState({
    title: "",
    content: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setSecret((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  const saveSecret = async (e) => {
    // console.log(user.id);
    e.preventDefault();
    const res = await fetch(`/api/v1/secret/create-secret`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        title: secret.title,
        content: secret.content,
        user: user.id,
      }),
    });
    if (!(res.status === 200)) {
      console.log("Unable to save data");
      window.alert("Error");
    } else {
      const response = await res.json();
      console.log(response);
      window.alert("Secret Saved Anonimously");
      // navigate("/secret-page");
      window.open(`${base_url}/secret-page`,`_self`)
    }
  };
  return (
    <>
      {/* <Authenticate onLogin={AuthUser}/> */}
      <div className="container">
        <div className="jumbotron centered">
          <i className="fas fa-key fa-6x"></i>
          <h1 className="display-3">Secrets</h1>
          <p className="secret-text">Welcome {user.name}</p>

          <form>
            <div className="form-group">
              <input
                value={secret.title}
                onChange={handleChange}
                type="text"
                className="form-control text-center"
                name="title"
                placeholder="What's your secret title?"
              />
              <input
                value={secret.content}
                onChange={handleChange}
                type="text"
                className="form-control text-center"
                name="content"
                placeholder="What's your secret?"
              />
              <input
                value={user.id}
                type="hidden"
                className="form-control text-center"
                name="user"
              />
            </div>
            <button onClick={saveSecret} type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
          <br />
          <NavLink
            className="btn btn-dark btn-lg"
            to="/secret-page"
            role="button"
          >
            go to your secrets
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Form;
