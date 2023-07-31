import React from 'react'

function EducationProfile() {
  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='container mx-10 flex flex-col'>
      <div className='flex justify-around'>
        <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
          Education
        </p>
        <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
          Add +
        </button>
      </div>
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg' placeholder='  Enter Level of Education' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Field of Study' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter School Name' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Country' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter City' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter From Date' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 mb-10 rounded-md shadow-lg' placeholder='  Enter To Date' />
      </div>
    </div>
  )
}

export default EducationProfile