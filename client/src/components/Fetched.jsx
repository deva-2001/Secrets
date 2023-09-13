import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
// import {base_url} from '../url';

const Fetched = (props) => {
  const navigate=useNavigate();
  const [cookies]=useCookies();
  const handleDelete=async(e)=>{
    e.preventDefault();
    const res=await fetch(`/api/v1/secret/delete-secret/${props.uid}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${cookies.jwt}`
      }
    });
    if(!(res.status===200)){
      console.log("Error");
      navigate('/secret-page')
    }else{
      window.alert("Deleted Sucess");
      navigate('/secret-page');
      // window.open(`${base_url}/secret-page`,'_self')
    }
  }
  return (
    <>
    <div className="card mx-3 mb-3" style={{width: "18rem",backgroundColor:"FFE78F"}}>
    <div className="card-body">
    <h3 className="card-title">Title-:{props.title}</h3>
    {/* <p>Created by-:{props.createId}</p>
    <p>Current Logged in User-:{props.currentId}</p> */}
        <h6>Content-:{props.content}</h6>
    {props.createId===props.currentId?<i className="fa-sharp fa-solid fa-trash" onClick={handleDelete}></i>:<></>}
        
    </div>
    </div>
       

    </>
  )
}

export default Fetched