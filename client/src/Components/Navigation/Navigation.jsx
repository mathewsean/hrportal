  import React, { useEffect } from 'react'
  import { Link, useNavigate } from 'react-router-dom';
  import jwt_decode from 'jwt-decode'
  

  const Navigation = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")    
    console.log(token);

    useEffect(() => {
      if(token){
        const userObject = jwt_decode(token)
        console.log(userObject);
      }
    },[])

    const handleLogout = () => {
      localStorage.removeItem("token")
      navigate("/login")     
    }
    

    
    return (
      <>
        <div className="container flex mx-auto px-20 pt-10 justify-between items-center" >    
          <Link to="/" className='font-sans font-bold text-lg'>hrPorto</Link>   
          <div className='flex'>      
          <Link to="/candidateDashboard"className='font-sans text-sm'>Career</Link> 
          {token ?         
          (<button onClick={handleLogout} className='font-sans text-sm ml-10'>Logout</button>)
          :
          (<Link to="/login" className='font-sans text-sm ml-10'>Login</Link>)}         
          </div>
        </div> 
      </>
    )
  } 

  export default Navigation