import JobVacancy from "../models/jobModel.js";
import JobApplied from "../models/jobAppliedModel.js";


//To add a new job post by admin
export const jobPostNew = async (req, res) => {
  try {
    const {
      jobTitle,
      location,
      salaryMin,
      salaryMax,
      jobType,
      jobDescription,
      expiry      
    } = req.body

    const createJob = await JobVacancy.create({ 
      jobTitle,
      location,
      salaryMin,
      salaryMax,
      jobType,
      jobDescription,
      expiry,
      createdAt: Date.now()
    })

    if(createJob){
      return res.status(200).json({message:"New Job Vacancy Created."})
    } else {
      return res.status(500).json({error:"Updaton Failed"})
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}

// To apply for a job by candidate
export const jobApply = async(req, res) => {
  try {
    const {jobId, candidateId} = req.body

    const findJobIdExist = await JobApplied.findOne({jobId:jobId})

    if(!findJobIdExist){

      //create job applied collection and add candidate id

      const createJobApplied = await JobApplied.create({jobId:jobId})

      if(createJobApplied){
        await JobApplied.findByIdAndUpdate(
          createJobApplied._id,
          {$push:{jobAppliedCandidateId:candidateId}}
          )
        return res.status(200).json({message:"Job Applied Succesfully"})
      }
    } else {
      
      //add candidate id to the exist job applied collection

      const addCandidateId = await JobApplied.findByIdAndUpdate(
        findJobIdExist._id,
        {$push:{jobAppliedCandidateId:candidateId}}
      )
      return res.status(200).json({message:"Job Applied Succesfully"})
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}  


export const findJobVacancyList = async(req,res) => {
  try {

    const getJobList = await JobVacancy.find()
    console.log(getJobList);

    if(getJobList){
      res.status(200).json({getJobList})
    } else {
      res.status(200).json({message: "Currently, No Vacancy available"})
    }    
    
  } catch (error) {
    return res.status(500).json({message : error.message})
  }

}

export const findJobDetails = async(req,res) => {
  try {
    const {id} = req.params

    const getJobDetail = await JobVacancy.findOne({_id:id})

    if(getJobDetail){
      res.status(200).json({getJobDetail})
    } else {
      res.status(200).json({message: "Job Expired"})
    }
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const findJobAppliedStatus = async(req,res) => {
  try {

    const {jobId, candidateId} = req.query

    const findStatus = await JobApplied.findOne({jobId:jobId})

    console.log(findStatus);

    // if(findStatus){
      
    // }
    
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}