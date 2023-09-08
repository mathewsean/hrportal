import React, { useState } from 'react'

function AdminTaskForm() {

  const [taskName, setTaskName] = useState('')
  const [employee, setEmployee] = useState()


  

  const handleTaskPost = async(e) => {
    try {

      const taskPostData = {
        taskName:taskName,
        employeeId:employee,
        startDate:startDate,
        endDate:endDate
      }

      
    } catch (error) {
      console.log(error.message); 
    }
  }


  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-auto'>
      <div className='container mx-10 flex flex-col justify-center items-center'>
        <p className='font-sans text-2xl font-bold mt-7  text-left'>
          Post Task
        </p>
        <form onSubmit={handleJobPost} className='flex flex-col'>
          <div className=''>
            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Task Name</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='taskName' value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder='Enter Job Title' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Employee</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='employee' value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                placeholder='Enter Location' />
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
                placeholdertext='Enter From Date'
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
                placeholdertext='Enter From Date'
              />
            </div>         

          </div>

          <button className=' w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-6 mb-10 rounded-md'>
            Post Task
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminTaskForm