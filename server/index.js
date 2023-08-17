import express from 'express'
import connectDB from './middlewares/db.js'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const PORT = process.env.PORT || 8000
connectDB()

import candidateRouter from './routes/candidateRoutes.js' 
app.use('/', candidateRouter)

import adminRouter from './routes/adminRoutes.js'
import morgan from 'morgan'
app.use('/admin', adminRouter)

import employeeRouter from './routes/employeeRoutes.js'
app.use('/', employeeRouter)


app.listen(PORT, ()=>{
  console.log(`Server runs on ${PORT}`); 
})