import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../Services/axiosInterceptor'
import jwtDecode from 'jwt-decode'

function EmployeeTabs() {

  const token = localStorage.getItem('token')
  const employeeId = jwtDecode(token).id

  const [clockedIn, setClockedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)   
  const [viewClockIn, setViewClockIn] = useState(true)  
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {

    async function getClockInStatus() {
      try {

        setIsLoading(true)
        console.log("setIsLOadingTrue");

        const res = await axios.get(`/get_clokedIn_status/${employeeId}`)


        console.log(res.data)

        if (res.status === 200) {
          console.log("Res Status 200 Success");          
          setClockedIn(res.data.message)                    
        } else {
          console.log("Res Status 200 Failed"); 

        }

        setIsLoading(false)  
        console.log("setIsLoadingFasle");            

      } catch (error) {
        console.log("useEffect", error.message);
      }
    }

    getClockInStatus()

  }, [viewClockIn, employeeId])

  const handleClockIn = async () => {
    try {

      setIsLoading(true)

      const res = await axios.post(`/employee_clockIn/${employeeId}`)
      console.log("resHandleClockIn", res);

      setViewClockIn(false)

    } catch (error) {
      console.error(error.message);
      setErrorMessage(error.response.data.message)

      setTimeout(() => {

        setErrorMessage(null)

      }, 3000)

    } finally {
      setIsLoading(false)
    }
  }

  const handleClockOut = async () => {
    try {

      setIsLoading(true)

      const res = await axios.patch(`/employee_clockOut/${employeeId}`)

      setViewClockIn(true)

    } catch (error) {
      console.log("handleClockOut", error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>

      <div className='container mx-auto px-20 pt-10 grid grid-cols-4 gap-y-5'>

        {isLoading ? (
          <button
            className='w-60 h-60 bg-gray-400 rounded-2xl flex justify-center items-center'
            disabled
          >
            <p className='text-black font-bold text-lg text-center'>Loading...</p>
          </button>
        ) : clockedIn ? (
          <button
            className='w-60 h-60 bg-cyan-300 rounded-2xl flex justify-center items-center'
            onClick={handleClockOut}
          >
            <p className='text-black font-bold text-lg text-center'>
              CLOCK OUT
            </p>
          </button>
        ) : (
          <button
            className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'
            onClick={handleClockIn}
          >
            <div className='flex flex-col'>
              <p className='text-white font-bold text-lg text-center'>
                CLOCK IN
              </p>
              {errorMessage && <span className='text-red-500'>{errorMessage}</span>}
            </div>
          </button>
        )} 


        <Link to={`/employee_leave_list`}>
          <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
            <p className='text-white font-bold text-lg text-center'>
              Apply Leave
            </p>
          </button>
        </Link>

        <Link to={`/employee_task_list`}>
          <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
            <p className='text-white font-bold text-lg text-center'>
              Task
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