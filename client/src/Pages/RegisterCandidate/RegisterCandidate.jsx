import React from 'react'
import { Navigate } from "react-router-dom"
import Navigation from '../../Components/Navigation/Navigation'
import RegisterForm from '../../Components/RegisterForm/RegisterForm'

function RegisterCandidate() {

  const token = localStorage.getItem("token")

  return (
    <>
      {token ?
        <Navigate to="/candidateDashboard" />
        :
        <>
          <Navigation />
          <RegisterForm />
        </>
      }
    </>

  )
}

export default RegisterCandidate