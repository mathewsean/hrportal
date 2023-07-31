import express from "express";
import {jobPostNew} from "../controllers/jobController.js"


const admin_router = express.Router()

admin_router.post('/post_job_vacancy', jobPostNew)

export default admin_router  