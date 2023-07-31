import mongoose from "mongoose";

const candidateSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    
  },
  contactNos:{
    type: Number,
    
  },
  address:{
    type: String,
    
  },
  city:{
    type: String,
    
  },
  pincode:{
    type:String,
    
  },
  education: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Education'
  }],
  workExperience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkExperience'
  }],
  password:{
    type: String,
    required: true 
  },
  otpVerified:{
    type: Boolean,
    default: false
  },
  otp:{
    type: String,
    required: true
  },
  otpCreatedAt:{
    type: String,
    required: true
  }
})

const Candidate = mongoose.model('Candidate', candidateSchema)
export default Candidate