import React from 'react'
import { Navigate } from "react-router-dom"
import AdminRegisterForm from '../../Components/AdminRegisterForm/AdminRegisterForm.jsx'
import AdminNavigation from '../../Components/AdminNavigation/AdminNavigation.jsx'

function AdminRegister() {

  const adminToken = localStorage.getItem("adminToken")

  return (
    <>
      {adminToken ?
        <Navigate to="/admin_dashboard" />
        :
        <>
          <AdminNavigation />
          <AdminRegisterForm />
        </>
      }
    </>

  )
}

export default AdminRegister