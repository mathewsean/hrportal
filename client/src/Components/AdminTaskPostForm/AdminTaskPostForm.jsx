import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptorAdmin'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

function AdminTaskPostForm() {

  const [taskName, setTaskName] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [employeeList, setEmployeeList] = useState([])
  const [update, setUpdate] = useState(false)
  console.log('employeeId', employeeId);

  useEffect(() => {

    async function getEmployeeList() {

      const res = await axios.get('/admin/employee_list')

      if (res.status === 200) {

        setEmployeeList(res.data)
        console.log(res.data);

      }

    }

    getEmployeeList()

  }, [])

  async function handleTaskPost() {

    const taskDetails = {
      taskName,
      employeeId,
      startDate,
      endDate
    }

    const res = await axios.post('/admin/add_new_task', taskDetails)

    if(res.status === 200){
      setUpdate(true)
    }

  }

  if(update){
    <Navigate to={'/admin_task_list'} />
  }



  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-auto'>
      <div className='container mx-10 flex flex-col justify-center items-center'>

        <p className='font-sans text-2xl font-bold mt-7  text-left'>
          Add A New Task
        </p>

        <form onSubmit={handleTaskPost} className='flex flex-col'>
          <div className=''>
            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Task Name</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='taskName' value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder='Enter Task Name' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Employee</label>
              <select
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='employeeId' value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder='Enter Employee'>

                <option value=''>Select Employee</option> 
                {employeeList.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}


              </select>
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Start Date</label>
              <DatePicker type="date"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                placeholdertext='Enter Start Date'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>End Date</label>
              <DatePicker type="date"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                placeholdertext='Enter End Date'
              />
            </div>


          </div>

          <button className=' w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-6 mb-10 rounded-md'>
            Save Task
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminTaskPostForm