import React from 'react'
import { Navigate } from "react-router-dom"
import Navigation from '../../Components/Navigation/Navigation'
import OtpForm from '../../Components/OtpForm/OtpForm'


function VerifyOTPPage() {
  const token = localStorage.getItem('token')
  return (
    <>
      {token ?
        <Navigate to="/candidateDashboard" />
        :
        <>
          <Navigation />
          <OtpForm />
        </>
      }
    </>

  )
}

export default VerifyOTPPage