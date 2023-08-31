import {body} from 'express-validator'

export const validatorRegisterCandidate = [
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('emailId').isEmail().withMessage('Invalid Email Id'),
  body('password').isLength({min:8}).withMessage('Password must be 8 character long')

]



export const validatorCandidateLogin = [
  body('emailId').isEmail().withMessage('Invalid Email Id'),
  body('password').isLength({min:8}).withMessage('Password must be 8 character long')
]