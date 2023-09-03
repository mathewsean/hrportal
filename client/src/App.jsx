
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import './App.css'
import "react-datepicker/dist/react-datepicker.css"
import PrivateRoute from './utils/PrivateRoute'
import PrivateRouteAdmin from './utils/PrivateRouteAdmin'
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
import AdminJobAppliedPage from './Pages/AdminJobAppliedPage/AdminJobAppliedPage'
import AdminCandidateProfilePage from './Pages/AdminCandidateProfilePage/AdminCandidateProfilePage'
import EmployeeLeavePage from './Pages/EmployeeLeavePage/EmployeeLeavePage'
import EmployeeLeavePostPage from './Pages/EmployeeLeavePostPage/EmployeeLeavePostPage'
import AdminLeaveApplicationPage from './Pages/AdminLeaveApplicationPage/AdminLeaveApplicationPage'
import AdminEmployeeListPage from './Pages/AdminEmployeeListPage/AdminEmployeeListPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterCandidate />} />
          <Route path="/verify_Otp" element={<VerifyOTP />} />

          <Route element={<PrivateRoute />}>
            <Route path="/candidateDashboard" element={<DashboardCandidate />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/candidate_account" element={<CandidateProfile />} />
            <Route path="/candidate_education" element={<EducationProfile />} />
            <Route path="/candidate_work_experience" element={<CandidateWorkExpProfile />} />

            <Route path="/employee_leave_list" element={<EmployeeLeavePage />} />
            <Route path="/employee_leave_apply" element={<EmployeeLeavePostPage />} />
          </Route>


          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path='/admin_register' element={<AdminRegister />} />
          <Route path='/admin_verify_otp' element={<AdminVerifyOtp />} />

          <Route element={< PrivateRouteAdmin />}>
            <Route path='/admin_dashboard' element={<AdminDashboard />} />
            <Route path='/admin_job_post' element={<AdminJobVacancyPost />} />
            <Route path='/admin_job_vacancy_list' element={<AdminJobVacancyListPage />} />
            <Route path='/admin_job_applied_candidate_list/:jobId' element={<AdminJobAppliedPage />} />
            <Route path='/admin_job_applied_candidate_profile/:candidateId/:jobId' element={< AdminCandidateProfilePage />} />
            <Route path='/admin_leave_application_list' element={< AdminLeaveApplicationPage />} />
            <Route path='/admin_employee_list' element={<AdminEmployeeListPage />} />

          </Route>

          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
