import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptorAdmin';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { parseISO, format } from "date-fns";

function AdminCandidateProfile() {

  const [status, setStatus] = useState("")
  console.log("STATUS", status);
  const [candidate, setCandidate] = useState({})
  const [education, setEducation] = useState([])
  const [workExperience, setWorkExperience] = useState([])
  const { candidateId, jobId } = useParams()

  useEffect(() => {
    async function findStatusOfApplication() {
      try {

        const res = await axios.get(`/admin/job_application_status/${candidateId}/${jobId}`)

        if (res.status === 200) {
          setStatus(res.data)
        }

        console.log('findStatus Of Application', res.data);

      } catch (error) {
        console.error(error)
      }
    }
    findStatusOfApplication()
  }, [status]) 


  useEffect(() => {

    async function getCandidate() {
      try {

        const res = await axios.get(`/admin/job_applied_candidate_details?id=${candidateId}`)

        if (res.status === 200) {
          setCandidate(res.data.getCandidate)
          setEducation(res.data.getCandidate.education)
          setWorkExperience(res.data.getCandidate.workExperience)
        }

      } catch (error) {
        console.error(error);
      }
    }

    getCandidate()

  }, [])

  

  const handleGoodFit = async (status) => {
    try {

      setStatus(status)

      const res = await axios.patch(`/admin/update_job_application_status/${candidateId}/${jobId}`, { status })


      console.log('res', res.data);


    } catch (error) {
      console.error(error)

    }
  }




  return (
    <>
      <div className='grid justify-items-center'>
        <div className='flex mt-16' >
          {status === "goodFit" ?
            null
            :
            <button onClick={() => handleGoodFit('goodFit')} className='bg-cyan-300 text-white font-sans font-bold px-4 py-1 rounded-md mx-10 shadow-lg'>
              GOOD FIT
            </button>
          }

          {status === "mayBe" ?
            null
            :
            <button onClick={() => handleGoodFit('mayBe')} className='bg-cyan-300 text-white font-sans font-bold px-4 py-1 rounded-md mx-10 shadow-lg'>
              MAY BE
            </button>
          }

          {status === 'notAFit' ?
            null
            :
            <button onClick={() => handleGoodFit('notAFit')} className='bg-cyan-300 text-white font-sans font-bold px-4 py-1 rounded-md mx-10 shadow-lg'>
              NOT FIT
            </button>
          }
        </div>

        {/* PROFILE SECTION START */}
        <div className='container flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-12 mx-10'>
          <div className='justify-between'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>
              Profile
            </p>
            {/* <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
              Save
            </button> */}
          </div>
          <form className='container grid grid-cols-2 mt-10 justify-items-center '>


            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>First Name</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.firstName}
              </p>


            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Last Name</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.lastName}
              </p>


            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Email Id</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.emailId}
              </p>

            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Date of Birth</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.dob}
              </p>

            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Contact Number</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.contactNos}
              </p>

            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Address</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.address}
              </p>


            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>City/Town</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.city}
              </p>
            </div>

            <div className='flex flex-col mb-10'>
              <label className='font-sans text-black mt-2  font-bold'>Pincode</label>
              <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                {candidate.pincode}
              </p>
            </div>

          </form>
        </div >
        {/* PROFILE SECTION END */}



        {/* EDUCATION SECTION START */}
        <div className='flex flex-col w-10/12 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
              Education
            </p>
            {/* <Link to={`/candidate_education`}
              className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md text-center pt-1'>
              Add +
            </Link> */}
          </div>
          <form className='container grid grid-cols-2  justify-items-center '>

            {education.length > 0 ? (education.map((education, index) => (
              <div key={index}>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-10 font-bold'>Level Of Education</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {education.levelOfEducation}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Field Of Study</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {education.fieldOfStudy}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>School/College Name</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {education.schoolName}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Country</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {education.country}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>From Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {format(parseISO(education.fromDate), "dd/MM/yyyy")}
                  </p>
                </div>

                <div className='flex flex-col mb-10'>
                  <label className='font-sans text-black mt-2 font-bold'>To Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {format(parseISO(education.toDate), "dd/MM/yyyy")}
                  </p>
                </div>



              </div>
            ))
            ) : (
              <p>No Record</p>
            )}
          </form>
        </div>
        {/* EDUCATION SECTION ENDS */}

        {/* WORK EXPERIENCE SECTION START */}
        <div className='flex flex-col w-10/12 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
              Work Experience
            </p>
            {/* <Link to={`/candidate_work_experience`} className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md text-center pt-1'>
              Add +
            </Link> */}
          </div>

          <form className='container grid grid-cols-2  justify-items-center'>

            {workExperience.length > 0 ? (workExperience.map((workExperience, index) => (
              <div key={index}>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-10 font-bold'>Job Title</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >{workExperience.jobTitle}</p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Company Name</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >{workExperience.companyName}</p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Location</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >{workExperience.location}</p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>From Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >
                    {format(parseISO(workExperience.fromDate), "dd/MM/yyyy")}
                  </p>
                  {/* <p datepicker type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter To Date'></p>  */}
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>To Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >
                    {format(parseISO(workExperience.toDate), "dd/MM/yyyy")}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Job Description</label>
                  <p className='px-2 py-2 w-96 max-h-full  bg-white font-sans text-black rounded-md shadow-lg mb-10' >{workExperience.description}</p>
                  {/* <textarea className="resize-y rounded-md w-9/12 h-1/3 mb-10" ></textarea> */}
                </div>



              </div>
            ))
            ) : (
              <p>No Record</p>
            )}

          </form>
        </div>
        {/* WORK EXPERIENCE SECTION START */}

      </div>

    </>
  )
}

export default AdminCandidateProfile