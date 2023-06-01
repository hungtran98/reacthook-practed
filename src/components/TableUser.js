import React, { useEffect, useState } from 'react'
import { Table, Container, Image} from 'react-bootstrap'
import { fetchAllUser } from '../service/userService'
import ModalAddUser from './ModalAddUser'
import ReactPaginate from 'react-paginate'
import ModalUpdateUser from './ModalUpdateUser'

const TableUser = () => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [showAdd, setShowAdd] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})



    const handleShowAdd = () => {
      setShowAdd(true)
    }
  
   const handleCloseAdd = () => {
      setShowAdd(false)
    }

   const handleShowUpdate = (user) => {
    setShowUpdate(true)
    setDataUserEdit(user)
    console.log('...', user)
  
    }

    const handleCloseUpdate = () => {
    setShowUpdate(false)
    }
   

    useEffect(() => {
        getUsers(1)
    }, [])


    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if(res && res.data){
            setListUser(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
    }

    const handleAddUser = (user) => {
      setListUser([user,...listUser])
    }

    const handleUpdateUser = (user) => {
      setListUser(...listUser, {user})
   
    }
    console.log('list user: ',listUser)
    const handlePageClick  = (e) => {
      getUsers(+e.selected + 1)
    }
  return (
    <>
    <Container>
        <div className='my-3 btn-add'>
          <span><strong>List users:</strong></span>
          <button className='btn btn-success' onClick={handleShowAdd}>Add new user</button>
        </div>
        </Container>
    <Container>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            listUser && listUser.length > 0 &&
            listUser.map(
                (user, index) => (
                    <tr key={`user-${index}`}>
                    <td>{user.id}</td>
                    <td><Image src={user.avatar} roundedCircle/></td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td >
                      <button className='btn btn-warning mx-3' onClick={()=>handleShowUpdate(user)}>Update</button>
                      <button className='btn btn-danger'>Delete</button>
                    </td>
                    </tr>
                )
            )
        }
      </tbody>
    </Table>
    <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={0}
      />
    </Container>
    <ModalAddUser  show={showAdd} onShow={handleShowAdd} onHide={handleCloseAdd} onUpdate={handleAddUser}/>
    <ModalUpdateUser show={showUpdate} onShow={handleShowUpdate} onHide={handleCloseUpdate} dataUserEdit={dataUserEdit}/>
    </>
  )
}

export default TableUser