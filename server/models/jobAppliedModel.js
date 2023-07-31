import mongoose from "mongoose";


const jobAppliedSchema = mongoose.Schema({
  jobId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  jobAppliedCandidateId:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }]
})

const JobApplied = mongoose.model('Job', jobAppliedSchema)

export default JobApplied