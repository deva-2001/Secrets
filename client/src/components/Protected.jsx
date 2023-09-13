import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const [cookie] = useCookies();
  const [user,setUser]=useState({
    _id: "",
    name:"",
    email: ""
  })
  const adminLogin = async () => {
    const res = await fetch("/api/v1/verify-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.jwt}`,
      },
    });
    if (!(res.status === 200)) {
      console.log("User verification failed");
      // ErrorNotify();
      navigate("/sign-in");
    } else {
      // console.log("Admin verified sucessfully");
      const resp=await res.json();
      const {data}=resp;
      // console.log("Yha-:",data);
      setUser({
        _id:data._id,
        name:data.name,
        email:data.email
      })
    }
  };
  useEffect(() => {
    if (cookie.jwt) adminLogin();
    else {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Component  user={user}/>
    </>
  );
};

export default Protected;