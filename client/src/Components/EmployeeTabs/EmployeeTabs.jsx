import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../Services/axiosInterceptor'
import jwtDecode from 'jwt-decode'

function EmployeeTabs() {

  const token = localStorage.getItem('token')
  const employeeId = jwtDecode(token).id
 
  const [clockedIn, setClockedIn] = useState(false)  

  useEffect(() =>{

    async function getClockInStatus(){
      try {

        const res = await axios.get(`/get_clokedIn_status/${employeeId}`)

        if(res.status === 200){
          setClockedIn(res.data.message)         
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    getClockInStatus()

  },[])

  const handleClockIn = async() => {
    try {

      const res = await axios.post(`/employee_clockIn/${employeeId}`)
      
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClockOut = async() => {
    try {

      const res = await axios.patch(`/employee_clockOut/${employeeId}`)
      
    } catch (error) {
      console.log(error.message);
    }
  }





  return (
    <>

      <div className='container mx-auto px-20 pt-10 grid grid-cols-4 gap-y-5'>

        {clockedIn ?
          <button 
          className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'
          onClick={handleClockOut}
          >
            <p className='text-white font-bold text-lg text-center'>
              CLOCK OUT
            </p>
          </button>
          :
          <button 
          className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'
          onClick={handleClockIn}
          >
            <p className='text-white font-bold text-lg text-center'>
              CLOCK IN
            </p>
          </button>
        }


        <Link to={`/employee_leave_list`}>
          <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
            <p className='text-white font-bold text-lg text-center'>
              Apply Leave
            </p>
          </button>
        </Link>



        {/* <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            EMPLOYEES
          </p>
        </button> */}

        {/* <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            DEPARTMENTS
          </p>
        </button> */}

        {/* <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            LEAVE APPLICATION APPROVAL
          </p>
        </button> */}

        {/* <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            ATTENDANCE
          </p>
        </button> */}

        {/* <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            TASK
          </p>
        </button> */}

      </div>
    </>

  )
}

export default EmployeeTabs