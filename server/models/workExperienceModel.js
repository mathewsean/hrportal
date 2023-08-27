import mongoose from "mongoose";

const workExpSchema = mongoose.Schema({
  jobTitle:{
    type: String,
    required: true
  },
  companyName:{
    type: String,
    required: true
 },
 location:{
  type: String,
  required: true
 },
 description:{
  type: String,
  required: true
 },
 fromDate:{
  type: Date,
  required: true
 },
 toDate:{
  type: Date, 
  required: true
 }

})

const WorkExperience = mongoose.model('WorkExperience', workExpSchema)
export default WorkExperience