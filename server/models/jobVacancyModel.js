import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
  jobTitle:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  salaryMin:{
    type: Number,    
  },
  salaryMax:{
    type: Number,
  },
  jobType:{
    type: String,
    required: true  
  },
  jobDescription:{
    type: String,
    required: true
  },
  createdAt:{
    type: String,
    required: true
  },
  expiry:{
    type: Date,
    required: true
  },
  active:{
    type: Boolean,
    default: true
  }
})

const JobVacancy = mongoose.model('JobVacancy', jobSchema)
export default JobVacancy

