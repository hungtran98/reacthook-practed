import React, { useEffect, useState } from 'react'
import { Table, Container, Image} from 'react-bootstrap'
import { fetchAllUser } from '../service/userService'
import ReactPaginate from 'react-paginate'

const TableUser = () => {

    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

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
    
    const handlePageClick  = (e) => {
      getUsers(+e.selected + 1)
    }
  return (
    <>
    <Container>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
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
    </>
  )
}

export default TableUser