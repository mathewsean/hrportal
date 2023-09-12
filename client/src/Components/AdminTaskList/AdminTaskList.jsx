import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptor';
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom';

function AdminTaskList() {

  const [task, setTask] = useState([])

  useEffect(() => {

    async function taskList() {
      try {

        const res = await axios.get('/admin/task_list')

        if (res.status === 200) {
          console.log(res.data.findTaskList);
          setTask(res.data.findTaskList)
        }

      } catch (error) {
        console.log(error.message);
      }
    }

    taskList()

  }, [])


  return (
    <>
      <div className="mx-auto w-3/4 p-8">
        <div className='flex justify-between mt-10'>
          <p className='font-sans font-bold text-xl'>Task</p>
          <Link to={'/admin_add_task_form'}> 
            <button className=' w-96 h-10 bg-sky-700 text-lg font-semibold text-white rounded-md'>
              Add Task
            </button>
          </Link>
        </div>


        <br></br>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="border border-gray-400 px-4 py-2">Task Name</th>
              <th className="border border-gray-400 px-4 py-2">Created At</th>
              <th className="border border-gray-400 px-4 py-2">Assigned</th>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              {/* <th className="border border-gray-400 px-4 py-2">Action</th> */}

            </tr>
          </thead>
          <tbody>
            {task.slice().reverse().map((task, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{task.taskName} </td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(task.createdAt), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{task.employeeId.firstName} {task.employeeId.lastName}</td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(task.startDate), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(task.endDate), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{task.status}</td>

                {/* <td className="border border-gray-400 px-4 py-2">

                  <div className='flex flex-col'>
                    {leave.status == "Pending" || leave.status == "Rejected" ?
                      <button onClick={() => handleStatus(leave._id, "Approved")} className='bg-green-400 text-white px-4 py-1 rounded-md'>
                        APPROVE
                      </button>
                      : null }
                      {leave.status == "Pending" || leave.status == "Approved" ?
                      <button onClick={() => handleStatus(leave._id, "Rejected")} className='bg-red-400 text-white px-4 py-1 rounded-md mt-6'>
                        REJECT
                      </button>
                      : null }
                    
                  </div>


                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminTaskList