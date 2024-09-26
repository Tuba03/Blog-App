import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import {isLoggedIn} from '/auth';

const PrivateRoute=()=> {

  let loggedIn=true; // change into true to access page

  if(loggedIn){ //for auth change it to isLoggedIn and then use below commanand instead of this lines
    // return isLoggedIn() ? <Outlet/> : <Navigate to={"/Login"} />
    return <Outlet />
  }else{
    return <Navigate to={"/Login"}/>;
  }
  // return (
  //   <>
  //   <div>PrivateRoute</div>
  //   <Outlet />
  //   </>
    
  // )
}

export default PrivateRoute