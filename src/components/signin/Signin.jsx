import React, { useState } from 'react'
import './Signin.css'
import user_icon from '../../assets/user.png'
import email_icon from '../../assets/email.png'
import password_icon from '../../assets/password.png'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"

const Signin = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        await setDoc(doc(db, "users", response.user.uid), {
            username,
            email,
            id: response.user.uid,
            blocked: []
        })

        await setDoc(doc(db, "userchats", response.user.uid), {
            chats: [],
        })

        toast.success("Account created! Proceed to login.")

    } catch (err) {
        console.log(err)
        toast.error(err.message)

    }

    
    
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)

    try {
        await signInWithEmailAndPassword(auth, email, password);

    }catch (err) {
        console.log(err)
        toast.error("Failed to login!")
    }

    

    toast.success("Logging in...")
    // Firebase login logic goes here
  }

  return (
    <div className="signin-container">
      <div className="header">
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      </div>

      <div className="mode-toggle-buttons">
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >Sign Up</button>

        <button
          className={isLogin ? "active" : ""}
          onClick={() => setIsLogin(true)}
        >Login</button>
      </div>

      <form className="inputs" onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input
              type="text"
              name="username"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isLogin && (
          <div className="forgot-password">
            <p>
              Forgot password? <span>Click here</span>
            </p>
          </div>
        )}

        <div className="submit">
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </div>
      </form>
    </div>
  )
}

export default Signin
