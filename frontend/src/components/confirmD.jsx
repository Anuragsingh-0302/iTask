// src/components/confirmD.jsx

import React from 'react'

const confirmD = () => {
  return (
    <div className='h-[20vh] w-[50vw] z-50 bg-gray-700 rounded-[20px] flex flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[#6cbbff] '>
      <h2>Are you sure you want to delete this Todo</h2>
      <div className="btn flex items-center justify-center gap-4 mt-4">
        <button className='bg-[#69d7ff] py-2 px-6 font-semibold rounded-full text-purple-800 '>Yes</button>
        <button className='bg-[#69d7ff] py-2 px-6 font-semibold rounded-full text-purple-800'>No</button>
      </div>
    </div>
  )
}

export default confirmD
