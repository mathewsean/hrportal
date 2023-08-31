import axios from '../../Services/axiosInterceptor'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function AdminJobAppliedList() {

  const { jobId } = useParams()

  const [jobDetails, setjobDetails] = useState({})
  const [jobAppliedPendingList, setJobAppliedPendingList] = useState([])
  const [jobAppliedNotAFitList, setJobAppliedNotAFitList] = useState([])
  const [jobAppliedMayBeList, setJobAppliedMayBeList] = useState([])
  const [jobAppliedGoodFit, setJobAppliedGoodFit] = useState([])

  useEffect(() => {

    async function getAppliedCandidateList() {
      try {

        const res = await axios.get(`/admin/job_applied_candidates_list?id=${jobId}`)

        if (res.status === 200) {
          setjobDetails(res.data.jobId)
          console.log(res.data.jobId);
          setJobAppliedPendingList(res.data.pending)
          setJobAppliedNotAFitList(res.data.notAFit)
          setJobAppliedMayBeList(res.data.mayBe)
          setJobAppliedGoodFit(res.data.goodFit)
        }

      } catch (error) {
        console.log(error)
      }
    }

    getAppliedCandidateList()

  }, [jobId])

  return (
    <>


      <div className="mx-auto w-3/4 p-8">
        {jobAppliedPendingList.length > 0 ?
          <>
            <p className='font-sans font-bold text-lg'>Job Title : {jobDetails.jobTitle}</p>
            <p className='font-sans font-bold text-base'>Location : {jobDetails.location}</p>
            <p className='font-sans font-bold text-base'>Salary Min : {jobDetails.salaryMin}</p>
            <p className='font-sans font-bold text-base'>Salary Max : {jobDetails.salaryMax}</p>
            <p className='font-sans font-bold text-base'>Job Type : {jobDetails.jobType}</p>
            <br></br>
          </>
          : null}
        <p className='font-sans font-bold text-xl'>Job Applied Candidate List</p>
        <br></br>
        {jobAppliedPendingList.length > 0 ?
          <div>
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr className="bg-sky-700 text-white">
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Email</th>
                  <th className="border border-gray-400 px-4 py-2">Contact</th>
                  <th className="border border-gray-400 px-4 py-2">City</th>
                  <th className="border border-gray-400 px-4 py-2">Address</th>
                  <th className="border border-gray-400 px-4 py-2">Pincode</th>
                  <th className="border border-gray-400 px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobAppliedPendingList.map((candidate, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border border-gray-400 px-4 py-2">{candidate.firstName} {candidate.lastName} </td>
                    <td className="border border-gray-400 px-4 py-2">{candidate.emailId}</td>
                    <td className="border border-gray-400 px-4 py-2">{candidate.contactNos}</td>
                    <td className="border border-gray-400 px-4 py-2">{candidate.city}</td>
                    <td className="border border-gray-400 px-4 py-2">{candidate.address}</td>
                    <td className="border border-gray-400 px-4 py-2">{candidate.pincode}</td>
                    <td className="border border-gray-400 text-center">

                      <Link to={`/admin_job_applied_candidate_profile/${candidate._id}/${jobDetails._id}`}>
                        <button className='bg-cyan-300 text-black font-sans font-bold px-4 py-1 rounded-md'>VIEW</button>
                      </Link>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          :

          <div className="mx-auto w-3/4 p-8">
            <p className='font-sans font-bold text-xl'>No Application Found</p>
            <Link to={`/admin_job_vacancy_list`}>
              <button className='bg-sky-700 text-white px-4 py-1 rounded-md mt-10'>BACK</button>
            </Link>

          </div>

        }
      </div>
    </>
  )
}

export default AdminJobAppliedList