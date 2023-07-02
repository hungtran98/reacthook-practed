import React, { useContext } from 'react'
import { Routes, Route} from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { Alert } from 'react-bootstrap'


const PrivateRoute = (props) => {

    const { user } = useContext(UserContext)
    console.log('first sssszzzss')

    if(user && !user.auth) {
        return <Alert variant="danger"> 
            <Alert.Heading>Oh snap! you got an error!</Alert.Heading>
            <p>You dont have permission to access this route!</p>
        </Alert>
    }

  return (
    <>
        {props.children}
    </>
  )
}

export default PrivateRoute