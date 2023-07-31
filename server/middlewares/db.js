import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectDB = async() => {
  const res = await mongoose.connect(
    process.env.MONGODBCONNECT
  )
  if(res){
    console.log("DB connected Succefully");
  }
}
 
export default connectDB   