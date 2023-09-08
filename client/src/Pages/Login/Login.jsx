import React from 'react'
import { Navigate } from "react-router-dom"
import Navigation from '../../Components/Navigation/Navigation'
import LoginForm from '../../Components/LoginForm/LoginForm'

function Login() {

  const token = localStorage.getItem('token')

  return (
    <>
      {token ?
        <Navigate to="/candidateDashboard" />
        :
        <>
          <Navigation />
          <LoginForm />
        </>
      }


    </>
  )
}

export default Login