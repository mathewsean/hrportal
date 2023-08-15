import React, { useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import Navigation from '../../Components/Navigation/Navigation'
import JobCard from '../../Components/JobCard/JobCard'
import axios from '../../Services/axiosInterceptor'

function DashboardCandidate() {

  const token = localStorage.getItem('token')
  
  useEffect(() => {

    async function isEmployee(){
      const id = jwt_decode("token")

      const res = await axios.get()

    }

    isEmployee()

  },[])



  return (
    <>
      <Navigation />
      <JobCard />
    </>
  )
}

export default DashboardCandidate