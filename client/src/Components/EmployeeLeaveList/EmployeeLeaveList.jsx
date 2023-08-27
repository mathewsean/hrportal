import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from "../../Services/axiosInterceptor"
import { format, parseISO } from 'date-fns'

function EmployeeLeaveList() {

  const token = localStorage.getItem("token")
  const { id } = jwt_decode(token)


  const [leaveList, setLeaveList] = useState([])
  
  useEffect(() => {

    async function getLeaveList() {
      try {
        const res = await axios.get(`/getLeaveListOfEmployee?id=${id}`)
        console.log("adflkdfjlak", res.data);

        if (res.status === 200) {
          setLeaveList(res.data)
        }

      } catch (error) {
        console.log(error);
      }
    }

    getLeaveList()

  }, [])

  return (
    <>

      <div className="mx-auto w-3/4 p-8">
        <div className='flex justify-between mt-10'>
          <p className='font-sans font-bold text-xl'>Leave List</p>
          <Link to={"/employee_leave_apply"}>
            <button type='submit' className='w-96 h-10 bg-cyan-300 text-lg font-semibold text-black rounded-md'>
              Apply Leave
            </button>
          </Link>
        </div>
        <br></br>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="border border-gray-400 px-4 py-2">From</th>
              <th className="border border-gray-400 px-4 py-2">To</th>
              <th className="border border-gray-400 px-4 py-2">Reason</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveList.map((leave, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(leave.fromDate), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(leave.toDate), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.reason}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default EmployeeLeaveList