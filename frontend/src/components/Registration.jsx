import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Registration.css";
import axios from "axios";


function Registration() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlefrom =  (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/register', values)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/login');
      }
      else{
        alert(res.data.Status);
      }
    })
    .then((err) => console.log(err));

  };

  return (
    <div>
      <div className="root">
        <div className="form-holder">
          <form onSubmit={handlefrom}>
            <h1>Registration</h1>
            <div className="input-group">
              <input
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="Name"
                type="text"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="input-group">
              <input
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="input-group">
              <input
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button id="btn" type="submit ">
              Register
            </button>
          </form>

          <div className="signIn">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
