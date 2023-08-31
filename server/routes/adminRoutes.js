import express from "express"
import {
  adminLogin, 
  registerAdmin, 
  verifyOTPAdmin} from "../controllers/adminAuthController.js"
import {
  jobPostNew, 
  findListOfJobApplication, 
  getCandidate, 
  updateJobApplicationStatus,
  getApplicationStatus
} from "../controllers/adminJobVacancyController.js"
import {findJobVacancyList} from "../controllers/jobController.js"
import { getLeaveApplications, updateLeaveStatus } from "../controllers/leaveApplicationController.js";

 
const admin_router = express.Router()

admin_router.post('/admin_login', adminLogin) 
admin_router.post('/admin_register', registerAdmin)
admin_router.post('/admin_verify_otp', verifyOTPAdmin)
admin_router.post('/post_job_vacancy', jobPostNew)   

admin_router.patch('/leave_application_update_status', updateLeaveStatus )
admin_router.patch('/update_job_application_status/:candidateId/:jobId', updateJobApplicationStatus)

admin_router.get('/job_vacancylist', findJobVacancyList)
admin_router.get('/job_applied_candidates_list', findListOfJobApplication)
admin_router.get('/job_applied_candidate_details', getCandidate)
admin_router.get('/leave_application_list', getLeaveApplications)
admin_router.get(`/job_application_status/:candidateId/:jobId`, getApplicationStatus)



export default admin_router  