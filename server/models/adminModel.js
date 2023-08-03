import mongoose from "mongoose";

const adminSchema = mongoose.Schema({

  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  emailId:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  otp:{
    type: String,
    
  },
  otpCreatedAt:{
    type: String,
    
  },
  isEmailVerified:{
    type: Boolean,
    default: false
  },
  isAuthorisedToBeAdmin:{
    type: Boolean,
    default: false
  }
})

const Admin = mongoose.model('Admin', adminSchema)
export default Admin