import axios from '../../Services/axiosInterceptor'
import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

function OtpForm() {

  const {emailId} = useParams()  
  
  const [otp, setOtp] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    const otpData = {
      emailId: emailId,
      otp: otp
    }

    try {

      const res = await axios.post('/verifyOtp', otpData)
      console.log(res.data);

      if(res.status === 200){
        setIsVerified(true)
      } else {
        setIsVerified(false)
      }      
      
    } catch (error) {
      console.error(error)
    }

  }

  if (isVerified) {
    return <Navigate to="/login" />;
  }

  return (
    <>

      <div className='flex justify-center items-center h-screen '>
        <form onSubmit={handleVerifyOtp} className='flex flex-col items-center w-2/4 h-2/5 bg-slate-200 rounded-3xl'>

          <label className='font-sans text-black text-3xl font-bold mt-10'>Verify OTP</label>          

          <input type="text"
            className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg'
            name='otp' value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='  Enter OTP' />

          <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-2 rounded-md'>
            Submit
          </button>

        </form>
      </div>

    </>
  )
}

export default OtpForm