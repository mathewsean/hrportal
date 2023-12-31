import axios from '../../Services/axiosInterceptorAdmin';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {format, parseISO} from 'date-fns'

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
        <p className='font-sans font-bold text-xl mt-10 text-center rounded-md bg-slate-100 py-3'>Job Vacancy</p>
        
        
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
                <td className="border border-gray-400 px-4 py-2">{format(parseISO(jobVacancy.expiry), "dd/MM/yyyy")}</td> 
                <td className="border border-gray-400 text-center">

                  <Link to={`/admin_job_applied_candidate_list/${jobVacancy._id}`}>
                    <button className='bg-sky-700 text-white px-4 py-1 rounded-md'>VIEW</button>
                  </Link>

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