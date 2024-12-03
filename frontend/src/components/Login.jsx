import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

function Login() {

  const [values,setValues] = useState({
    email:'',
    password:''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handlefrom =  (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', values)
    .then(res => {
      if (res.data.Status === "Success") {
        navigate('/');
      }
      else{
        
        alert(res.data.Error);
      }
    })
    .then((err) => console.log(err));
  }
  return (
    <div>
      <div class="root">
        <div class="form-holder">
          <form onSubmit={handlefrom}>
            <h1>Login</h1>
            <div class="input-group">
              <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
                placeholder="Email"
                type="text"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="input-group">
              <input
              onChange={(e) => setValues({ ...values, password: e.target.value })}
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div class="forgot-password">
            <Link to="/login">Forgot Password?</Link>
          </div>
          <div className="Signup">
            <p>
              Don't have an account?<Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
