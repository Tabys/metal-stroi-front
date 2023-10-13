import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <Navbar bg="light" expand="lg" className="bg-body-tertiary">

            <Container>
                <Navbar.Brand as={Link} to={`/`}>
                    <img
                        src="favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    МеталлСтрой
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={`/price-services/`}>Цены услуг</Nav.Link>
                        <Nav.Link as={Link} to={`/price-materials/`}>Цены материалов</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
