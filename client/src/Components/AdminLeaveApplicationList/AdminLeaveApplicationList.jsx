import React, { useState, useEffect } from 'react'
import axios from '../../Services/axiosInterceptor';

function AdminLeaveApplicationList() {

  const [leaveList, setLeaveList] = useState([])
  console.log('leavelist', leaveList);

  useEffect(() => {

    async function getLeaveList() {
      try {

        const res = await axios.get('/admin/leave_application_list')


        if (res.status === 200) {
          setLeaveList(res.data)
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    getLeaveList()

  }, [])

  async function handleStatus(leaveId, status) {
    const values = {
      leaveId,
      status
    }

    try {
      const res = await axios.patch('admin/leave_application_update_status', values)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <div className="mx-auto w-3/4 p-8">
        <div className='flex justify-between mt-10'>
          <p className='font-sans font-bold text-xl'>Leave List</p>
        </div>
        <br></br>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">From</th>
              <th className="border border-gray-400 px-4 py-2">To</th>
              <th className="border border-gray-400 px-4 py-2">Reason</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {leaveList.map((leave, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{leave.employeeId.firstName} {leave.employeeId.lastName}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.fromDate}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.toDate}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.reason}</td>
                <td className="border border-gray-400 px-4 py-2">{leave.status}</td>
                <td className="border border-gray-400 px-4 py-2">

                  <div className='flex justify-around'>
                    {leave.status == "Pending" || leave.status == "Rejected" ?
                      <button onClick={() => handleStatus(leave._id, "Approved")} className='bg-green-400 text-white px-4 py-1 rounded-md'>
                        APPROVE
                      </button>
                      : null }
                      {leave.status == "Pending" || leave.status == "Approved" ?
                      <button onClick={() => handleStatus(leave._id, "Rejected")} className='bg-red-400 text-white px-4 py-1 rounded-md'>
                        REJECT
                      </button>
                      : null }
                    
                  </div>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>


  )
}

export default AdminLeaveApplicationList