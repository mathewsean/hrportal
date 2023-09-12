import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptor'
import {Link, useNavigate} from 'react-router-dom'

function JobCard() {

  const [jobVacancyList, setjobVacancyList] = useState([])  
  const navigate = useNavigate()

  useEffect(() => {

    async function getJobList() {
      try {
        
        const token = localStorage.getItem('token')

        // if(!token){     
        //   navigate('/login')

        //   return
        // }
        
        const res = await axios.get('/getJobList',{
          headers:{
            Authorization: token  
          }
        })
        setjobVacancyList(res.data.getJobList)
        

      } catch (error) {
        console.error(error);
      }
    }
    getJobList()

  }, [])

  
  return (
    <ul>
      <div className='container mx-4 sm:mx-8 md:mx-16 pt-10 '>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4'>

          {jobVacancyList.map(job => (

            <li key={job._id}>

              <Link to={`/jobs/${job._id}`}>
              <button className='flex-col w-96 h-96 bg-slate-200 rounded-2xl shadow-md text-clip overflow-hidden ...'>
              <p className='font-sans font-bold mx-10 mt-7 text-left'>
                  Job Vacancy Id: {job.job_Id}
                </p>
                <p className='font-sans text-2xl font-bold mx-10 mt-2 text-left'>
                  {job.jobTitle}
                </p>
                <p className='font-sans font-bold mx-10 mt-2 text-left'>
                  Location: {job.location}
                </p>
                
                <p className='font-sans mx-10 text-left '>    
                  {job.jobDescription}  
                </p>
                
              </button> 
              </Link>

            </li>

          ))} 

        </div>
      </div >
    </ul>
  )
}

export default JobCard