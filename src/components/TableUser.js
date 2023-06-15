import React, { useEffect, useState } from 'react'
import { Table, Container, Image} from 'react-bootstrap'
import { fetchAllUser } from '../service/userService'
import ModalAddUser from './ModalAddUser'
import ReactPaginate from 'react-paginate'
import ModalUpdateUser from './ModalUpdateUser'
import ModalDeleteUser from './ModalDeleteUser'
import './tableuser.scss'
import _ from 'lodash';
import { CSVLink, CSVDownload } from "react-csv"

const TableUser = () => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [showAdd, setShowAdd] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState('asc')
    const [fieldSort, setFieldSort] = useState('id')
    const [keyword, setKeyword] = useState("")

    const [csvData, setCsvData] = useState([])

    console.log('first', csvData)




    const handleSort = (sortBy, fieldSort) => {
      setSortBy(sortBy)
      setFieldSort(fieldSort)
      let listUserClone = _.cloneDeep(listUser)
      listUserClone = _.orderBy(listUserClone, [fieldSort], [sortBy])
      setListUser(listUserClone)
    }

    const handleShowAdd = () => {
      setShowAdd(true)
    }
  
   const handleCloseAdd = () => {
      setShowAdd(false)
    }


   const handleShowUpdate = (user) => {
    setShowUpdate(true)
    setDataUserEdit(user)
    //console.log('...', user)
  
    }

    const handleCloseUpdate = () => {
    setShowUpdate(false)
    }

    const handleShowDelete = (user) => {
      setShowDelete(true)
      setDataUserDelete(user)
    }

    const handleCloseDelete = () => {
      setShowDelete(false)
    }
   

    useEffect(() => {
        getUsers(1)
    }, [])


    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if(res && res.data){
            setListUser(res.data)
            setCsvData(res.data)
            setTotalUsers(res.total)
            setTotalPages(res.total_pages)
        }
    }

    const handleAddUser = (user) => {
      setListUser([user,...listUser])
    }

    const handleUpdateUser = (user) => {
      let cloneListUser = [...listUser]
      const index = listUser.findIndex(item => item.id === user.id)
      cloneListUser[index].first_name = user.first_name
      //console.log('comepdksds', cloneListUser)
      setListUser(cloneListUser)
     
    }

    const handleDeleteUser = (id) => {
      const data = listUser.filter(item => item.id != id)
      setListUser([...data])
    }
    
    console.log('list user: ',listUser)
    const handlePageClick  = (e) => {
      getUsers(+e.selected + 1)
    }

    const handleSearch = _.debounce( (e) => {
      let term = e.target.value
      setKeyword(term)
      if(term){
        let listUserClone = _.cloneDeep(listUser)
        listUserClone = listUserClone.filter(item => item.email.includes(term))
        setListUser(listUserClone)
      }
      else {
        getUsers(1)
      }
    }, 500 )

  return (
    <>
    <Container>
        <div className='my-3 btn-add'>
          <span><strong>List users:</strong></span>
          <div>
            
            <CSVLink className="btn btn-primary mx-3" filename={"users-file.csv"} data={csvData}>
              <i className="fa-solid fa-file-arrow-down mx-2"></i>Download me
            </CSVLink>
{/* 
            <CSVDownload data={csvData} target="_blank" /> */}
          <button className='btn btn-success' onClick={handleShowAdd}>
           <i className='fa-solid fa-circle-plus'></i> Add new
          </button>
          </div>
        </div>
    </Container> 
    <Container>
      <div className='col-4 my-3'>
        <input className='form-control' placeholder='search user by email...'  onChange={(e) => handleSearch(e)}/>
      </div>
    </Container>
    <Container>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>
          <div className='sort-header'>
            <span>ID</span>
            <span>
            <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort('desc','id')}></i>
            <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort('asc','id')}></i>
            </span>
          </div>
          </th>
          <th>Avatar</th>
          <th>Email</th>
          <th>
            <div className='sort-header'>
            <span>First Name</span>
            <span>
              <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort('desc','first_name')}></i>
              <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort('asc','first_name')}></i>
            </span>
            </div>
          </th>
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
                      <button className='btn btn-danger' onClick={() => handleShowDelete(user)}>Delete</button>
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
    <ModalUpdateUser show={showUpdate} onShow={handleShowUpdate} onHide={handleCloseUpdate} onUpdate={handleUpdateUser} dataUserEdit={dataUserEdit}/>
    <ModalDeleteUser show={showDelete} onShow={handleShowDelete} onHide={handleCloseDelete} dataUserDelete={dataUserDelete} onDelete={handleDeleteUser}/>
    </>
  )
}

export default TableUser