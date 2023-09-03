import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  departmentName: {
    type: String,
    required: true
  },
  designation: [{
    type: String
  }]
})

const Department = mongoose.model('Department', departmentSchema)
export default Department