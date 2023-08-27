import mongoose from "mongoose";

const leaveApplicationSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  fromDate: {
    type: Date,
    required:true
  },
  toDate: {
    type: Date,
    required: true
  },
  reason:{
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Pending"
  }
})

const LeaveApplication = mongoose.model('LeaveApplication', leaveApplicationSchema)
export default LeaveApplication