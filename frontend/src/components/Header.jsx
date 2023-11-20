import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Omarpe</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="p-3" to={'/add-product'}>Add Product</Link>
                            <Link className="p-3" to={'/'}>Products</Link>
                            <Link className="p-3" to={'/productlist'}>Product List</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div >
    )
}

export default Header
