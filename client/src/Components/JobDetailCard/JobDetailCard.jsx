import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptor'
import { useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function JobDetailCard() {

  const { id } = useParams()

  const token = localStorage.getItem('token')
  const candidateId = jwtDecode(token) 
  
  const [jobDetails, setJobDetails] = useState({})
  const [jobApplied, setJobApplied] = useState(false)
  
 

  useEffect(() => {

    async function getJobDetails() {
      try {
        const res = await axios.get(`/getJobDetails/${id}`)
        setJobDetails(res.data)        
      }
      catch (error) {
        console.error(error)
      }
    }

    getJobDetails()

  }, [])

  useEffect(() => {
    async function jobAppliedStatus() {
      try {
        const res = await axios.get(`/JobAppliedStatus`, {
          params:{
            jobId: id,
            candidateId: candidateId.id
          }
        })
        console.log(res.data);
        setJobApplied(res.data.isCandidateApplied)

      } catch (error) {
        console.error(error)
      }
    }

    jobAppliedStatus()

  }, [id, candidateId.id])



  const handleApplyNow = async () => {
    try {
      const jobApplyCredentials = {
        jobId: id,
        candidateId:candidateId.id
      }

      if (!jobApplied) {
        const applyJob = await axios.patch('/jobApply', jobApplyCredentials)
        window.location.reload();
      }

    } catch (error) {
      console.error(error)
    }

  }

  return (
    <div className='flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='flex justify-between'>
        {jobDetails.getJobDetail?.jobTitle ? (
          <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>
            {jobDetails.getJobDetail.jobTitle}
          </p>
        ) : (
          <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>Loading...</p>
        )}
        <button onClick={handleApplyNow} className='w-96 h-10 bg-cyan-300 text-lg font-semibold text-black mt-7 mx-10 rounded-md'>
          {jobApplied ? 'Applied' : 'Apply Now'}

        </button>
      </div>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Location: {jobDetails.getJobDetail?.location}
      </p>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Salary: {jobDetails.getJobDetail?.salaryMin} to {jobDetails.getJobDetail?.salaryMax}
      </p>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Job Type:
      </p>
      <p className='font-sans mx-10 mt-2 mb-7 text-left'>
        {jobDetails.getJobDetail?.jobDescription}
      </p>
    </div>
  )
}

export default JobDetailCard