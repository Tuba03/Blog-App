// src/components/CustomNavbar.js
import React, { useState } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import '../styles/navbar.css';
import { FaUser } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle'; 
import { useAuth } from '../context/AuthContext';

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

function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // Use the Auth context

  const toggle = () => setIsOpen(!isOpen);

  return (
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
          {isLoggedIn ? (
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className='m-0'>
                <FaUser style={{ fontSize: '20px' }} />
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-custom">
                <DropdownItem 
                    tag={ReactLink} 
                    to="../Profile" 
                    className="dropdown-item-custom" 
                    style={{ padding: '5px 10px', textAlign: 'center' }} // Inline style
                >
                    Profile
                </DropdownItem>
                <DropdownItem 
                    tag={ReactLink} 
                    to="../Settings" 
                    className="dropdown-item-custom" 
                    style={{ padding: '5px 10px', textAlign: 'center' }} // Inline style
                >
                    Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem 
                    onClick={logout} 
                    className="dropdown-item-custom" 
                    style={{ padding: '5px 10px', textAlign: 'center' }} // Inline style
                >
                    Logout
                </DropdownItem>
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
          <NavItem>
              <ThemeToggle />
            </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
