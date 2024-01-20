import React, { useState, useEffect } from "react";
import Header from "./header.js";
import {Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.warn(name, email, password);
    try {
      let result = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
  
      result = await result.json();
      console.warn(result);
  
      const { user, token } = result;
  
      if (user && token) {
        localStorage.setItem("user", JSON.stringify(user)); // Store user information
        localStorage.setItem("jwt", token); // Store JWT
        navigate("/");
      } else {
        alert("Failed to get user or JWT. Please check server response.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  
  return (
    <div id="login-body">
      <Header />

      <div className="content" id="container">
         <div className="text">
            Signup Form
         </div>
         <form action="#">
            <div className="field">
               <input type="text" value={name}
              onChange={(e) => setName(e.target.value)} required></input>
               <span className="fas fa-user"></span>
               <label>Enter your Name</label>
            </div>
            <div className="field">
               <input type="number" value={email}
              onChange={(e) => setEmail(e.target.value)} required></input>
               <span className="fas fa-lock"></span>
               <label>Enter your Phone Number</label>
            </div>
            <div className="field">
               <input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required></input>
               <span className="fas fa-lock"></span>
               <label>Enter Password</label>
            </div>
            
            <div className="sign-in-btn"><button  onClick={collectData} >Sign Up</button></div>
            <div className="sign-up">
               Already have Account?
               <Link to={'/login'} className="signup-now"> Login now</Link>
            </div>
         </form>
      </div>
    </div>
  );
};

export default Signup;
