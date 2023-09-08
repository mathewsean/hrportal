import Candidate from "../models/candidateModel.js";
import Department from "../models/departmentModel.js";
import Task from "../models/taskModel.js"
import { login } from "./authController.js";

// To get list of employees for admin
export const getEmployee = async(req, res) => {
  try {

    const getEmployeeData = await Candidate.find({isEmployee:true})

    if(getEmployeeData){
      return res.status(200).json(getEmployeeData)
    } else {
      return res.status(200).json({message: "Employee Not Found"})
    }
    
  } catch (error) {
    return res.status(500).json({message: "No data Found"})
  }
}

//To create a department

export const createDepartment = async(req, res) => {
  try {

    const {department} = req.body
    const departmentName = department.toUpperCase().trim()
    console.log(departmentName);

    const findExistingDepartment = await Department.findOne({departmentName:departmentName})

    if(!findExistingDepartment){

      const createNewDepartment = await Department.create({
        departmentName: departmentName
      })

      if(createNewDepartment){
        return res.status(200).json({message:"New Department Created Successfully"})
      }

    } else {

      return res.status(400).json({message: "Existing Department Add New Department"})

    }   
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

//To add a designation in a department

export const addDesignation = async(req, res) => {
  try {

    const {departmentId} = req.params
    const {designation} = req.body
    const designationName = designation.toUpperCase().trim()
    
    if(designation === ""){
      return res.status(400).json({message: "Empty value"})
    }

    const findDepartment = await Department.findOne({_id:departmentId})

    if(findDepartment){
      if(findDepartment.designation.includes(designationName)){

        return res.status(400).json({message:"Exisiting Designation"})

      } else {

        const addNewDesignation = await Department.findOneAndUpdate(
          {_id:departmentId},
          {$push:{designation:designationName}}
        )

        if(addNewDesignation){
          return res.status(200).json({message:"New Designation Added Succesfully"})
        } else {
          return res.status(500).json({message: "Please try again"})
        }
      }
    }

    
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

//To get the list of department in the company

export const getDepartment = async(req, res) => {
  try {

    const getDepartmentList = await Department.find()

    if(getDepartmentList){
      return res.status(200).json(getDepartmentList)
    }
    
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

export const addNewTask = async(req, res) => {
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

    if(addTask){
      return res.status(200).json({message:"New Task Added Successfully"})
    }


    
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}

export const deactivateTask = async(req, res) => {
  try {

    const {taskId} = req.params

    const deactivate = await Task.findOneAndUpdate(
      {_id:taskId},
      {$set:{isActive:false}}
    )

    if(deactivate){
      return res.status(200).json({message:"Task deactivated successfully"})
    }

  } catch (error) {
    return res.status(500).json({error:error.message})
  }
}