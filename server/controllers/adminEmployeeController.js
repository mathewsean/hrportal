import Candidate from "../models/candidateModel.js";
import Department from "../models/departmentModel.js";
import Task from "../models/taskModel.js"
import Attendance from "../models/attendanceModel.js"

// To get list of employees for admin
export const getEmployee = async (req, res) => {
  try {

    const getEmployeeData = await Candidate.find({ isEmployee: true })

    if (getEmployeeData) {
      return res.status(200).json(getEmployeeData)
    } else {
      return res.status(200).json({ message: "Employee Not Found" })
    }

  } catch (error) {
    return res.status(500).json({ message: "No data Found" })
  }
}


//To create a department
export const createDepartment = async (req, res) => {
  try {

    const { department } = req.body
    const departmentName = department.toUpperCase().trim()
    console.log(departmentName);

    const findExistingDepartment = await Department.findOne({ departmentName: departmentName })

    if (!findExistingDepartment) {

      const createNewDepartment = await Department.create({
        departmentName: departmentName
      })

      if (createNewDepartment) {
        return res.status(200).json({ message: "New Department Created Successfully" })
      }

    } else {

      return res.status(400).json({ message: "Existing Department Add New Department" })

    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//To add a designation in a department

export const addDesignation = async (req, res) => {
  try {

    const { departmentId } = req.params
    const { designation } = req.body
    const designationName = designation.toUpperCase().trim()

    if (designation === "") {
      return res.status(400).json({ message: "Empty value" })
    }

    const findDepartment = await Department.findOne({ _id: departmentId })

    if (findDepartment) {
      if (findDepartment.designation.includes(designationName)) {

        return res.status(400).json({ message: "Exisiting Designation" })

      } else {

        const addNewDesignation = await Department.findOneAndUpdate(
          { _id: departmentId },
          { $push: { designation: designationName } }
        )

        if (addNewDesignation) {
          return res.status(200).json({ message: "New Designation Added Succesfully" })
        } else {
          return res.status(500).json({ message: "Please try again" })
        }
      }
    }


  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//To get the list of department in the company

export const getDepartment = async (req, res) => {
  try {

    const getDepartmentList = await Department.find()

    if (getDepartmentList) {
      return res.status(200).json(getDepartmentList)
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const addNewTask = async (req, res) => {
  try {

    const {
      taskName,
      employeeId,
      startDate,
      endDate
    } = req.body

    const addTask = await Task.create({
      taskName: taskName,
      employeeId: employeeId,
      createdAt: Date.now(),
      startDate: startDate,
      endDate: endDate
    })

    if (addTask) {
      return res.status(200).json({ message: "New Task Added Successfully" })
    }



  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deactivateTask = async (req, res) => {
  try {

    const { taskId } = req.params

    const deactivate = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: { isActive: false } }
    )

    if (deactivate) {
      return res.status(200).json({ message: "Task deactivated successfully" })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getTaskList = async (req, res) => {
  try {

    const findTaskList = await Task.find().populate({
      path: 'employeeId',
      select: 'firstName lastName'
    })

    if (findTaskList) {
      res.status(200).json({ findTaskList })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const convertCandidate = async (req, res) => {
  try {

    const { candidateId } = req.params

    const { department, designation, basicSalary, joiningDate } = req.body

    const updateEmployee = await Candidate.findOneAndUpdate(
      { _id: candidateId },
      {
        $set: {
          isEmployee: true,
          department: department,
          designation: designation,
          basicSalary: basicSalary,
          joiningDate: joiningDate
        }
      }
    )

    if (updateEmployee) {
      return res.status(200).json({ message: "Candidate converted to Employee Successfully" })
    }

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


export const monthlyAttendance = async (req, res) => {
  try {

    const { month, year } = req.body

    const startDate = new Date(year, month, 1)
    console.log(startDate);
    const endDate = new Date(year, month + 1, 0)
    console.log(endDate);

    const lookUpCandidate = await Attendance.aggregate([
      {
        $lookup: {
          from: 'candidates',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'candidateData'
        }
      },
      {
        $unwind: "$candidateData"
      }

    ])

    console.log('lookUpCandidate', lookUpCandidate);

    const findAttendance = await Attendance.aggregate([
      {
        $match: {
          clockIn: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$clockIn" } },
          employeeId: 1,
          clockIn: 1,
          clockOut: 1
        }
      },
      {
        $group: {
          _id: {
            employeeId: "$employeeId",
            date: "$date"
          },
          clockIn: { $first: { $dateToString: { format: "%Y-%m-%d", date: "$clockIn" } } },
          clockOut: { $first: { $dateToString: { format: "%Y-%m-%d", date: "$clockOut" } } }
        }
      },
      {
        $lookup: {
          from: "candidates", 
          localField: "_id.employeeId",
          foreignField: "_id",
          as: "candidateData"
        }
      },
      {
        $unwind: "$candidateData"
      },
      {
        $project: {
          _id: 0,
          employeeId: "$_id.employeeId",
          firstName: "$candidateData.firstName",
          lastName: "$candidateData.lastName",
          date: "$_id.date",
          status: {
            $cond: {
              if: { $eq: ["$clockIn", "$clockOut"] },
              then: "P",
              else: "A" 
            }
          }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          data: {
            $push: {
              date: "$date",
              status: "$status"
            }
          }
        }
      }

    ]);
    
    return res.status(200).json(findAttendance)

  } catch (error) {

    return res.status(500).json({ error: error.message })

  }
}