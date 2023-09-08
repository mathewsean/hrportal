import express from 'express'
import {postLeaveApplication, getEmployeeLeaveList} from '../controllers/leaveApplicationController.js'
import { verifyToken } from '../middlewares/auth.js'
import {clockIn, clockOut, clockInStatus} from '../controllers/attendanceController.js'
import {updateTask} from '../controllers/employeeTaskController.js'

const employee_router = express.Router()

employee_router.post('/createLeaveApplication', verifyToken, postLeaveApplication)
employee_router.post('/employee_clockIn/:employeeId', verifyToken, clockIn)

employee_router.patch('/employee_clockOut/:employeeId', verifyToken, clockOut) 
employee_router.patch('/employee_task_update/:taskId', updateTask)

employee_router.get('/getLeaveListOfEmployee', verifyToken, getEmployeeLeaveList)  
employee_router.get('/get_clokedIn_status/:employeeId', clockInStatus)    


export default employee_router 