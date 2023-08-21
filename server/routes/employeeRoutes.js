import express from 'express'
import {postLeaveApplication, getEmployeeLeaveList} from '../controllers/leaveApplicationController.js'
import { verifyToken } from '../middlewares/auth.js'

const employee_router = express.Router()

employee_router.post('/createLeaveApplication', verifyToken, postLeaveApplication)

employee_router.get('/getLeaveListOfEmployee', verifyToken, getEmployeeLeaveList)


export default employee_router