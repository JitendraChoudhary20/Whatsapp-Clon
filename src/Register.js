import React, { useState, useContext } from "react";
import "./Login.css";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { LoginContext } from "./LoginContext";
import { Link } from "react-router-dom";
import { auth } from "./FirebaseSeting";
import { AppBar, IconButton, Toolbar, MenuIcon, Typography, Button, Box } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';



const googleProvider = new GoogleAuthProvider();



export default function Register() {

  



  const { setUserLogin, setUserName } = useContext(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleSignIn=()=>{
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user.email );
      setUserName(user.displayName);
    setUserLogin(true);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   setUserName(email.substring(0,4));
    setUserLogin(true);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  };
  return (
    <>  
    <div className="login">  
    <h1> Register Here </h1>    
      <div className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="emal"
            placeholder="Please enter email"
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
        <button id="submit-btn" onClick={signUp}>
          Sign Up
        </button>
        <p>Already have an account ?</p>
        <Link to="/login">
          <span>Sign In</span>
        </Link>
      </div>
    </div>


    {/* SIGN OUT NOT DONE YET */}

    {/* <div className="loginWithGoogle">
      <button className="btn-signInWithGoogle" onClick={googleSignIn}>sign in with Google</button>
    </div> */}

    </>
  );
}