import React, { useState } from 'react'
import axios from '../../Services/axiosInterceptor'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

function EmployeeLeaveForm() {


  const token = localStorage.getItem("token")
  const { id } = jwt_decode(token)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reason, setReason] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  console.log(isVerified);

  const leave = { employeeId: id, fromDate, toDate, reason }

  async function handleLeavePost(e) {
    e.preventDefault()

    try {

      const res = await axios.post('/createLeaveApplication', leave)
      console.log(res.status);

      if (res.status === 200) {
        setIsVerified(true)
      }

    } catch (error) {
      console.log(error);
    }
  }

  if (isVerified) {
    return <Navigate to="/employee_leave_list" />
  }


  return (
    <>

      <div className='flex flex-col justify-center items-center h-screen '>
        <form onSubmit={handleLeavePost} className='flex flex-col items-center w-2/4 max-h-auto bg-slate-200 rounded-3xl'>

          <p className='font-sans text-black text-3xl font-bold mt-10'>Leave Apply</p>

          <div className='flex flex-col mt-10'>
            <label className='font-sans text-black mt-2 font-bold'>From Date</label>
            <DatePicker type="date"
              className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              dateFormat='dd/MM/yyyy'
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              placeholdertext='  Enter From Date'

            />
          </div>



          <div className='flex flex-col'>
            <label className='font-sans text-black mt-2 font-bold'>To Date</label>
            <DatePicker
              className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
              selected={toDate}
              onChange={(date) => setToDate(date)}
              dateFormat='dd/MM/yyyy'
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              placeholdertext='  Enter To Date'

            />
          </div>


          <div className='flex flex-col'>
            <label className='font-sans text-black mt-2 font-bold'>Reason</label>

            <textarea type="text"
              className='px-2 py-2 w-96 h-40 bg-white text-black rounded-md shadow-lg'
              name="reason" value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder='  Enter Reason of Leave Application' />
          </div>

          <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-5 mb-10 rounded-md'>
            Submit
          </button>



        </form>

      </div>



    </>
  )
}

export default EmployeeLeaveForm