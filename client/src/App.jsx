
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import DashboardCandidate from './Pages/DashboardCandidate/DashboardCandidate'
import JobDetails from './Pages/JobDetails/JobDetails'
import CandidateProfile from './Pages/CandidateProfile/CandidateProfile'
import RegisterCandidate from './Pages/RegisterCandidate/RegisterCandidate'
import VerifyOTP from './Pages/VerifyOTPPage/VerifyOTPPage'
import AdminLogin from './Pages/AdminLogin/AdminLogin'


function App() {  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<RegisterCandidate/>} />
      <Route path="/verify_Otp" element={ <VerifyOTP/> } />
      <Route path="/candidateDashboard" element={<DashboardCandidate/>} />
      <Route path="/jobs/:id" element={<JobDetails/>} />
      <Route path="/candidate_account" element={<CandidateProfile/>} />
      <Route path="/admin_login" element={<AdminLogin/>} />
    </Routes>
    </BrowserRouter>   
    </>
  )
}

export default App
