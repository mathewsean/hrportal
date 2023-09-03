import JobVacancy from "../models/jobVacancyModel.js";
import JobApplied from "../models/jobAppliedModel.js";
import Candidate from "../models/candidateModel.js"

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

    if (createJob) {
      return res.status(200).json({ message: "New Job Vacancy Created." })
    } else {
      return res.status(500).json({ error: "Updaton Failed" })
    }

  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}


//To get the list of candidates applied for the job vacancy

export const findListOfJobApplication = async (req, res) => {
  try {

    const jobId = req.query.id


    const findAppliedCandidates = await JobApplied.findOne({ jobId: jobId })
      .populate('jobId')
      .populate('pending')
      .populate('notAFit')
      .populate('mayBe')
      .populate('goodFit')


    console.log("find Applied Candif", findAppliedCandidates);


    if (findAppliedCandidates) {
      return res.status(200).json(findAppliedCandidates)
    }


  } catch (error) {
    return res.status(400).json({ message: "No Application Found" })
  }
}

//To get the details of candidate

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

//To update job application of candidate

export const updateJobApplicationStatus = async (req, res) => {
  try {

    const { candidateId, jobId } = req.params
    const { status } = req.body

    console.log('candidateId', candidateId);
    console.log('jobId', jobId);
    console.log('status', status);

    if (status === 'goodFit') {
      console.log('status');

      const updateJobStatus = await JobApplied.findOneAndUpdate(
        { jobId: jobId },
        {
          $push: { goodFit: candidateId },
          $pull: {
            pending: candidateId,
            notAFit: candidateId,
            mayBe: candidateId
          }
        }
      )
      console.log(updateJobStatus);

      if (updateJobStatus) {
        return res.status(200).json({ message: 'Candidate Status updated in Good Fit' })
      }
    }

    if (status === 'mayBe') {

      const updateJobStatus = await JobApplied.findOneAndUpdate(
        { jobId: jobId },
        {
          $push: { mayBe: candidateId },
          $pull: {
            pending: candidateId,
            notAFit: candidateId,
            goodFit: candidateId
          }
        }
      )

      if (updateJobStatus) {
        return res.status(200).json({ message: "Candidate Status updated in May Be" })
      }
    }

    if (status === 'notAFit') {

      const updateJobStatus = await JobApplied.findOneAndUpdate(
        { jobId: jobId },
        {
          $push: { notAFit: candidateId },
          $pull: {
            pending: candidateId,
            goodFit: candidateId,
            mayBe: candidateId
          }
        }
      )

      if (updateJobStatus) {
        return res.status(200).json({ message: "Candidate Status updated in Not A Fit" })
      }
    }



  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


// To get the status of application

export const getApplicationStatus = async (req, res) => {
  try {

    const { candidateId, jobId } = req.params

    const findJob = await JobApplied.findOne({ jobId: jobId })

    if (findJob) {
      const { pending, notAFit, mayBe, goodFit } = findJob

      if (pending.includes(candidateId)) 
      {
        return res.status(200).json('pending')
      } 
      else if (notAFit.includes(candidateId)) 
      {
        return res.status(200).json('notAFit')
      } 
      else if (mayBe.includes(candidateId)) 
      {
        return res.status(200).json('mayBe')
      } 
      else if (goodFit.includes(candidateId)) 
      {
        return res.status(200).json('goodFit')
      } else 
      {
        return res.status(500).json({message: "data fetch failed"})
      }



    }

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
