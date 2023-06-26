import React, { useContext, useState } from 'react'
import { loginContext } from '../../contexts/loginContext'
import ProductList from '../Products/Products'
import './User-profile.css'
import ProdReg from '../ProductReg/ProdReg'
import { useNavigate } from 'react-router-dom';

function User_profile() {

  const navigate=useNavigate()

  ProdReg=()=>{
    navigate('/ProdReg')
  }

  //get data from protected route
  return (
    <div className='main'>
      <aside className='left'>
        <ul className='links'>
          <li onClick={ProdReg}>register property</li>
        
        </ul>
      </aside>
      <main className='display'>
        <ProductList/>
      </main>
    </div>
  )
}

export default User_profile