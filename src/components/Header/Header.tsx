import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { canHaveDecorators } from "typescript";

import "./header.css";

const Header = ({ sessionUserId }: any) => {
    return (
        <Navbar expand="md">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <NavDropdown
                            title="Add module"
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item>Oscillator</NavDropdown.Item>
                            <NavDropdown.Item>Filter</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;
