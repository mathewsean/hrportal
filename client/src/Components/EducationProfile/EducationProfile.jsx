import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from '../../Services/axiosInterceptor'
import { Navigate } from 'react-router-dom'

const initialValues = {
  levelOfEducation: '',
  fieldOfStudy: '',
  schoolName: '',
  country: '',
  city: '',
  fromDate: '',
  toDate: ''
}

function EducationProfile() {

  const [isVerified, setIsVerified] = useState(false)
  const candidateId = localStorage.getItem("id")

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {

      async function handleEducationUpdation() {
        try {
          console.log('values:', values);
          console.log('candidateId:', candidateId);

          const res = await axios.patch(`/education?id=${candidateId} `, values)
          console.log(res.data);

          if (res.status === 200) {
            setIsVerified(true)
          }

        } catch (error) {
          console.error(error)
        }
      }
      handleEducationUpdation()
    }
  })

  if (isVerified) {
    return <Navigate to="/candidate_account" />;
  }




  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
        <div className='container mx-10 flex flex-col'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
              Education
            </p>
            <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
              Add +
            </button>
          </div>

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
            id='levelOfEducation'
            name='levelOfEducation'
            value={values.levelOfEducation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Level of Education' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            id='fieldOfStudy'
            name='fieldOfStudy'
            value={values.fieldOfStudy}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Field of Study' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            id='schoolName'
            name='schoolName'
            value={values.schoolName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter School Name' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            id='country'
            name='country'
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter Country' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            id='city'
            name='city'
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter City' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            id='fromDate'
            name='fromDate'
            value={values.fromDate}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter From Date' />

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-2 mb-10 rounded-md shadow-lg'
            id='toDate'
            name='toDate'
            value={values.toDate}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='  Enter To Date' />
        </div>
      </div>
    </form>
  )
}

export default EducationProfile