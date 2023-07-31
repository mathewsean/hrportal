import mongoose from "mongoose";

const educationSchema = mongoose.Schema({  
  levelOfEducation:{
    type: String,
    required: true
  },
  fieldOfStudy:{
    type: String,
    required: true
  },
  schoolName:{
    type:String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  fromDate:{
    type: String,
    required: true
  },
  toDate:{
    type: String,
    required: true
  }  
})

const Education = mongoose.model('Education', educationSchema)
export default Education