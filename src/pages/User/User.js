import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Container } from 'react-bootstrap'
import Header from '../../components/Header'
import TableUser from '../../components/TableUser'
import './user.scss'

const User = () => {
 
  return (
    <>
    <div className='user'>
        <Header />
        <TableUser />
        
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
    </>
    
  )
}

export default User