import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    default: 0
  }
})

const Counter = mongoose.model('Counter', counterSchema)

const jobSchema = mongoose.Schema({
  job_Id: {
    type: Number,
    unique: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salaryMin: {
    type: Number,
  },
  salaryMax: {
    type: Number,
  },
  jobType: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})

jobSchema.pre('save', async function (next) {
  if (!this.job_Id) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: 'job_Id' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      )
      this.job_Id = counter.sequence_value
      next()

    } catch (error) {
      next(error)
    }
  } else {
    next()
  }
})

const JobVacancy = mongoose.model('JobVacancy', jobSchema)
export default JobVacancy

