import express from 'express'
import {registerCandidate, verifyOTP, login} from '../controllers/authController.js'
import {updateEducation, updateWorkExperience} from '../controllers/profileController.js'
import {jobApply} from '../controllers/jobController.js'


const candidate_router = express.Router()

candidate_router.post('/register', registerCandidate)
candidate_router.post('/verifyOtp', verifyOTP)
candidate_router.post('/login', login)
candidate_router.post('/education', updateEducation) 
candidate_router.post('/workexperience', updateWorkExperience)    
candidate_router.post('/jobApply', jobApply) 


export default candidate_router 

