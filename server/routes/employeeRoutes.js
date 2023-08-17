import express from 'express'
import {postLeaveApplication, getEmployeeLeaveList} from '../controllers/leaveApplicationController.js'

const employee_router = express.Router()

employee_router.post('/createLeaveApplication', postLeaveApplication)

employee_router.get('/getLeaveListOfEmployee', getEmployeeLeaveList)


export default employee_router