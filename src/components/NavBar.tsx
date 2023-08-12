import { Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logoutUser } from '../store/slices/auth';

export const NavBar = () => {
  const { currentUser } = useAppSelector(state => state.authState)
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  return (
    <Navbar expand='md' className='bg-body-tertiary mb-3' bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand>SaveMyWallet</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              ???????
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <NavLink className='nav-link' to='/'>Dashboard</NavLink>
              <NavLink className='nav-link' to='/credit-cards'>Credit Cards</NavLink>
              <NavDropdown
                title={currentUser?.username}
                id={`offcanvasNavbarDropdown-expand-md`}
              >
                <NavDropdown.Item href='#action3'>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}


