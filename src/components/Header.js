import React from 'react'
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import { Link, useLocation, NavLink } from 'react-router-dom'




const Header = () => {
  const location = useLocation(
  )
  //console.log('lcoation', location)
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
        <NavDropdown title="Actions">
            <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
            <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
    </>
  )
}

export default Header