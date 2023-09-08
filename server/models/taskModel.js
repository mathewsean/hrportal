import mongoose from "mongoose";

const taskSchema = mongoose.Schema({

  taskName:{
    type: String,
    required:true
  },
  employeeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required:true
  },
  createdAt: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  status:{
    type: String,
    enum: ["Pending", "Work in Progress", "Completed"],
    default: "Pending"
  },
  isActive:{
    type:Boolean,
    default: true
  }

})

const Task = mongoose.model('Task', taskSchema)
export default Task