import Candidate from '../models/candidateModel.js'
import bycrptjs from 'bcryptjs'
import otpGenerator from 'otp-generator' 
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
dotenv.config()

//To register a candidate using first name, last name, email, password.
export const registerCandidate = async(req,res) => {
  try {

    const { firstName, lastName, emailId, password } = req.body
    const existingEmail = await Candidate.findOne({emailId:emailId})

    if(!existingEmail){
      const otp = otpGenerator.generate(6,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false}) 
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
        subject: 'Your One Time Password',
        text: `Your OTP is ${otp}. It will expire within 5 minutes`
      }

      transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })

      const createCandidate = await Candidate.create({
        firstName,
        lastName,
        emailId,
        password: hashPassword,
        otp,
        otpCreatedAt: Date.now() 
      })

      if(createCandidate){
        return res.status(200).json({message: "OTP sent to your email."})
      } else {
        return res.status(400).json({message: "Registration failed. Try once Again"})
      }

    } else {
      return res.status(400).json({message:"Email Already Registered"})
    }    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}

// To verify the email by OTP sent to candidate's mail id while registering 

export const verifyOTP = async(req,res) => {
  try {
    const {emailId, otp} = req.body

    const findOTP = await Candidate.findOne({emailId:emailId})

    if(!findOTP){
      return res.status(400).json({error: "Entered Invalid OTP. Please try again."})
    }

    if(findOTP.otp === otp && (Date.now() - findOTP.otpCreatedAt < 5 * 60 * 1000)){
      await Candidate.findOneAndUpdate({emailId:emailId}, {otpVerified:true})
      return res.status(200).json({message: "OTP Verified Successfully. Please Login."})
    } else {
      return res.status(400).json({error: "Entered Invalid OTP. Please try again."})
    }    
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}

// To login with candidate's registered credential.

export const login = async(req, res) => {
  try {
    const {emailId, password} = req.body

    const candidate = await Candidate.findOne({emailId:emailId})

    if(!candidate){
      return res.status(400).json({message:"Invaild Email"})
    }

    const checkPassword = bycrptjs.compareSync(password, candidate.password)

    if(checkPassword){
      //Generate JWT token
      const token = jwt.sign({id:candidate._id}, process.env.JWTSECRET) 
      
      return res.status(200).json({
        message:"Logged In Successfully", 
        token, 
        id:candidate._id, 
        firstName:candidate.firstName, 
        lastName:candidate.lastName
      })
    } else {
      return res.status(400).json({message:"Invalid Password"})
    }
    
  } catch (error) {
    return res.status(400).json({ message : error.message })
  }
}




