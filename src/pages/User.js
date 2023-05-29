import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header'
import TableUser from '../components/TableUser'
import ModalAddUser from '../components/ModalAddUser'
import './user.scss'

const User = () => {
  const [showAdd, setShowAdd] = useState(false)
  console.log(showAdd)


  const handleShowAdd = () => {
    setShowAdd(true)
  }

  const handleCloseAdd = () => {
    setShowAdd(false)
  }
  return (
    <div className='user'>
        <Header />
        <Container>
        <div className='my-3 btn-add'>
          <span><strong>List users:</strong></span>
          <button className='btn btn-success' onClick={handleShowAdd}>Add new user</button>
        </div>
        </Container>
        <TableUser />
        <ModalAddUser  show={showAdd} onShow={handleShowAdd} onHide={handleCloseAdd}/>
    </div>
  )
}

export default User