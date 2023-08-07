import Candidate from "../models/candidateModel.js"
import Education from "../models/educationModel.js"
import WorkExperience from "../models/workExperienceModel.js"


// To update education section of candidate
export const updateEducation = async (req, res) => {
  try {
    const candidateId = req.query.id


    const {
      levelOfEducation,
      fieldOfStudy,
      schoolName,
      country,
      city,
      fromDate,
      toDate } = req.body

    const updateEducation = await Education.create({
      levelOfEducation,
      fieldOfStudy,
      schoolName,
      country,
      city,
      fromDate,
      toDate
    })

    if (updateEducation) {
      await Candidate.findByIdAndUpdate(
        { _id: candidateId },
        { $push: { education: updateEducation._id } }
      )

      return res.status(200).json({ message: "Education Field Added Successfully" })

    } else {
      return res.status(500).json({ error: "Updation Failed" })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })

  }


}

// To update work experience section of candidate
export const updateWorkExperience = async (req, res) => {
  try {
    const candidateId = req.query.id

    const {
      jobTitle,
      companyName,
      location,
      description,
      fromDate,
      toDate } = req.body

    const updateWorkExperience = await WorkExperience.create({
      jobTitle,
      companyName,
      location,
      description,
      fromDate,
      toDate
    })

    if (updateWorkExperience) {
      await Candidate.findByIdAndUpdate(
        { _id: candidateId },
        { $push: { workExperience: updateWorkExperience._id } }
      )

      return res.status(200).json({ message: "Work Experience Field Added Successfully" })

    } else {
      return res.status(500).json({ error: "Updation Failed" })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

//To get the profile of a candidate
export const getCandidate = async (req, res) => {
  try {
    const { id } = req.query

    const getCandidate = await Candidate.findOne({ _id: id }).populate('education').populate('workExperience')

    if (getCandidate) {
      return res.status(200).json({ getCandidate })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

//To update the profile of a candidate
export const updateProfile = async (req, res) => {
  try {

    const candidateId = req.query.id
    const {
      firstName,
      lastName,
      emailId,
      dob,
      contactNos,
      address,
      city,
      pincode

    } = req.body

    const updateProfile = await Candidate.findByIdAndUpdate(
      candidateId,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          dob: dob,
          contactNos: contactNos,
          address: address,
          city: city,
          pincode: pincode
        }
      }
    )


    if (updateProfile) {
      return res.status(200).json({ message: "Profile Updated Successfully" })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

//To delete education from the profile
export const deleteFromEducation = async (req, res) => {
  try {

    const educationId = req.query.id
    const candidateId = req.query.candId


    const pullFromEducation = await Candidate.findByIdAndUpdate(
      candidateId,
      { $pull: { education: educationId } }
    )
    const deleteEducation = await Education.findByIdAndDelete(educationId)

    if (pullFromEducation && deleteEducation) {
      return res.status(200).json({ message: "Education Deleted successfully" })
    }

  } catch (error) {

    return res.status(400).json({ message: error.message })

  }
}


//To delete work experience from the profile
export const deleteFromWorkExperience = async (req, res) => {
  try {

    const workExperienceId = req.query.id
    const candidateId = req.query.candId

    const pullFromWorkExperience = await Candidate.findByIdAndUpdate(
      candidateId,
      { $pull: { workExperience: workExperienceId } }
    )    

    const deleteWorkExperience = await WorkExperience.findByIdAndDelete(workExperienceId)    

    if (pullFromWorkExperience && deleteWorkExperience) {
      return res.status(200).json({ message: "Work Experience Deleted successfully" })
    }

  } catch (error) {

    return res.status(400).json({ message: error.message })

  }
}

