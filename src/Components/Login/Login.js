import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context'
import Logo from '../../olx-logo.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import {useHistory} from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useContext(FirebaseContext)
  const history = useHistory()
  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Logged In')
        history.push('/');
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('User not found. Please check the email address.');
        } else if (error.code === 'auth/wrong-password') {
          alert('Incorrect password. Please try again.');
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
