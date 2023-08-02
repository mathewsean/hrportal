import express from "express";
import {adminLogin, registerAdmin, verifyOTPAdmin} from "../controllers/adminAuthController.js"
import {jobPostNew} from "../controllers/jobController.js"

 
const admin_router = express.Router()

admin_router.post('/admin_login', adminLogin) 
admin_router.post('/admin_register', registerAdmin)
admin_router.post('/admin_verify_otp', verifyOTPAdmin)
admin_router.post('/post_job_vacancy', jobPostNew)    


export default admin_router  