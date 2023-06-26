import React,{useContext} from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';
const Navbar = () => {
  let[currentUser,error,UserLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  return (
    <nav className='navbar'>
      <ul className='nav-links'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Aboutus'>About us</Link></li>
        <li><Link to='/Register'>Register</Link></li>
        {!UserLoginStatus?(<li><Link to='/Login'>Login</Link></li>):(<li><Link to='/Login' onClick={logoutUser}>Logout</Link></li>)}
        
      </ul>
    </nav>
  );
};

export default Navbar;
