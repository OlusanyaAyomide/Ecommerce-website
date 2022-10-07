import React from 'react'
import { Ratings } from '../../home/components'
import { MinHeader2,StoreDetail } from '../../home/components'

export default function Feedback() {
  return (
    <section className='border -mt-[2px]'>
        <div className="row">
        <div className='w-full md:w-4/12 lg:w-3/12 bg-slate-300 md:py-2 hidden md:block'>
                <div className='bg-white container'>
                    <StoreDetail/>
                </div>
            </div>
            <div className='w-full md:w-8/12 lg:w-9/12 bg-slate-300 py-2'>
                <div className='w-full bg-white '>
                <div className='md:w-11/12 lg:w-8/12 xl:w-7/12 mx-auto'>
                <div className=' px-4 py-2 md:px-6  '>
                    <span className='inline-block text-sm rounded-md bg-[#5858ec] px-2 text-white'>Free Delivery</span>
                    <h1 className="my-2  text-xl font-[500] md:text-[24px] lg:text-[28px]">HD CAMERA 23 GIGABYTE</h1>
                    <h1 className='font-semibold text-2xl'>₦20,000</h1>
                    <h1 className='font-[500]'> + <span className='font-semibold text-sm'>₦240</span> shipping fee to your region</h1>
                    <div className='py-2'><span className=''><Ratings reviews={2.7} big={true} totalR={20}/></span></div>
                </div>
              </div>
                </div>
            </div>
            <div className='w-full md:w-4/12 lg:w-3/12 bg-slate-300 md:py-2 md:hidden'>
                <div className='bg-white container'>
                    <StoreDetail/>
                </div>
            </div>
        </div>
    </section>
  )
}
