import express from 'express'
import {
  validatorRegisterCandidate,
  validatorCandidateLogin
} from '../middlewares/expressValidator.js'
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

candidate_router.post('/register',validatorRegisterCandidate ,registerCandidate) 
candidate_router.post('/verifyOtp', verifyOTP)
candidate_router.post('/login', login)    

candidate_router.patch('/profile',verifyToken, updateProfile)
candidate_router.patch('/education',verifyToken, updateEducation) 
candidate_router.patch('/workexperience',verifyToken, updateWorkExperience)    
candidate_router.patch('/jobApply',verifyToken, jobApply) 

candidate_router.delete('/deleteEducation',verifyToken, deleteFromEducation)
candidate_router.delete('/deleteWorkExperience',verifyToken, deleteFromWorkExperience)

candidate_router.get('/getJobList', verifyToken ,findJobVacancyList)
candidate_router.get('/getJobDetails/:id', verifyToken, findJobDetails) 
candidate_router.get('/JobAppliedStatus', verifyToken, findJobAppliedStatus)
candidate_router.get('/candidateDetails',verifyToken, getCandidate)

//To Display name of the user in the navigation bar
candidate_router.get('/getCandidateName',verifyToken ,getCandidateName) 
//To know the user is employee or candidate to show the dashboard
candidate_router.get('/statusOfEmployee', isEmployee) 


export default candidate_router 

