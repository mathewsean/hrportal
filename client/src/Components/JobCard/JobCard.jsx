import React from 'react'

function JobCard() {
  return (  
      <button className='flex-col w-96 h-96 bg-slate-200 rounded-2xl shadow-md'>
        <p className='font-sans text-2xl font-bold mx-10 mt-7 text-left'> 
          Job Title
        </p>
        <p className='font-sans font-bold mx-10 mt-2 text-left'>
          Location
        </p>
        <p className='font-sans mx-10 mt-2 text-left'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
      </button>  
  )
}

export default JobCard