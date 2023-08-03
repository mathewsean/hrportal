import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from '../../Services/axiosInterceptor'

function AdminRegisterForm() {

  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  

  const handleRegistration = async (e) => {
    e.preventDefault()

    const adminData = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password
    }

    try {
      const res = await axios.post("/admin/admin_register", adminData)
      console.log(res.data);

      if(res.status == 200){
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }

    } catch (error) {
      console.error(error);
    }
  }

  if (isVerified) {
    return <Navigate to="/admin_verify_otp" />;
  }

  



  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='flex flex-col items-center w-2/4 h-3/5 bg-slate-200 rounded-3xl'>
        <form onSubmit={handleRegistration} className='flex flex-col items-center'>
          <label className='font-sans text-black text-3xl font-bold mt-10'>Admin Register</label>

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-5 rounded-md shadow-lg'
            name='firstName' value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='  Enter First Name' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='lastName' value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='  Enter Last Name' />

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='emailId' value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder='  Enter Email' />

          <input type="password"
            className='w-96 h-10 bg-white text-black mt-2 rounded-md shadow-lg'
            name='password' value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='  Enter Password' />

          <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-2 rounded-md'>
            Send OTP
          </button>
        </form>

        



      </div>
    </div>
  )
}

export default AdminRegisterForm