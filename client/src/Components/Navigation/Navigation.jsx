import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from '../../Services/axiosInterceptor';

const Navigation = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [firstName, setFirstName] = useState("")
  console.log(firstName, 'firstName');
  const [lastName, setLastName] = useState("")
  console.log(lastName, 'lastNamr');
 

  useEffect(() => {
    if (token) {
      const candidateId = jwt_decode(token)
      console.log('candidateIdCurrent',candidateId.id);
      async function getUserData(){
        try {
          const userData = await axios.get(`/getCandidateName?candidateId=${candidateId.id}`, {
            headers:{
            Authorization: token
          }
        })

        

          setFirstName(userData.data.firstName)
          setLastName(userData.data.lastName)    
          
        
          
        } catch (error) {
          console.error(error)
        }
      }

      getUserData()
      
      
    }
  }, [firstName, lastName])

  const handleLogout = () => {
    localStorage.removeItem("token")    
    navigate("/login")
  }



  return (
    <>
      <div className="container flex mx-auto px-20 pt-10 justify-between items-center" >
        {firstName && lastName ?
          <Link to="/candidateDashboard" className='font-sans font-bold text-lg'>hrPorto</Link>
          :
          <Link to="/" className='font-sans font-bold text-lg'>hrPorto</Link>
        }



        <div className="hidden md:block">
          <div className='ml-10 flex items-baseline space-x-4'>
            {firstName && lastName ?
              <>
                <p className='font-sans text-sm'>Welcome</p>
                <Link to="/candidate_account" className='font-sans text-sm ml-2 font-bold'>{firstName} {lastName}</Link>
              </>
              : null}

            <Link to="/candidateDashboard" className='font-sans text-sm ml-10'>Career</Link>
            {firstName && lastName ?
              (<button onClick={handleLogout} className='font-sans text-sm ml-10'>Logout</button>)
              :
              (<Link to="/login" className='font-sans text-sm ml-10'>Login</Link>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation