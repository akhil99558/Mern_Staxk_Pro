import React, { useState,useContext,useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';

export default function Login() {

  let[currentUser,error,UserLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  

  const navigate=useNavigate()

  let { register, handleSubmit, formState: { errors } } = useForm()
//user login
const handleloginUser=(UserCredObj)=>{
  console.log(UserCredObj)
  loginUser(UserCredObj)
}

useEffect(()=>{
  if(UserLoginStatus===true){
    navigate('/user-profile')
  }
},[UserLoginStatus])

  return (
    <form onSubmit={handleSubmit(handleloginUser)} className="form">
      {error.length!==0 && (
        <p>{error}</p>
      )}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register('username', { required: 'Username is required' })}
          className={errors.username ? 'input-error' : ''}
        />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>


      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required' })}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <button type="submit" className="submit-btn">Submit</button>
    </form>
  )
}
