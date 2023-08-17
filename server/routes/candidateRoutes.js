import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import {registerCandidate, verifyOTP, login} from '../controllers/authController.js'
import {
  updateEducation, 
  updateWorkExperience, 
  getCandidate, 
  updateProfile, 
  deleteFromEducation, 
  deleteFromWorkExperience, 
  getCandidateName,
  isEmployee
} from '../controllers/profileController.js'
import {
  jobApply, 
  findJobVacancyList, 
  findJobDetails, 
  findJobAppliedStatus
} from '../controllers/jobController.js'



const candidate_router = express.Router()

candidate_router.post('/register', registerCandidate)
candidate_router.post('/verifyOtp', verifyOTP)
candidate_router.post('/login', login)   
candidate_router.patch('/profile', updateProfile)
candidate_router.patch('/education', updateEducation) 
candidate_router.patch('/workexperience', updateWorkExperience)    
candidate_router.patch('/jobApply', jobApply) 
candidate_router.delete('/deleteEducation', deleteFromEducation)
candidate_router.delete('/deleteWorkExperience', deleteFromWorkExperience)


candidate_router.get('/getJobList', verifyToken ,findJobVacancyList)
candidate_router.get('/getJobDetails/:id', findJobDetails) 
candidate_router.get('/JobAppliedStatus', findJobAppliedStatus)
candidate_router.get('/candidateDetails', getCandidate)  
candidate_router.get('/getCandidateName',verifyToken ,getCandidateName) 
candidate_router.get('/statusOfEmployee', isEmployee) 


export default candidate_router 

