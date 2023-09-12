import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import axios from '../../Services/axiosInterceptor'
import { Navigate, useParams } from 'react-router-dom'
function AdminEmployeeConvertForm() {

  const {candidateId, jobId} = useParams()
  console.log("candidateId",candidateId);
  console.log("jobId",jobId);

  const [department, setDepartment ] = useState('')
  const [designation, setDesignation] = useState('')
  const [basicSalary, setBasicSalary] = useState('')
  const [joiningDate, setJoiningDate] = useState(null)
  const [converted, setConverted] = useState(false)


  async function handleConvertEmployee(){
    try {
     
      const res = await axios.patch(`/admin/convert_candidate/${candidateId}`, {department, designation, basicSalary, joiningDate} )
      console.log(res);
      if(res.status === 200){
        console.log("Status=200",res.data.message);
        setConverted(true)        
      }
      
    } catch (error) {
      console.error(error.message)
    }

  }

  if(converted){
    <Navigate to='/admin_job_vacancy_list' />
  }

  

  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-auto'>
      <div className='container mx-10 flex flex-col justify-center items-center'>
        <p className='font-sans text-2xl font-bold mt-7  text-left'>
          Convert Candidate to Employee
        </p>
        <form className='flex flex-col'>
          <div className=''>
            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Department</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='department' value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder='Enter Job Title' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Designation</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='designation' value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder='Enter Location' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Basic Salary</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                name='basicSalary' value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                placeholder='Enter Salary Minimum' />
            </div>       


            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Joining Date</label>
              <DatePicker type="date"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                selected={joiningDate}
                onChange={(date) => setJoiningDate(date)}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                placeholdertext='Enter From Date'
              />
            </div>
          </div>

          <button type='button' onClick={handleConvertEmployee} className=' w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-6 mb-10 rounded-md'>
            Convert to Employee
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminEmployeeConvertForm