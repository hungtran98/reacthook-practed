import React from 'react'
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import {  useLocation, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




const Header = () => {
  const location = useLocation(
  )

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('tokenUser')
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
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link>
              <NavLink className='nav-link' to='/'>Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='/users' className='nav-link'>Users</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
        <NavDropdown title="Actions">
            <NavLink to='/login' className='dropdown-item'>Login</NavLink>
            <NavDropdown.Item  onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
    </>
  )
}

export default Header