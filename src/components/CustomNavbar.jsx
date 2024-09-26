// src/components/CustomNavbar.js
import React, { useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { FaUser } from 'react-icons/fa'; // Import user icon
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" fixed="">
        <NavbarBrand href="/">OurBlog</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="../Home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="../About">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="../Services">Services</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="../Profile">Profile</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="mailto:tubakhan@eng.rizvi.edu.in">Contact Us</DropdownItem>
                <DropdownItem href="https://www.instagram.com/itstuba/">Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset/Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {!isLoggedIn ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FaUser style={{ fontSize: '20px' }} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={ReactLink} to="../Settings">Settings</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => setIsLoggedIn(false)}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="../Login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="../Signup">SignUp</NavLink>
                </NavItem>
              </>
            )}
            {/* Add ThemeToggle button here */}
            <NavItem>
              <ThemeToggle />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
