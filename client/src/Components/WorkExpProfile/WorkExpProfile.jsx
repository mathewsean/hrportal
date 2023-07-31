import React from 'react'

function WorkExpProfile() {
  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='container mx-10 flex flex-col'>
      <div className='flex justify-around'>
        <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
          Job Title
        </p>
        <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
          Add +
        </button>
      </div>
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg' placeholder='  Enter Job Title' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Company Name' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Location' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter From Date' />
        <input datepicker  type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter To Date' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter From Date' />
        <textarea class="mt-2 resize-y rounded-md w-9/12 h-1/3 mb-10" placeholder='  Decribe your job..'></textarea>
        
      </div>
    </div>
  )
}

export default WorkExpProfile