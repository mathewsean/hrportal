import React from 'react'
import { Navigate } from "react-router-dom"
import AdminNavigation from '../../Components/AdminNavigation/AdminNavigation'
import AdminOtpForm from '../../Components/AdminOtpForm/AdminOtpForm'

function AdminVerifyOtp() {

  const adminToken = localStorage.getItem("adminToken")

  return (
    <>
      {adminToken ?
        <Navigate to="/admin_dashboard" />
        :
        <>
          <AdminNavigation />
          <AdminOtpForm />
        </>
      }
    </>
  )
}

export default AdminVerifyOtp