import React from 'react'
import { MinHeaderProfile } from '../../home/components'
import { TopListtDemo } from '../../constants'
import { Ratings } from '../../home/components'

export default function Purchased() {


  const purchased = TopListtDemo.map((item,key)=>{
    return(

      <div className="my-2 flex bg-white rounded-lg -mx-2" key={key}>
          <div className='h-[120px] rounded-lg border w-4/12 md:3/12 lg:w-[4/12]'>
            <img src={item.url} alt="" className='cover-image' />
          </div>
          <div className=' w-8/12 md:w-9/12 lg:w-[4/12] '>
            <div>
            <h1 className='text-[18px] md:text-[20px] lg:text-[24px] mb-2 font-[500] pl-2'>{item.name}</h1>
            <div className="pl-2">
              <Ratings reviews ={item.reviews} totalR = {item.totalR}/>

            </div>
            </div>
            <div className='flex justify-center'>
            <button className='text-white bg-[#5858ec] px-4 md:px-10 font-[450] ring-2 ring-offset-2 py-2 text-sm rounded-lg'>Review This Product</button>
          </div>
      </div>
      </div>
    )
  })
  return (
    <section className='bg-gradient-to-b from-[#5858ec]/10'>
        <div className='flex w-full '>
          <div className="w-full relative">
            <MinHeaderProfile label ="Purchased Products "/>
          </div>
        </div>
        <div className=' py-2 '>
          <div  className="bg-slate-400 px-4 md:px-5 lg:px-4 py-[2px]">
            {purchased}
          </div>
   
        </div>
    </section>
  )
}
