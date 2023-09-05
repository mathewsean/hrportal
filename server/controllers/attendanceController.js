import Attendance from "../models/attendanceModel.js";
import Candidate from "../models/candidateModel.js";

export const clockIn = async (req, res) => {
  try {

    const { employeeId } = req.params

    const findEmployee = await Candidate.findOne({ _id: employeeId })

    if (findEmployee.isEmployee) {


      const clockedIn = await Attendance.create({ 
        employeeId: employeeId,
        clockIn: Date.now()
      })

      if (clockedIn) {
        return res.status(200).json({ message: "Clocked In Successfully" })
      }

    } else {
      return res.status(400).json({ error: "Invalid Credentials" })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const clockOut = async (req, res) => {
  try {

    const { employeeId } = req.params
    const today = new Date()
    today.setHours(0, 0, 0, 0)


    const findEmployee = await Candidate.findOne({ _id: employeeId })

    if (findEmployee.isEmployee) {
      const findEmployeeAttendance = await Attendance.findOne({
        employeeId: employeeId,
        clockIn: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      })

      if (findEmployeeAttendance) {
        const clockedOut = await Attendance.findOneAndUpdate(
          { _id: findEmployeeAttendance._id },
          { $set: { clockOut: Date.now() } }
        )

        if (clockedOut) {
          return res.status(200).json({ message: "Clocked Out Successfully" })
        }
      }
    } else {
      return res.status(400).json({ error: "Invalid Credentials" })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const clockInStatus = async(req, res) => {
  try {

    const {employeeId} = req.params
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const findEmployeeAttendanceClockout = await Attendance.findOne({
      employeeId: employeeId,
      clockOut: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    })

    if(findEmployeeAttendanceClockout){
      return res.status(200).json({message:false})
    }

    const findEmployeeAttendance = await Attendance.findOne({
      employeeId: employeeId,
      clockIn: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    })

    if(findEmployeeAttendance){
      return res.status(200).json({message:true})
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
    
  }
}