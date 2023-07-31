import React from 'react'

function JobDetailCard() {
  return (
    <div className='flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='flex justify-between'>
        <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
          Job Title
        </p>
        <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
          Apply Now
        </button>
      </div>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Location:
      </p>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Salary:
      </p>
      <p className='font-sans font-bold mx-10 mt-2 text-left'>
        Job Type: 
      </p>
      <p className='font-sans mx-10 mt-2 mb-7 text-left'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  )
}

export default JobDetailCard