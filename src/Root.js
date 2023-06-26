
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import React from "react";
import './Root.css'
function Root() {
  return (
    <div className="App">
      <Navbar className='header'></Navbar>  
      <Outlet/>
      <Footer className='footer'/>
    </div>
  );
}

export default Root;
