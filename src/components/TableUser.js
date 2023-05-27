import React, { useEffect, useState } from 'react'
import { Table, Container, Image} from 'react-bootstrap'
import { fetchAllUser } from '../service/userService'
import axios from 'axios'

const TableUser = () => {

    const [listUser, setListUser] = useState([])
    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async () => {
        let res = await fetchAllUser()
        //console.log("...", res)
        if(res && res.data){
            setListUser(res.data)
        }
    }
    console.log(listUser)

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
    </Container>
    </>
  )
}

export default TableUser