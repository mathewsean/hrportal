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