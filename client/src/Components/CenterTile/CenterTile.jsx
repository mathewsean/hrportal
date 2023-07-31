import React from 'react'
import { useNavigate } from 'react-router-dom'

function CenterTile() {  

  const navigate = useNavigate()
  

  const handleApplyNow = (e) => {
    navigate('/login')
  }


  return (
    <div className='flex justify-center items-center h-screen '>
      <div className='flex flex-col items-center w-2/4 h-96 max-h-96 bg-slate-200 rounded-3xl'>
        <p className='mx-auto text-6xl pt-10 w-3/4 h-48 text-center font-bold'>
          ARE YOU LOOKING FOR AN EXCITING CAREER?
        </p> 
        <button onClick={handleApplyNow} className='w-96 h-10 bg-sky-700 text-lg font-semibold text-white mt-20 rounded-md'>    
          Apply Now
        </button>       
      </div>      
    </div>
  )
}

export default CenterTile  