import React, { useState } from 'react'
import axios from '../../Services/axiosInterceptor'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

function EmployeeLeaveForm() {

  
  const token = localStorage.getItem("token")
  const{id} = jwt_decode(token)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reason, setReason] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  console.log(isVerified);

  const leave = {employeeId:id, fromDate, toDate, reason}

  async function handleLeavePost(e){
     e.preventDefault()

    try {

      const res = await axios.post('/createLeaveApplication', leave)
      console.log(res.status);

      if(res.status === 200){
        setIsVerified(true)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  if(isVerified){
    return <Navigate to="/employee_leave_list" />
  }


  return (
    <>

      <div className='flex flex-col justify-center items-center h-screen '>
        <form onSubmit={handleLeavePost} className='flex flex-col items-center w-2/4 max-h-96 bg-slate-200 rounded-3xl'>

          <p className='font-sans text-black text-3xl font-bold mt-10'>Leave Apply</p>

          <input type="text"
            className='px-2 w-96 h-16 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
            name='fromDate' value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder='  Enter Leave Starting Date' />

          <input type="text"
            className='px-2 w-96 h-16 bg-white text-black mt-5 rounded-md shadow-lg'
            name="toDate" value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder='  Enter Leave End Date' />

          <input type="text"
            className='px-2 w-96 h-40 bg-white text-black mt-5 rounded-md shadow-lg'
            name="reason" value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='  Enter Reason of Leave Application' />

          <button className='w-96 h-16 bg-sky-700 text-lg font-semibold text-white mt-5 mb-10 rounded-md'>
            Submit
          </button>

          

        </form>
        
      </div>



    </>
  )
}

export default EmployeeLeaveForm