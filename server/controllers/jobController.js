import JobVacancy from "../models/jobVacancyModel.js";
import JobApplied from "../models/jobAppliedModel.js";

// To apply for a job by candidate
export const jobApply = async(req, res) => {
  try {
    const {jobId, candidateId} = req.body

    console.log('candidate id fo',candidateId );

    const findJobIdExist = await JobApplied.findOne({jobId:jobId})

    if(!findJobIdExist){

      //create job applied collection and add candidate id

      const createJobApplied = await JobApplied.create({jobId:jobId})

      if(createJobApplied){
        await JobApplied.findByIdAndUpdate(
          createJobApplied._id,
          { $push: { pending:[candidateId] } }
          )
        return res.status(200).json({message:"Job Applied Succesfully"}) 
      }
    } else {
      
      //add candidate id to the exist job applied collection

      const addCandidateId = await JobApplied.findByIdAndUpdate(
        findJobIdExist._id,
        { $push: { pending:[candidateId] } }
      )
      return res.status(200).json({message:"Job Applied Succesfully"})
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}  

//To get the List of Job Vacancies in the company to display it in the dashboard of candidate
export const findJobVacancyList = async(req,res) => {
  try {

    const getJobList = await JobVacancy.find()
    
    
    if(getJobList){
      res.status(200).json({getJobList})
    } else {
      res.status(200).json({message: "Currently, No Vacancy available"})
    }    
    
  } catch (error) {
    return res.status(500).json({message : error.message})
  }
}

//To get full details of a job displayed in the dashboard of candidate
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

// To check whether the candidate already applied or not to a job vancies listed in his account
export const findJobAppliedStatus = async(req,res) => {
  try {

    const {jobId, candidateId} = req.query  

    const findStatus = await JobApplied.findOne({jobId:jobId})    

    if(findStatus){

      const allIds = [
        ...findStatus.pending,
        ...findStatus.notAFit,
        ...findStatus.mayBe,
        ...findStatus.goodFit
      ]      

      const isCandidateApplied = allIds.some(id => id.equals(candidateId))
      
      console.log(isCandidateApplied);   
      res.status(200).json({isCandidateApplied}) 
 
    } else {
      res.status(404).json({message: "JobId is not found"})
    }

  } catch (error) {
    res.status(500).json({error:error.message})
  }
}