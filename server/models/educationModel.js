import mongoose from "mongoose";

const educationSchema = mongoose.Schema({  
  candidateId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },
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
  city:{
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

const Education = mongoose.model('Education', educationSchema)
export default Education