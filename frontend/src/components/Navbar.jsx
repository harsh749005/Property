
import '../styles/Navbar.css'
import gleaf from "../images/gleaf.png";
import wleaf from "../images/wleaf.png";
import { Link} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
    const [isServiceHovered, setIsServiceHovered] = useState(false);
  const [isPropertyHovered, setIsPropertyHovered] = useState(false);
  const [auth,setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() =>{
    axios.get("http://localhost:8081")
    .then(res => {
      if (res.data.Status === "Success") {
        setAuth(true);
        
      }
      else{
        setAuth(false);
        
      }
    })
    .then((err) => console.log(err));
    
  },[]);
  const handleLogOut = () => {
    axios.get('http://localhost:8081/logout')
    .then(response=>{
        window.location.href = "/";
  }).catch(error=>{
    console.log(error);  // Handle the error here if you want to display an error message instead of logging it.
  });
  }
  return (
    <div>
      <header>
          <div className="logo-title-holder">
            <div className="logo-holder">
              <img src={gleaf} alt="" />
              <img src={wleaf} alt="" />
            </div>

            <h1 className="company-name">Lander</h1>
          </div>

          <div className="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li
          onMouseEnter={() => setIsServiceHovered(true)}
          onMouseLeave={() => setIsServiceHovered(false)}
          className="service-menu"
        >
          {auth ?
          <Link >Service</Link>:<Link to="/">Contact Us</Link>}
          {isServiceHovered && (
            <ul className="dropdown">
              <li>
                <Link to="/viewservice">View Service</Link>
              </li>
              <li>
                <Link to="/addservice">Add Service</Link> {/** add */}
              </li>
            </ul>
          )}
        </li>
        <li
          onMouseEnter={() => setIsPropertyHovered(true)}
          onMouseLeave={() => setIsPropertyHovered(false)}
          className="service-menu"
        >
          {auth ?
          <Link >Property</Link>: ""}
          {isPropertyHovered && (
            <ul className="dropdown">
              <li>
                <Link to="/viewproperty">View Property</Link> {/** add */}
              </li>
              <li>
                <Link to="/addproperty">Add Property</Link>
              </li>
            </ul>
          )} 
        </li> 
              
              <li>
                <Link to="/">About</Link>
              </li>
            </ul>
          </div>
          <div className="user-buttons-holder">

            {auth ?<div className="login"><Link onClick={handleLogOut}>Logout</Link></div>:<>
            <div className="login"><Link to="/login">Login</Link></div>
            <div className="signup"><Link to="/signup">SignUp</Link></div>
            </>

            }
            
          </div>
        </header>

    </div>
  )
}

export default Navbar
