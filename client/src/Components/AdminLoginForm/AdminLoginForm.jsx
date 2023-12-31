import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import axios from '../../Services/axiosInterceptorAdmin'

function AdminLoginForm() {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    const adminCredential = {
      emailId: emailId,
      password: password
    }

    try {
      const res = await axios.post('/admin/admin_login', adminCredential)
      console.log(res.data);

      if (res.status === 200) {
        localStorage.setItem('adminToken', res.data.adminToken)
        localStorage.setItem('adminId', res.data.adminId)
        localStorage.setItem('adminFirstName', res.data.adminFirstName)
        localStorage.setItem('adminLastName', res.data.adminLastName)

        setIsVerified(true)
      } else {
        setIsVerified(false)
      }

    } catch (error) {
      console.error(error)
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setMessage(errorMessage);
      } else {
        setMessage("An error occurred");
      } 
    }

  }

  if (isVerified) {
    return <Navigate to="/admin_dashboard" />
  }



  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen '>
        <form onSubmit={handleLogin} className='flex flex-col items-center w-2/4 h-96 max-h-96 bg-slate-200 rounded-3xl'>

          <p className='font-sans text-black text-3xl font-bold mt-10'>Admin Sign In</p>

          <input type="text"
            className='px-2 w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg'
            name='emailId' value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder='  Enter Email' />

          <input type="password"
            className='px-2 w-96 h-10 bg-white text-black mt-5 rounded-md shadow-lg'
            name="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='  Enter Password' />

          <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-16 rounded-md'>
            Sign In
          </button>

          {message && (<p className="block sm:inline text-red-700">{message}</p>)}

        </form>
        <Link to='/admin_register'>Click to Register</Link>
      </div>
    </>
  )
}

export default AdminLoginForm