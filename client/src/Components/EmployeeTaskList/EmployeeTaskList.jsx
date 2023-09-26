import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptor';
import jwtDecode from 'jwt-decode';
import { format, parseISO } from 'date-fns';


function EmployeeTaskList() {

  const token = localStorage.getItem('token')
  const employeeId = jwtDecode(token).id
  const [task, setTask] = useState([])
  console.log(task);

  useEffect(() => {

    async function taskList() {
      try {

        const res = await axios.get(`/employee_task_list/${employeeId}`)

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

  async function handleStatus(taskId, status){
    try {

      const res = await axios.patch(`/employee_task_update/${taskId}`, {status})

      if(res.status === 200){

      }
      
    } catch (error) {
      console.error(error)
    }
  }



  return (

    <>
      <div className="mx-auto w-3/4 p-8">
        <div className='flex justify-between mt-10'>
          <p className='font-sans font-bold text-xl'>Task</p>
          {/* <Link to={'/admin_add_task_form'}>
            <button className=' w-96 h-10 bg-sky-700 text-lg font-semibold text-white rounded-md'>
              Task List
            </button>
          </Link> */}
        </div>


        <br></br>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-sky-700 text-white">
              <th className="border border-gray-400 px-4 py-2">Task Name</th>
              <th className="border border-gray-400 px-4 py-2">Start Date</th>
              <th className="border border-gray-400 px-4 py-2">End Date</th>
              <th className="border border-gray-400 px-4 py-2">Status</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>

            </tr>
          </thead>
          <tbody>
            {task.slice().reverse().map((task, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{task.taskName} </td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(task.startDate), "dd/MM/yyyy")}</td>
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(task.endDate), "dd/MM/yyyy")}</td>

                <td className="border border-gray-400 px-4 py-2">{task.status}</td>

                <td className="border border-gray-400 px-4 py-2 text-center"> 


                  {task.status === "Pending" ?
                    <button onClick={() => handleStatus(task._id, "Work in Progress")}
                      className='bg-red-400 text-white px-4 py-1 rounded-md'
                    >
                      Update to WIP
                    </button>
                    : task.status === "Work in Progress" ?
                    <button onClick={() => handleStatus(task._id, "Completed")}
                      className='bg-green-400 text-white px-4 py-1 rounded-md mt-6'
                    >
                      Update to Complete
                    </button>
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default EmployeeTaskList