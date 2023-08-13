import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../Services/axiosInterceptor'
import { Navigate } from 'react-router-dom'

const initialValues = {
  jobTitle:"",
  companyName:"",
  location:"",
  description:"",
  fromDate:"",
  toDate:""
}

function WorkExpProfile() {

  const [isVerified, setIsVerified] = useState(false)
  const candidateId = localStorage.getItem("id")

  const {values, handleBlur, handleChange, handleSubmit} = useFormik({

    initialValues: initialValues,

    onSubmit: (values) => {

      async function handleWorkExpUpdation(){
        try {
          const token = localStorage.getItem('token')
          const res = await axios.patch(`/workexperience?id=${candidateId}`,values, {
            headers:{
              Authorization: token
            }
          })
          console.log(res.data);

          if(res.status === 200){
            setIsVerified(true)
          } 
          
        } catch (error) {
          console.error(error)
        }
      }

      handleWorkExpUpdation()
    }
  })

  if(isVerified){
    return <Navigate to="/candidate_account" />
  }



  return (
    <form onSubmit={handleSubmit}>
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='container mx-10 flex flex-col'>
      <div className='flex justify-around'>
        <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>
          Update Job
        </p>
        <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
          Add +
        </button>
      </div>

        <input type="text" 
        className='px-2 w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
        id='jobTitle' 
        name='jobTitle'
        value={values.jobTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='  Enter Job Title' />

        <input type="text" 
        className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' 
        id='companyName'
        name='companyName'
        value={values.companyName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='  Enter Company Name' />

        <input type="text" 
        className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' 
        id='location'
        name='location'
        value={values.location}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='  Enter Location' />

        <input type="text" 
        className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' 
        id='fromDate'
        name='fromDate'
        value={values.fromDate}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='  Enter From Date' />

        <input type="text" 
        className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
        id='toDate'
        name='toDate'
        value={values.toDate}
        onChange={handleChange}
        onBlur={handleBlur} 
        placeholder='  Enter To Date' />
        
        <textarea 
        className="px-2 mt-2 resize-y rounded-md w-9/12 h-1/3 mb-10" 
        id='description'
        name='description'
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='  Decribe your job..'></textarea>
        
      </div>
    </div>

    </form>
  )
}

export default WorkExpProfile