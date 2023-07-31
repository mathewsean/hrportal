import React from 'react'

function CvUpload() {
  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='container mx-10 flex flex-col'>
        <div className='flex justify-around'>
          <p className='font-sans text-2xl font-bold mx-10 mt-7  text-left'>
            Upload CV
          </p>
          <button className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-7 mx-10 rounded-md'>
            Upload
          </button>
        </div>
        <input type="file" className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg mb-10' placeholder='  Enter Job Title' />
        
      </div>
    </div>
  )
}

export default CvUpload