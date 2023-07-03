import React, { useEffect, useState, useContext } from 'react'
import './login.scss'
import Header from '../../components/Header'
import { loginApi } from '../../service/userService'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import { handleLoginRedux } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isShowPassword, setIsShowPassword] = useState(false)
  const dispatch = useDispatch()
  const loadingData = useSelector(state => state.user.isLoading)
  const account = useSelector(state => state.user.account)
  
  useEffect(() => {
    if(account && account.auth === true){
      navigate('/')
    }
  },[account])

  const handleLogin = async () => {
    
    if(!email || !password ){
      toast.error('Email/password is required!')
      return
    }

    dispatch(handleLoginRedux(email,password))
  
  }

  const handlePressEnter = (e) => {
    if(e && e.key === 'Enter')
    handleLogin()
  }

  

  return (
    <div>
      <Header />
      <div className='login-container col-12 col-sm-4'>
      <h2>Log in</h2>
      <div className='text'>Email or username: eve.holt@reqres.in</div>
      <div className='inputs'>
        <input className='input' placeholder='Email or username' value={email} onChange={(e) => setEmail(e.target.value) }/>
      </div>
      <div className='inputs'>
        <input className='input' type={isShowPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value) } onKeyDown={e => handlePressEnter(e)}/>
        <div className='eye'><i onClick={() => setIsShowPassword(!isShowPassword)} className={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" }></i></div>
      </div>
      <button onClick={() => handleLogin()} disabled={loadingData ? true : false} className={email && password ? 'active' : 'button-login'} >
        {loadingData ? <i className="fa-sharp fa-solid fa-spinner fa-spin-pulse" ></i> : "Log in"}
      </button>
      <div className='button-back' onClick={()=> navigate('/')}><i className="fa-solid fa-chevron-left"></i>&nbsp; Go back</div>
    </div>
    <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    </div>
  )
}

export default Login