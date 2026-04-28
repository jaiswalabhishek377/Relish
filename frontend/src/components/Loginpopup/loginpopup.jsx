import React, { useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {

    const [currentState,setCurrentState] = useState("Login");
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input type="text" placeholder='Your name' required/>}
                <input type="email" placeholder='Your email' required/>
                <input type="password" placeholder='Password' required/>
            </div>
            <button>{currentState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" />
                <p>By continuing, I agree to the Terms of Service and Privacy Policy.</p>
            </div>
            {currentState==="Login"?
            <p>Create new account? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
           : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login Here</span></p>}
        </form>
    </div>
  )
}

export default LoginPopup