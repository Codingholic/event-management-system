
import React, { useContext, useState, useEffect } from 'react'
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext.js';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/FirebaseConfig';
import { serverTimestamp } from 'firebase/firestore';
import { app } from '../../Firebase/FirebaseConfig';
import "./Login_signup.css"



const Loginsignup = () => {
    const [error, setError] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [data, setdata] = useState("")
    const [Username, setUsername] = useState("")
    const [user, setUser] = useState(null);

    const Navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    // prevent reload on submit button click
    const HandleLogIn = (e) => {
      e.preventDefault()
      // firebase authentication
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user })
          Navigate("/")
  
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setError(true)
        });
    }

  const HandleSignUp = async(e) => {
    e.preventDefault()
    // firebase authentication
      createUserWithEmailAndPassword(
      auth,
      email,
      password
      )
    .then((userCredential) => {
      setdata(email,password)
      const user = userCredential.user;
      console.log(user.uid)
      setDoc(doc(db, "user",user.uid), {
        email: email,
        password: password,
        Username: Username,
        timeStamp: serverTimestamp()
      }
      
      );
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ..
    });
  }

    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [toggleclass, settoggleclass] = useState("container");
   
    const handleSignUpClick = () => {
        setIsSignUpActive(true);
        settoggleclass("container right-panel-active")
        console.log(isSignUpActive);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
        settoggleclass("container")
        console.log(isSignUpActive);
    };


    return (
        <div className='loginBody'>
            <h2>Welcome To Cas Ant Event managment System</h2>
            <div className={toggleclass} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={HandleSignUp}>
                        <h1>Create Account</h1>
                        <div class="social-container">
                            <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" onChange={e => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <button  type='submit'>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={HandleLogIn}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="/" className="social"><i class="fab fa-facebook-f"></i></a>
                            <a href="/" className="social"><i class="fab fa-google-plus-g"></i></a>
                            <a href="/" className="social"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <a href="/">Forgot your password?</a>
                        <button type='submit'>Sign In</button>
                        {error && <span>Wrong password or email</span>}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>please log in to your account To Continue your Journey</p>
                            <button onClick={handleSignInClick} className="ghost" id="signIn">Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Sir</h1>
                            <p>Kindly provide your credentials to sign up</p>
                            <button onClick={handleSignUpClick} className="ghost" id="signUp">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginsignup