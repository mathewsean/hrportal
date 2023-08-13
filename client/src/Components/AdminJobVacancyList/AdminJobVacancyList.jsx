import axios from '../../Services/axiosInterceptor';
import React, { useEffect, useState } from 'react'

function AdminJobVacancyList() {

  const [jobVacancyList, setJobVacancyList] = useState([])
  
  useEffect(() => {

    async function getJobVacancyList() {

      try {
        const res = await axios.get('/admin/job_vacancylist')
        setJobVacancyList(res.data.getJobList)      
      } catch (error) {
        console.error(error)
      }
    }
    getJobVacancyList()
  }, [])

  




  return (
    <>
    
      <div className="mx-auto w-3/4 p-8">
      <p className='font-sans font-bold text-xl'>Job Vacancy</p>
      <br></br>
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Designation</th>
              <th className="border border-gray-400 px-4 py-2">Location</th>
              <th className="border border-gray-400 px-4 py-2">Salary Min.</th>
              <th className="border border-gray-400 px-4 py-2">Salary Max.</th>
              <th className="border border-gray-400 px-4 py-2">Expiry Date</th>
              <th className="border border-gray-400 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobVacancyList.map((jobVacancy, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-gray-400 px-4 py-2">{jobVacancy.jobTitle}</td> 
                <td className="border border-gray-400 px-4 py-2">{jobVacancy.location}</td>
                <td className="border border-gray-400 px-4 py-2">{jobVacancy.salaryMin}</td>
                <td className="border border-gray-400 px-4 py-2">{jobVacancy.salaryMax}</td>
                <td className="border border-gray-400 px-4 py-2">{jobVacancy.expiry}</td> 
                <td className="border border-gray-400 text-center"> 
                <button className='bg-sky-700 text-white px-4 py-1 rounded-md'>VIEW</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  )
}

export default AdminJobVacancyList