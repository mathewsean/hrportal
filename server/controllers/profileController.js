import Candidate from "../models/candidateModel.js"
import Education from "../models/educationModel.js"
import WorkExperience from "../models/workExperienceModel.js"


// To update education section of candidate
export const updateEducation = async(req,res) => {
  try {
    const candidateId = req.query.id

    const {
      levelOfEducation, 
      fieldOfStudy, 
      schoolName, 
      country, 
      fromDate,
      toDate} = req.body
  
    const updateEducation = await Education.create({ 
      levelOfEducation, 
      fieldOfStudy, 
      schoolName, 
      country, 
      fromDate,
      toDate
    })
  
    if(updateEducation){
      await Candidate.findByIdAndUpdate(
        {_id:candidateId},
        {$push:{ education: updateEducation._id}}
        )
      
      return res.status(200).json({message: "Education Field Added Successfully"}) 
  
    } else {
      return res.status(500).json({error: "Updation Failed"})  
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
    
  }

 
}

// To update work experience section of candidate
export const updateWorkExperience = async(req,res) => {
  try {
    const candidateId = req.query.id

  const {
    jobTitle, 
    companyName, 
    location, 
    description, 
    fromDate,
    toDate} = req.body

  const updateWorkExperience = await WorkExperience.create({ 
    jobTitle, 
    companyName, 
    location, 
    description, 
    fromDate,
    toDate
  })

  if(updateWorkExperience){
    await Candidate.findByIdAndUpdate(
      {_id:candidateId},
      {$push:{ workExperience: updateWorkExperience._id}}
      )
    
    return res.status(200).json({message: "Work Experience Field Added Successfully"}) 

  } else {
    return res.status(500).json({error: "Updation Failed"})  
  }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }  
}

