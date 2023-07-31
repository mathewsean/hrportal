import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import JobCard from '../../Components/JobCard/JobCard'

function DashboardCandidate() {
  return (
    <>
      <Navigation />
      <div className='container mx-16 pt-10 '>
        <div className='grid grid-cols-3 gap-y-5'>
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
    </>
  )
}

export default DashboardCandidate