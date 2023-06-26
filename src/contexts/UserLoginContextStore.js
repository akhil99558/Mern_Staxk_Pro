import React,{useState} from 'react'
import { loginContext } from './loginContext'
import axios from 'axios'


function UserLoginContextStore({children}) {

    let [currentUser,setcurrentUser]=useState({})
    let [error,seterror]=useState('')
    let [UserLoginStatus,setUserLoginStatus]=useState(false)


    //userLogin
    const loginUser=(UserCredObj)=>{
        axios.post('http://localhost:4000/user-api/login-user',UserCredObj)
        .then(response=>{
            if(response.data.message==='success'){
                //update current user state
                setcurrentUser({...response.data.user})
                //update user login status
                setUserLoginStatus(true)
                //update error status
                seterror('')
                //store jwt token in local or session storage
                localStorage.setItem('token',response.data.token)
            }else{
                seterror(response.data.message)
            }
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    //userLogout
    const logoutUser=()=>{
        //clear local or session storage
        localStorage.clear()
        //update user login status
        setUserLoginStatus(false)
        
    }
  return (
    <loginContext.Provider value={[currentUser,error,UserLoginStatus,loginUser,logoutUser]}>
        {children}
    </loginContext.Provider>
  )
}

export default UserLoginContextStore