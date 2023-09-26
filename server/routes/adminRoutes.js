import express from "express"
import { verifyToken } from "../middlewares/authAdmin.js"
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
import {
  getEmployee, 
  createDepartment, 
  addDesignation, 
  getDepartment,
  addNewTask,
  deactivateTask,
  convertCandidate,
  getTaskList,
  monthlyAttendance
} from "../controllers/adminEmployeeController.js"

 
const admin_router = express.Router()

admin_router.post('/admin_login', adminLogin) 
admin_router.post('/admin_register', registerAdmin)
admin_router.post('/admin_verify_otp', verifyOTPAdmin)
admin_router.post('/post_job_vacancy', verifyToken, jobPostNew)   
admin_router.post('/create_new_department', verifyToken,createDepartment)
admin_router.post('/add_new_designation/:departmentId',verifyToken ,addDesignation)
admin_router.post('/add_new_task', verifyToken,addNewTask) 

admin_router.patch('/leave_application_update_status', verifyToken,updateLeaveStatus )
admin_router.patch('/update_job_application_status/:candidateId/:jobId', verifyToken,updateJobApplicationStatus)
admin_router.patch('/deactivate_task/:taskId', verifyToken,deactivateTask)
admin_router.patch('/convert_candidate/:candidateId', verifyToken,convertCandidate)

admin_router.get('/job_vacancylist', verifyToken,findJobVacancyList)
admin_router.get('/job_applied_candidates_list', verifyToken,findListOfJobApplication)
admin_router.get('/job_applied_candidate_details', verifyToken,getCandidate)
admin_router.get('/leave_application_list', verifyToken,getLeaveApplications)
admin_router.get(`/job_application_status/:candidateId/:jobId`, verifyToken,getApplicationStatus)
admin_router.get('/employee_list', verifyToken,getEmployee)
admin_router.get('/department_list', verifyToken,getDepartment)
admin_router.get('/task_list', verifyToken, getTaskList)
admin_router.get('/attendance_sheet', monthlyAttendance) 



export default admin_router  