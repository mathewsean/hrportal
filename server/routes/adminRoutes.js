import express from "express";
import {adminLogin, registerAdmin, verifyOTPAdmin} from "../controllers/adminAuthController.js"
import {jobPostNew, findListOfJobApplication} from "../controllers/adminJobVacancyController.js"
import {findJobVacancyList} from "../controllers/jobController.js"

 
const admin_router = express.Router()

admin_router.post('/admin_login', adminLogin) 
admin_router.post('/admin_register', registerAdmin)
admin_router.post('/admin_verify_otp', verifyOTPAdmin)
admin_router.post('/post_job_vacancy', jobPostNew)   

admin_router.get('/job_vacancylist', findJobVacancyList)
admin_router.get('/job_applied_candidates_list', findListOfJobApplication)


export default admin_router  