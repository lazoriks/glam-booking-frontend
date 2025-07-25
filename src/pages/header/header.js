import {Navbar, Container } from "react-bootstrap";
import Nav from "react-bootstrap/Navbar";
import {Link} from "react-router-dom";

import './header.css'; // Assuming you have a CSS file for styling


const Header = () => {
  return (
    <>
    <Navbar br="primary" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand to="/"><strong>My Appointment App</strong></Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                <Nav.Link as={Link} to="/appointments"  className="nav-link">Appointments</Nav.Link>
                <Nav.Link as={Link} to="/clients"  className="nav-link">Clients</Nav.Link>
                <Nav.Link as={Link} to="/masters"  className="nav-link">Masters</Nav.Link>
                <Nav.Link as={Link} to="/services"  className="nav-link">Services</Nav.Link>
            </Nav>

        </Container>

    </Navbar>
    </>
  );
}

export default Header;