import React, { useState, useContext } from "react";
import "./Login.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginContext } from "./LoginContext";
import { auth } from "./FirebaseSeting";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const { setUserLogin, setUserName } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
     setUserName(email.substring(0,[4]));
      setUserLogin(true)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };
  return (
    <div className="login">
       
      <h1 id="Login-heading"> <span><WhatsAppIcon/></span> Whatsapp-Login </h1>

      <div className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="emal"
            placeholder="Please enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="submit-btn" onClick={signIn}>
          Sign In
        </button>
        <p>Don't have an account ?</p>
        <Link to="/">
          <span>Sign up</span>
        </Link>
      </div>
    </div>
  );
}