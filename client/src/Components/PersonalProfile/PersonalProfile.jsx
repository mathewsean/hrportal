import React from 'react'

function PersonalProfile() {
  return (
    <div className='flex flex-col w-10/12 h-5/6 bg-slate-200 rounded-2xl shadow-md my-7 mx-10'>
      <div className='container mx-10 flex flex-col'>
        <p className='font-sans text-2xl font-bold mt-7  text-left'>
          Create Profile
        </p>
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-10 rounded-md shadow-lg' placeholder='  Enter First Name' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Last Name' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Email Id' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Date of Birth' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Contact Number' />
        <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter Address' />
        <div className='flex gap-5'>
          <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 rounded-md shadow-lg' placeholder='  Enter City/Town' />
          <input type="text" className='w-96 h-10 bg-white font-sans text-black mt-2 mb-10 rounded-md shadow-lg' placeholder='  Enter Pincode' />
        </div>
      </div>
    </div>
  )
}

export default PersonalProfile