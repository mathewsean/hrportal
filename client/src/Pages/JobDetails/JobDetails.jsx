import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import JobDetailCard from '../../Components/JobDetailCard/JobDetailCard'

function JobDetails() {
  return (
    <>
      <div className='flex flex-col items-center gap-10'> 
        <Navigation />
        <JobDetailCard />
      </div>
    </>

  )
}

export default JobDetails