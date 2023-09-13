import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate=useNavigate();
  const [feed,setFeed]=useState({
    email:'',
    content:''
  })
  const handleChange=async (e)=>{
    const {name,value}=e.target;
    setFeed((prev)=>{
     return{ ...prev,
      [name]:value
     }
    })
  }
  const handleSubmit=async (e)=>{
    const {email,content}=feed;
    e.preventDefault();
    if(!email||!content){
      window.alert("Plzz Fill the Form Correctly")
      return;
    }
    const res=await fetch(`/api/v1/save-feedback`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,content
      })
    });
    if(!(res.status===200)){
      console.log("Error at react");
      window.alert("Unable to save feedback")
    }else{
      window.alert("Thanks For our Valuable feedback😀😀")
      navigate('/');
    }
  }
  return (
    <div className="container mt-5 border border-2 myColor" style={{width:"50%"}} >
    <form>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
         <h2> Email address-:</h2>
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          name="email"
         aria-required
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
         <h2> Describe-:</h2>
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          aria-required
          name="content"
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="btn">
        <button className="btn-primary" onClick={handleSubmit}>Save Feedback</button>
      </div>
      </form>
    </div>
  );
};

export default Contact;
