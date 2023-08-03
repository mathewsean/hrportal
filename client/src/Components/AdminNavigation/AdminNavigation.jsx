  import React, { useEffect } from 'react'
  import { Link, useNavigate } from 'react-router-dom';
  import jwt_decode from 'jwt-decode'
  

  const AdminNavigation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("adminToken")
    const firstName = localStorage.getItem("adminFirstName")    
    const lastName = localStorage.getItem("adminLastName")
    console.log(token);

    useEffect(() => {
      if(token){
        const userObject = jwt_decode(token)
        console.log(userObject);
      }
    },[])

    const handleLogout = () => {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminId")
      localStorage.removeItem("adminFirstName")
      localStorage.removeItem("adminLastName")
      navigate("/admin_login")     
    }
    

    
    return (
      <>
        <div className="container flex mx-auto px-20 pt-10 justify-between items-center" >    
          <Link to="/admin_login" className='font-sans font-bold text-lg'>hrPorto</Link>   
          <div className='flex'>
          {token? 
          <>
          <p className='font-sans text-sm'>Welcome</p>
          <p className='font-sans text-sm ml-2 font-bold'>{firstName} {lastName}</p>
          </>
          : null }           
          
          {token ?         
          (<button onClick={handleLogout} className='font-sans text-sm ml-10'>Logout</button>)
          :
          (<Link to="/admin_login" className='font-sans text-sm ml-10'>Login</Link>)}         
          </div>
        </div> 
      </>
    )
  } 

  export default AdminNavigation