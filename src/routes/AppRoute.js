import { Routes, Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import User from '../pages/User/User'
import React from 'react'
import PrivateRoute from './PrivateRoute'

const AppRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/users' element={
            <PrivateRoute>
                <User />
            </PrivateRoute>
        }/>
    </Routes>
    </>
  )
}

export default AppRoute