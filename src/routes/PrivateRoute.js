import React, { useContext } from 'react'
import { Routes, Route} from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Header from '../components/Header'
import { useSelector } from 'react-redux'


const PrivateRoute = (props) => {
    const user = useSelector(state => state.user.account)
    if(user && !user.auth) {
        return (
          <>
            <Header />
            <Alert variant="danger"> 
              <Alert.Heading>Oh snap! you got an error!</Alert.Heading>
              <p>You dont have permission to access this route!</p>
          </Alert>
          </>)
    }

  return (
    <>  
        {props.children}
    </>
  )
}

export default PrivateRoute