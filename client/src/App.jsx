
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
import AdminRegister from './Pages/AdminRegister/AdminRegister'
import AdminVerifyOtp from './Pages/AdminVerifyOtp/AdminVerifyOtp'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminJobVacancyPost from './Pages/AdminJobVacancyPost/AdminJobVacancyPost'
import EducationProfile from './Pages/CandidateEducation/CandidateEducation'
import CandidateWorkExpProfile from './Pages/CandidateWorkExpProfile/CandidateWorkExpProfile'
import AdminJobVacancyListPage from './Pages/AdminJobVacancyListPage/AdminJobVacancyListPage'


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
      <Route path="/candidate_education" element={<EducationProfile/>} />
      <Route path="/candidate_work_experience" element={<CandidateWorkExpProfile/>}/>
      
      <Route path="/admin_login" element={<AdminLogin/>} />
      <Route path='/admin_register' element={<AdminRegister/>} />
      <Route path='/admin_verify_otp' element={<AdminVerifyOtp/>}  />
      <Route path='/admin_dashboard' element={<AdminDashboard />} />
      <Route path='/admin_job_post' element={<AdminJobVacancyPost/>} />
      <Route path='/admin_job_vacancy_list' element={<AdminJobVacancyListPage/>} />
    </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App
