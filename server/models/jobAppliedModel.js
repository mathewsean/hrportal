import mongoose from "mongoose";


const jobAppliedSchema = mongoose.Schema({
  jobId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobVacancy'
  },
  pending:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }],
  notAFit:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Candidate'
  }],
  mayBe:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Candidate'    
  }],
  goodFit:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Candidate'
  }]
})

const JobApplied = mongoose.model('Job', jobAppliedSchema)

export default JobApplied