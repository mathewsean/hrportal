import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../Services/axiosInterceptor'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import jwtDecode from 'jwt-decode'

const initialValues = {
  jobTitle: "",
  companyName: "",
  location: "",
  description: "",
}

function WorkExpProfile() {

  const token = localStorage.getItem("token")
  const candidateId = jwtDecode(token).id
  const [fromDate, setFromDate] = useState()  
  const [toDate, setToDate] = useState()  
  const [isUpdated, setIsUpdated] = useState(false)


  const { values, handleBlur, handleChange, handleSubmit } = useFormik({

    initialValues: initialValues,

    onSubmit: (values) => {

      async function handleWorkExpUpdation() {
        try {
          
          const workExpData = {
            ...values,
            fromDate: fromDate,
            toDate: toDate
          }
          
          const res = await axios.patch(`/workexperience?id=${candidateId}`, workExpData)
          
          if (res.status === 200) {
            setIsUpdated(true)
          }

        } catch (error) {
          console.error(error)
        }
      }

      handleWorkExpUpdation()
    }
  })

  if (isUpdated) {
    return <Navigate to="/candidate_account" />
  }



  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-auto'>
        <div className='container mx-10 flex flex-col'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>
              Add Work Experience
            </p>
            <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
              Add +
            </button>
          </div>

          <label className='font-sans text-black mt-2 font-bold'>Job Title</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='jobTitle'
            name='jobTitle'
            value={values.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Job Title' />

          <label className='font-sans text-black mt-2 font-bold'>Company Name</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='companyName'
            name='companyName'
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Company Name' />

          <label className='font-sans text-black mt-2 font-bold'>Location</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='location'
            name='location'
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Location' />

          <label className='font-sans text-black mt-2 font-bold'>From Date</label>
          <DatePicker type="date"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat='dd/MM/yyyy'
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            placeholdertext='  Enter From Date'

          />

          <label className='font-sans text-black mt-2 font-bold'>To Date</label>
          <DatePicker
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat='dd/MM/yyyy'
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            placeholdertext='  Enter To Date'

          />

          <label className='font-sans text-black mt-2 font-bold'>Job Description</label>
          <textarea
            className="px-2 resize-y rounded-md w-9/12 h-1/3 mb-10"
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