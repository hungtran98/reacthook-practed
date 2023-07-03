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
import Papa from 'papaparse'
import { toast } from 'react-toastify'
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

    //console.log('first', csvData)

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
        listUserClone = listUserClone.filter(item => item.email.includes(term.toLowerCase()))
        setListUser(listUserClone)
      }
      else {
        getUsers(1)
      }
    }, 500 )

    const getUsersExport = (event, done) => {
      let result = []
      if(listUser && listUser.length > 0){
        result.push(['Id', 'Avatar', 'Email', 'First name', 'Last name'])
        listUser.map((item, index) => {
          let arr = []
          arr[0] = item.id
          arr[1] = item.avatar
          arr[2] = item.email
          arr[3] = item.first_name
          arr[4] = item.last_name
          result.push(arr)
        })
        setCsvData(result)
        done()
      }
    }

    const handleChangeImport = (event) => {
      if(event.target.files && event.target.files[0]){
        let file = event.target.files[0]
        if(file.type !== 'text/csv'){
          toast.error('Only accept Csv file !')
          return
        }

        Papa.parse(file, {
          header: false,
          complete: function(responses) {
            if(responses.data && responses.data.length > 0){
              let rawData = responses.data
             
              if(rawData.length > 0) {
                if(rawData[0] && rawData[0].length === 4) {
                  if(rawData[0][0] !== 'avatar' || rawData[0][1] !== 'email'
                  || rawData[0][2] !== 'first_name' || rawData[0][3] !== 'last_name'
                  ){
                    toast.error('wong format at header Csv file !')
                  }
                  else {
                    let updates = []
                    rawData.map((item, index) => {
                      if(index > 0 && item.length === 4) {
                        let obj = {
                          avatar: item[0],
                          email: item[1],
                          first_name: item[2],
                          last_name: item[3],
                        }
                        updates.push(obj)
                      }
                    })
                   // console.log('updates', updates)
                   setListUser([...updates, ...listUser])
                  }

                }
              }
            
          }
        } 
      })
      }
     
    }

  return (
    <>
    <Container>
        <div className='my-3 btn-add d-sm-flex'>
          <span><strong>List users:</strong></span>
          <div>
            <input id ='import' type='file' hidden onChange={handleChangeImport}/>
             <label className='btn btn-warning' htmlFor='import'>
             <i className="fa-solid fa-file-import"></i> Import
            </label>
            <CSVLink className="btn btn-primary mx-3" filename={"users-file.csv"} data={csvData} asyncOnClick={true} onClick={getUsersExport}>
              <i className="fa-solid fa-file-export"></i> Export
            </CSVLink>
          <button className='btn btn-success' onClick={handleShowAdd}>
           <i className='fa-solid fa-circle-plus'></i> Add new
          </button>
          </div>
        </div>
    </Container> 
    <Container>
      <div className='col-12 col-sm-4 my-3'>
        <input className='form-control' placeholder='search user by email...'  onChange={(e) => handleSearch(e)}/>
      </div>
    </Container>
    <Container>
      <div className='customize-table'>
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
                    <td><Image style={{width: '70px', height: '70px', backgroundSize: 'cover' }} src={user.avatar}/></td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <button className='btn btn-warning mx-sm-2 my-1' onClick={()=>handleShowUpdate(user)}>Update</button>
                      <button className='btn btn-danger mx-sm-2 my-1' onClick={() => handleShowDelete(user)}>Delete</button>
                    </td>
                    </tr>
                )
            )
        }
      </tbody>
    </Table>
    </div>
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