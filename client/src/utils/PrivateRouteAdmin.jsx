import { Outlet, Navigate } from "react-router-dom";



const PrivateRouteAdmin = () => {

  const adminToken = localStorage.getItem('adminToken')
  
  const auth = async(req, res) => {

    
  }
  

  return(
    adminToken ? <Outlet /> : <Navigate to = "/admin_login" />
  )
}

export default PrivateRouteAdmin