import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from '../../Services/axiosInterceptorAdmin'

const registerSchema = Yup.object().shape({
  firstName: Yup.string().min(2).max(20).required("Please enter your First Name"),
  lastName: Yup.string().required("Please enter your Last Name"),
  emailId: Yup.string().email().required("Please enter a valid Email"),
  password: Yup.string().required("Please enter Password").min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one A,a,0,*')
})

const initialValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: ""
}

function AdminRegisterForm() {

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  // const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {


      async function handleRegistration() {

        try {
          const res = await axios.post("/admin/admin_register", values)
          console.log(res.data);

          if (res.status == 200) {
            setIsVerified(true)
            setEmailId(values.emailId)
          } else {
            setIsVerified(false)
          }

        } catch (error) {
          console.error(error);
        }

      }
      handleRegistration()
    }
  })



  // const handleRegistration = async (e) => {
  //   e.preventDefault()

  //   const adminData = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     emailId: emailId,
  //     password: password
  //   }

  //   try {
  //     const res = await axios.post("/admin/admin_register", adminData)
  //     console.log(res.data);

  //     if(res.status == 200){
  //       setIsVerified(true)
  //     } else {
  //       setIsVerified(false)
  //     }

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  if (isVerified) {
    return <Navigate to= {`/admin_verify_otp/${emailId}`} />;
  } 

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='flex flex-col items-center w-2/4 h-3/4 bg-slate-200 rounded-3xl'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='font-sans text-black text-3xl font-bold mt-10'>Admin Register</label>

          <label htmlFor='firstName' className='font-sans text-black mt-5'>First Name</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='firstName'
            name='firstName'
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => setFirstName(e.target.value)}
            placeholder='  Enter First Name' />
          {errors.firstName && touched.firstName ?
            (<span class="block sm:inline text-red-700">{errors.firstName}</span>) : null}

          <label htmlFor='lastName' className='font-sans text-black mt-5'>Last Name</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='lastName'
            name='lastName'
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => setLastName(e.target.value)}
            placeholder='  Enter Last Name' />
          {errors.lastName && touched.lastName ?
            (<span class="block sm:inline text-red-700">{errors.lastName}</span>) : null}

          <label htmlFor='emailId' className='font-sans text-black mt-5'>Email</label>
          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
            id='emailId'
            name='emailId'
            value={values.emailId}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => setEmailId(e.target.value)}
            placeholder='  Enter Email' />
          {errors.emailId && touched.emailId ?
            (<span class="block sm:inline text-red-700">{errors.emailId}</span>) : null}

          <label htmlFor='password' className='font-sans text-black mt-5'>Password</label>
          <input type="password"
            className='px-2 w-96 h-10 bg-white text-black rounded-md shadow-lg'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder='  Enter Password' />
          {errors.password && touched.password ?
            (<span className="block sm:inline text-red-700">{errors.password}</span>) : null}


          <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-2 rounded-md'>
            Send OTP
          </button>
        </form>





      </div>
    </div>
  )
}

export default AdminRegisterForm