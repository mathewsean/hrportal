import React, { useState } from 'react'
import axios from '../../Services/axiosInterceptor'
import { Navigate } from 'react-router-dom'

function AdminJobPostForm() {

  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [jobType, setJobType] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [expiry, setExpiry] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const handleJobPost = async (e) => {
    e.preventDefault()

    const jobPostData = {
      jobTitle: jobTitle,
      location: location,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      jobType: jobType,
      jobDescription: jobDescription,
      expiry: expiry
    }

    try {

      const res = await axios.post('/admin/post_job_vacancy', jobPostData)
      console.log(res.data);

      if (res.status === 200) {
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }

    } catch (error) {
      console.error('Error occurred while posting job:', error)
    }
  }

  if (isVerified) {
    return <Navigate to='/admin_dashboard' />
  }

  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-20'>
      <div className='container mx-10 flex flex-col justify-center items-center'>
        <p className='font-sans text-2xl font-bold mt-7  text-left'>
          Post Job Vacancy
        </p>
        <form onSubmit={handleJobPost} className='flex flex-col'>

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
            name='jobTitle' value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder='  Enter Job Title' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='location' value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='  Enter Location' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='salaryMin' value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder='  Enter Salary Minimum' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='salaryMax' value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            placeholder='  Enter Salary Maximum' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='jobType' value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder='  Enter Job Type' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='jobDescription' value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='  Enter Job Description' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 mb-10 rounded-md shadow-lg'
            name='expiry' value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder='  Enter Expiry Date' />

          <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-3 mb-10 rounded-md'>
            Post Job
          </button>

        </form>
      </div>
    </div>
  )
}

export default AdminJobPostForm