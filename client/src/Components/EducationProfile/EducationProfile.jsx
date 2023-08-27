import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../Services/axiosInterceptor'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { parseISO } from 'date-fns'
import jwtDecode from 'jwt-decode'

const initialValues = {
  levelOfEducation: '',
  fieldOfStudy: '',
  schoolName: '',
  country: '',
  city: ''  
}

function EducationProfile() {

  const token = localStorage.getItem("token")
  const candidateId = jwtDecode(token).id
  

  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()  
  const [isUpdated, setIsUpdated] = useState(false)
  
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {

      async function handleEducationUpdation() {
        try {
          
          const eduData = {
            ...values, 
            fromDate: fromDate,
            toDate: toDate
          }
          
          const res = await axios.patch(`/education?id=${candidateId} `, eduData)          

          if (res.status === 200) {
            setIsUpdated(true)
          }

        } catch (error) {
          console.error(error)
        }
      }
      handleEducationUpdation()
    }
  })

  if (isUpdated) {
    return <Navigate to="/candidate_account" />;
  }




  return (
    <form onSubmit={handleSubmit}>
      <div className='container flex flex-col w-10/12 bg-slate-200 rounded-2xl shadow-md my-12 mx-auto'>
        <div className='container mx-auto flex flex-col'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
              Education
            </p>
            <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
              Add +
            </button>
          </div>

          <div className='container grid grid-cols-2 mt-10 justify-items-center '>
            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Level of Education:</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                id='levelOfEducation'
                name='levelOfEducation'
                value={values.levelOfEducation}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='  Enter Level of Education' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Field of Study:</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                id='fieldOfStudy'
                name='fieldOfStudy'
                value={values.fieldOfStudy}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='  Enter Field of Study' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>School Name:</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                id='schoolName'
                name='schoolName'
                value={values.schoolName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='  Enter School Name' />
            </div>

            <div></div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Country:</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                id='country'
                name='country'
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='  Enter Country' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>City:</label>
              <input type="text"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                id='city'
                name='city'
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='  Enter City' />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>From Date:</label>
              <DatePicker type="date"
                className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                selected={fromDate}                             
                onChange={(date) => setFromDate(date) }
                dateFormat='dd/MM/yyyy'
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                placeholdertext='  Enter From Date'

              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>To Date:</label>
              <DatePicker
                className='px-2 w-96 h-10 bg-white font-sans text-black mb-10 rounded-md shadow-lg'
                selected={toDate}                          
                onChange={(date) => setToDate(date)}
                dateFormat='dd/MM/yyyy'
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                placeholdertext='  Enter To Date'

              />
            </div>

            
          </div>
        </div>
      </div>
    </form>
  )
}

export default EducationProfile