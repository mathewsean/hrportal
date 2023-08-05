import React from 'react'
import { Link } from 'react-router-dom'

function AdminTabs() { 

  return (
    <>

      <div className='container mx-auto px-20 pt-10 grid grid-cols-4 gap-y-5'>
        <Link to={`/admin_job_post`}>
          <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
            <p className='text-white font-bold text-lg text-center'>
              POST JOB VACANCY
            </p>
          </button>
        </Link>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            JOB APPLICATION
          </p>
        </button>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            EMPLOYEES
          </p>
        </button>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            DEPARTMENTS
          </p>
        </button>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            LEAVE APPLICATION APPROVAL
          </p>
        </button>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            ATTENDANCE
          </p>
        </button>
        <button className='w-60 h-60 bg-sky-700 rounded-2xl flex justify-center items-center'>
          <p className='text-white font-bold text-lg text-center'>
            TASK
          </p>
        </button>
      </div>
    </>

  )
}

export default AdminTabs