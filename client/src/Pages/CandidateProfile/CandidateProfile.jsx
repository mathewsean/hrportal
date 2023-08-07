import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import PersonalProfile from '../../Components/PersonalProfile/PersonalProfile'
import EducationProfile from '../../Components/EducationProfile/EducationProfile'
import WorkExpProfile from '../../Components/WorkExpProfile/WorkExpProfile'
import CvUpload from '../../Components/CvUpload/CvUpload'
import CandidateDetails from '../../Components/CandidateDetails/CandidateDetails'


function CandidateProfile() {
  return (
    <>
    <div className='flex flex-col items-center gap-5'>
    <Navigation/>
    <CandidateDetails/>

    {/* <PersonalProfile/>
    <EducationProfile/>
    <WorkExpProfile/>
    <CvUpload/> */}
    </div>

    </>
    
  )
}

export default CandidateProfile