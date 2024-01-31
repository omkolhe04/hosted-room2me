import React, { useEffect } from "react";
import Header from "./header.js";
import "../css/login.css";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(()=>{
   const auth = localStorage.getItem('user');
   if(auth){
      navigate('/');
   }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      let result = await fetch('/login', {
        method: 'post',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
  
      result = await result.json();
      console.warn(result);
  
      if (result.token) {
        localStorage.setItem('user', JSON.stringify(result.User));
        localStorage.setItem('jwt', result.token);
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
 
  return (
    <div id="login-body">
      <Header />

      <div className="content" id="container">
         <div className="text">
            Login Form
         </div>
         <form action="#">
            <div className="field">
               <input type="phone" onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
               <span className="fas fa-user"></span>
               <label>Enter your Phone Number</label>
            </div>
            <div className="field">
               <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
               <span className="fas fa-lock"></span>
               <label>Enter your Password</label>
            </div>
            <div className="sign-in-btn"><button onClick={handleLogin} >Sign in</button></div>
            <div className="sign-up">
               Not a member?
               <Link to={'/signup'} className="signup-now">signup now</Link>
            </div>
         </form>
      </div>
    </div>
  );
};

export default Login;
