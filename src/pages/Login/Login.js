import React, { useState } from 'react'
import './login.scss'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className='login-container col-12 col-sm-4'>
      <h2>Log in</h2>
      <div className='text'>Email or username</div>
      <div className='inputs'>
        <input className='input' placeholder='Email or username' value={email} onChange={(e) => setEmail(e.target.value) }/>
      </div>
      <div className='inputs'>
        <input className='input' type={isShowPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value) }/>
        <div className='eye'><i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" }></i></div>
      </div>
      <button className={email && password ? 'active' : 'button-login'} >Log in</button>
      <div className='button-back'><i className="fa-solid fa-chevron-left"></i>Go back</div>
    </div>
  )
}

export default Login