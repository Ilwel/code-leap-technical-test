import React, { useState } from 'react';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleClick =  () => {
    if(!username) return;
    localStorage.setItem('username', username)
    console.log(username)
    navigate("/")
  }

  return (
    <div className="l-sign-up">

      <div className="c-card">
        <h2>Welcome to CodeLeap network!</h2>
        <p>Please enter your username</p>
        <input onChange={e => setUsername(e.target.value)} id='username' type="text" placeholder='Your name' />
        <button onClick={handleClick} className={username ? 'primary' : 'is-disabled'}>ENTER</button>
      </div>

  </div>
  );
};

export default SignUp;