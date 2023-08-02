  import React, { useEffect } from 'react'
  import { Link, useNavigate } from 'react-router-dom';
  import jwt_decode from 'jwt-decode'
  

  const AdminNavigation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const firstName = localStorage.getItem("firstName")    
    const lastName = localStorage.getItem("lastName")
    console.log(token);

    useEffect(() => {
      if(token){
        const userObject = jwt_decode(token)
        console.log(userObject);
      }
    },[])

    const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("id")
      localStorage.removeItem("firstName")
      localStorage.removeItem("lastName")
      navigate("/login")     
    }
    

    
    return (
      <>
        <div className="container flex mx-auto px-20 pt-10 justify-between items-center" >    
          <Link to="/" className='font-sans font-bold text-lg'>hrPorto</Link>   
          <div className='flex'>
          {token? 
          <>
          <p className='font-sans text-sm'>Welcome</p>
          <p className='font-sans text-sm ml-2 font-bold'>{firstName} {lastName}</p>
          </>
          : null }             
          
          <Link to="/candidateDashboard"className='font-sans text-sm ml-10'>Career</Link> 
          {token ?         
          (<button onClick={handleLogout} className='font-sans text-sm ml-10'>Logout</button>)
          :
          (<Link to="/login" className='font-sans text-sm ml-10'>Login</Link>)}         
          </div>
        </div> 
      </>
    )
  } 

  export default AdminNavigation