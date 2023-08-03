import Admin from "../models/adminModel.js";
import bycrptjs from "bcryptjs"
import otpGenerator from "otp-generator"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'
dotenv.config()  

//To register an admin in the portal

export const registerAdmin = async (req, res) => {
  try {

    const { firstName, lastName, emailId, password } = req.body
    const existingAdmin = await Admin.findOne({ emailId:emailId })

    if (!existingAdmin) {

      const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
      const genSalt = await bycrptjs.genSalt(10)
      const hashPassword = await bycrptjs.hash(password, genSalt)
      
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth:{
          user: process.env.EMAILTOSEND,
          pass: process.env.EMAILPASSWORD 
        }
      })

      const mailOptions = {
        from: process.env.EMAILTOSEND,
        to:emailId,
        subject: 'Your One Time Password : Admin',
        text: `Your OTP is ${otp}. It will expire within 5 minutes`
      }

      transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })

      const createAdmin = await Admin.create({
        firstName,
        lastName,
        emailId,
        password: hashPassword,
        otp,
        otpCreatedAt: Date.now() 
      })

      if(createAdmin){
        return res.status(200).json({message: "OTP sent to your email."})
      } else {
        return res.status(400).json({message: "Registration failed. Try once Again"})
      }
    }

  } catch (error) {
    res.status(400).json({ error: error.message }) 
  }
}

// To verify the email by OTP sent to admin's mail id while registering
export const verifyOTPAdmin = async(req,res) => {
  try {
    const {emailId, otp} = req.body

    const findOTP = await Admin.findOne({emailId:emailId})

    if(!findOTP){
      return res.status(400).json({error: "Entered Invalid Credentials. Please try again."})
    }

    if(findOTP.otp === otp && (Date.now() - findOTP.otpCreatedAt < 5 * 60 * 1000)){
      await Admin.findOneAndUpdate({emailId:emailId}, {isEmailVerified:true})
      return res.status(200).json({message: "OTP Verified Successfully. Please Login."})
    } else {
      return res.status(400).json({error: "Entered Invalid OTP. Please try again."})
    }    
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}


// To login with candidate's registered credential.

export const adminLogin = async(req, res) => {
  try {
    const {emailId, password} = req.body

    const admin = await Admin.findOne({emailId:emailId})

    if(!admin){
      return res.status(400).json({message:"Invaild Email"})
    }

    const checkPassword = bycrptjs.compareSync(password, admin.password)

    if(checkPassword && admin.isEmailVerified && admin.isAuthorisedToBeAdmin){ 
      //Generate JWT token
      const token = jwt.sign({id:admin._id}, process.env.JWTSECRET) 
      
      return res.status(200).json({
        message:"Logged In Successfully", 
        token, 
        adminId:admin._id, 
        firstName:admin.firstName, 
        lastName:admin.lastName
      })
    } else {
      return res.status(400).json({message:"Invalid Password"})
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}
