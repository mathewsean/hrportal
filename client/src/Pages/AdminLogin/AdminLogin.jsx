import React from 'react'
import { Navigate } from "react-router-dom"
import AdminNavigation from '../../Components/AdminNavigation/AdminNavigation'
import AdminLoginForm from '../../Components/AdminLoginForm/AdminLoginForm'

function AdminLogin() {

  const adminToken = localStorage.getItem("adminToken")
  return (
    <>
      {adminToken ? 
      <Navigate to="/admin_dashboard" />

    :
        <>
          <AdminNavigation />
          <AdminLoginForm />
        </>}
    </>
  )
}

export default AdminLogin