import React, { useEffect, useState } from 'react'
import axios from '../../Services/axiosInterceptor';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

function CandidateDetails() {

  const token = localStorage.getItem("token")
  const [candidate, setCandidate] = useState({})
  const [education, setEducation] = useState([])
  const [workExperience, setWorkExperience] = useState([])
  const { id } = jwt_decode(token)
  const candidateId = id



  useEffect(() => {

    async function getCandidate() {
      try {

        const res = await axios.get(`/candidateDetails?id=${candidateId}`)

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

  const handleProfileupdate = async (e) => {
    e.preventDefault()
    try {

      const res = await axios.patch(`/profile?id=${candidateId}`, candidate)
      console.log(candidate);
      console.log('res', res);

    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteEducation = async (id, candidateId) => {

    try {
      const res = await axios.delete(`/deleteEducation?id=${id}&candId=${candidateId}`)
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteWorkExp = async (id, candidateId) => {

    try {
      const res = await axios.delete(`/deleteWorkExperience?id=${id}&candId=${candidateId}`)
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='grid justify-items-center'>

        {/* PROFILE SECTION START */}
        <div className='container flex flex-col w-10/12 bg-slate-200 rounded-2xl shadow-md my-12 mx-10'>
          <div className='flex justify-around'>
            <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'>
              Profile
            </p>
            <button type='submit' className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
              Save
            </button>
          </div>

          <form onSubmit={handleProfileupdate} className='container grid grid-cols-2 mt-10 justify-items-center '>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>First Name</label>
              <input type="text"
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.firstName}
                onChange={(event) => { setCandidate({ firstName: event.target.value }) }} />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Last Name</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.lastName}
                onChange={(event) => { setCandidate({ lastName: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Email Id</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.emailId}
                onChange={(event) => { setCandidate({ emailId: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Date of Birth</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.dob}
                onChange={(event) => { setCandidate({ dob: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Contact Number</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.contactNos}
                onChange={(event) => { setCandidate({ contactNos: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Address</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.address}
                onChange={(event) => { setCandidate({ address: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>City/Town</label>
              <input type='text'
                className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'
                value={candidate.city}
                onChange={(event) => { setCandidate({ city: event.target.value }) }}
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-sans text-black mt-2 font-bold'>Pincode</label>
              <input className='px-2 py-2 w-96 h-10 bg-white font-sans text-black mb-10 rounded-md shadow-lg'
                value={candidate.pincode}
                onChange={(event) => { setCandidate({ pincode: event.target.value }) }}
              />
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
            <Link to={`/candidate_education`}
              className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md text-center pt-1'>
              Add +
            </Link>
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
                    {education.fromDate}
                  </p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>To Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg'>
                    {education.toDate}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteEducation(education._id, candidateId)
                  }}
                  className='w-48 h-10 bg-cyan-300 text-lg font-semibold text-black mt-2 mb-10 rounded-md text-center'>
                  Delete
                </button>

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
            <Link to={`/candidate_work_experience`} className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md text-center pt-1'>
              Add +
            </Link>
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
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >{workExperience.fromDate}</p>
                  {/* <p datepicker type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter To Date'></p>  */}
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>To Date</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg' >{workExperience.toDate}</p>
                </div>

                <div className='flex flex-col'>
                  <label className='font-sans text-black mt-2 font-bold'>Job Description</label>
                  <p className='px-2 py-2 w-96 h-10 bg-white font-sans text-black rounded-md shadow-lg mb-10' >{workExperience.description}</p>
                  {/* <textarea className="resize-y rounded-md w-9/12 h-1/3 mb-10" ></textarea> */}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteWorkExp(workExperience._id, candidateId)
                  }}
                  className='w-48 h-10 bg-cyan-300 text-lg font-semibold text-black mt-2 mb-10 rounded-md text-center'>
                  Delete
                </button>

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

export default CandidateDetails