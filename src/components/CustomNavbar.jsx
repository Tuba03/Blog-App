import React, { useEffect, useState } from 'react';
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

// import {isLoggedIn} from "../auth";

function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const [login,setLogin]=useState(false)
  // const [user,setUser]=useState(undefined)

  // useEffect(()=>{
  //   setLogin(isLoggedIn())
  //    setUser(getCurrentUserDetail())

  // },[login])


  return (
    <div>

      <Navbar color="dark" dark expand="sm" fixed=''>
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
            {/* {
              ! login && (
              <>
                <NavItem>
                  <NavLink onClick={logout}>Profile Info</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>{user.email}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              )
            } */}

            <NavItem>
              <NavLink tag={ReactLink} to="../Login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="../Signup">SignUp</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;

// import React, { useEffect, useState } from 'react';
// import { NavLink as ReactLink } from 'react-router-dom';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from 'reactstrap';

// // import {isLoggedIn} from "../auth";

// function CustomNavbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   // const [login,setLogin]=useState(false)
//   // const [user,setUser]=useState(undefined)

//   // useEffect(()=>{
//   //   setLogin(isLoggedIn())
//   //    setUser(getCurrentUserDetail())

//   // },[login])


//   return (
//     <div>

//       <Navbar color="black" dark expand="sm" fixed=''>
//         <NavbarBrand href="/">OurBlog</NavbarBrand>
//         <NavbarToggler onClick={toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="me-auto" navbar>
//             <NavItem>
//               <NavLink tag={ReactLink} to="../Home">Home</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink tag={ReactLink} to="../About">About</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink tag={ReactLink} to="../Services">Services</NavLink>
//             </NavItem>

//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 More
//               </DropdownToggle>
//               <DropdownMenu right>
//                 <DropdownItem tag={ReactLink} to="mailto:tubakhan@eng.rizvi.edu.in">Contact Us</DropdownItem>
//                 <DropdownItem href="https://www.instagram.com/itstuba/">Instagram</DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>Reset/Youtube</DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//           <Nav navbar>
//             {/* {
//               ! login && (
//               <>
//                 <NavItem>
//                   <NavLink onClick={logout}>Profile Info</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink>{user.email}</NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink onClick={logout}>Logout</NavLink>
//                 </NavItem>
//               )
//             } */}
//             <NavItem>
//               <NavLink tag={ReactLink} to="../dashboard">Post</NavLink>
//             </NavItem>

//             <NavItem>
//               <NavLink tag={ReactLink} to="../Login">Login</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink tag={ReactLink} to="../Signup">SignUp</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// }

// export default CustomNavbar;