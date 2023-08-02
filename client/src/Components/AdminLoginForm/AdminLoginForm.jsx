import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import axios from '../../Services/axiosInterceptor'

function AdminLoginForm() {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [isVerified, setIsVerified] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    const adminCredential = {
      emailId: emailId,
      password: password
    }

    try {
      const res = await axios.post('/adminlogin', adminCredential)
      console.log(res.data);

      if (res.status == 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('firstName', res.data.firstName)
        localStorage.setItem('lastName', res.data.lastName)

        setIsVerified(true)
      } else {
        setIsVerified(false)
      }

    } catch (error) {
      console.error(error)
    }

  }

  if (isVerified) {
    return <Navigate to="/candidateDashboard" />
  }



  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen '>
        <form onSubmit={handleLogin} className='flex flex-col items-center w-2/4 h-96 max-h-96 bg-slate-200 rounded-3xl'>

          <p className='font-sans text-black text-3xl font-bold mt-10'>Admin Sign In</p>

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
            name='emailId' value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder='  Enter Email' />

          <input type="password"
            className='w-96 h-10 bg-white text-black mt-5 rounded-md shadow-lg'
            name="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='  Enter Password' />

          <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-16 rounded-md'>
            Sign In
          </button>

        </form>
        <Link to='/register'>Click to Register</Link>
      </div>
    </>
  )
}

export default AdminLoginForm