import React from 'react'
import './Signin.css'
import user_icon from '../../assets/user.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'

const Signin = () => {
  return (
    <div className="signin-container">
        <div className="header">
            <h1>Sign in</h1>
        </div>

        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="user icon" />
                <input type="text" placeholder='Name...'/>
            </div>
            <div className="input">
                <img src={email_icon} alt="email icon" />
                <input type="text" placeholder='Email...'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="password icon" />
                <input type="password" placeholder='Password...'/>
            </div>
        </div>

        <div className="forgot-password">
            <p>Forgot password? <span>Click here</span></p>
        </div>

        <div className="submit">
            <button>Sign up</button>
            <button>Login</button>
        </div>
    </div>
  )
}

export default Signin