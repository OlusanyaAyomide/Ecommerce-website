import React from 'react'

export default function Test() {
  return (
    <div className='bg-gradient-to-b from-[#5858ec]/20 to-slate-200 flex justify-center items-center h-[100vh]'>
      <div>
      <div className='text-semibold mb-5 animate animate-pulse  text-[22px]'><span>Loading</span></div>
       <div className='border-[#5858ec] border-[5px] animate animate-spin rounded-full border-l-transparent border-r-transparent h-10 w-10 mb-10 mx-auto'>
       </div>
      </div>
    
    </div>
  )
}
