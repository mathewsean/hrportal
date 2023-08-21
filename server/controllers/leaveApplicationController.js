import LeaveApplication from "../models/leaveApplicationModel.js";

//To create a new leave application by employee
export const postLeaveApplication = async (req, res) => {
  try {

    const { employeeId, fromDate, toDate, reason } = req.body

    const createLeaveApplication = await LeaveApplication.create({
      employeeId,
      fromDate,
      toDate,
      reason
    })    

    if (createLeaveApplication) {
      return res.status(200).json({ message: "Leave application Created Sucessfully" })
    }

  } catch (error) {
    return res.render(500).json({message: error.message})

  }

}

//To get leave application list of employee
export const getEmployeeLeaveList = async(req, res) => {
  try {

    const {id} = req.query

    const employeeLeaveList = await LeaveApplication.find({employeeId: id})

    if(employeeLeaveList){
      return res.status(200).json(employeeLeaveList)
    }
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


//To get the full list of leave application for admin
export const getLeaveApplications = async(req, res) => {
  try {

    const leaveApplicationsList = await LeaveApplication.find().populate('employeeId')    

    if(leaveApplicationsList){
      return res.status(200).json(leaveApplicationsList)
    }
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

//To update the status of leave from admin panel

export const updateLeaveStatus = async(req, res) => {

  try {

    const {leaveId, status} = req.body

    const updateStatus = await LeaveApplication.findByIdAndUpdate(
      leaveId,
      {status: status}      
      )

      if(updateStatus){
        return res.status(200).json({message: "Leave Status Updated Successfully"})
      }
    
  } catch (error) {
    return res.status(500).json({message:error.message})
  }

}