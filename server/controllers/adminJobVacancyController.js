import JobVacancy from "../models/jobVacancyModel.js";
import Job from "../models/jobVacancyModel.js"
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


//To get the list of candidates applied for the job vacancy

export const findListOfJobApplication = async(req, res) => {
  try {

    const jobId = req.query.id

    
    const findAppliedCandidates = await JobApplied.findOne({jobId:jobId}).populate('jobId').populate('jobAppliedCandidateId')
    if(findAppliedCandidates){
      return res.status(200).json(findAppliedCandidates)
    }

    
  } catch (error) {
    return res.status(400).json({message:"No Application Found"})
  }
}

