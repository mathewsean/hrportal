import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import Navigation from '../../Components/Navigation/Navigation'
import JobCard from '../../Components/JobCard/JobCard'
import EmployeeTab from '../../Components/EmployeeTabs/EmployeeTabs'
import axios from '../../Services/axiosInterceptor'

function DashboardCandidate() {

  const token = localStorage.getItem('token')
  const [employeeStatus, setEmployeeStatus] = useState(false)
   
  useEffect(() => {

    async function isEmployee(){
      const {id} = jwt_decode(token)     

      const res = await axios.get(`/statusOfEmployee?id=${id}`)      
      
      if(res.data.isEmployee){
        setEmployeeStatus(true)
      } else {
        setEmployeeStatus(false)
      }
    }

    isEmployee()

  },[])



  return (
    <>
      <Navigation />
      {employeeStatus ? 
      <EmployeeTab />       
      :       
      <JobCard />
      }
    </>
  )
}

export default DashboardCandidate