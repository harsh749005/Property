import React from 'react'
import axios from "axios";

function Logout() {
    
    axios.post('http://localhost:8081/logout')
    .then(response=>{
      window.location.href = "/";
  }).catch(error=>{
    console.log(error);  // Handle the error here if you want to display an error message instead of logging it.
  });

    return (
    <div>
      
    </div>
  )
}

export default Logout
