import React, { useContext, useEffect, useState } from 'react'
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import {  useLocation, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogoutRedux } from  '../redux/actions/userActions'


const Header = () => {
  const user = useSelector(state => state.user.account)
  const dispatch = useDispatch()
  const location = useLocation(
  )
  const [hideHeader, setHideHeader]  = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(window.location.pathname === '/login')
      setHideHeader(true)
  }, [])

  const handleLogout = () => {
    //logout()
    dispatch(handleLogoutRedux())
    navigate('/')
    toast.success('Log out success !')
  }
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">humanx</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!hideHeader && 
          <>
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link>
              <NavLink className='nav-link' to='/'>Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='/users' className='nav-link'>Users</NavLink>
            </Nav.Link>
          </Nav>
        <Nav>
          {user && user.email && <span className='nav-link'>{user.email}</span>}
        <NavDropdown title="Actions">
            {user && user.auth === true ? 
              <NavDropdown.Item  onClick={handleLogout}>Logout</NavDropdown.Item>
              :  
              <NavLink to='/login' className='dropdown-item'>Login</NavLink>
            }
        </NavDropdown>
        </Nav> 
        </>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header