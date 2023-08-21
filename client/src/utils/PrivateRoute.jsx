import { Outlet, Navigate } from "react-router-dom";



const PrivateRoute = () => {

  const token = localStorage.getItem('token')
  
  const auth = async(req, res) => {

    
  }
  

  return(
    token ? <Outlet /> : <Navigate to = "/login" />
  )
}

export default PrivateRoute