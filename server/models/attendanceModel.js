import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  employeeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },

  clockIn:{
    type: Date,
    required: true
  },

  clockOut:{
    type: Date
  }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)
export default Attendance