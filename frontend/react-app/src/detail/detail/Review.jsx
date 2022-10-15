import React from 'react'
import { DetailStar } from '../../home/components'
import { useSelector } from 'react-redux'


export default function Review() {
    const Reviews = useSelector((state=>state.detail.product.detail.review))
    const count = useSelector((state=>state.detail.product.detail.totalR))
    function ZeroReview(){
      return(
        <div className='h-[100px] flex items-center justify-center'>
          <h1>This Product has No Review Yet</h1>
        </div>
      )
    }
    const ReviewList = Reviews.map((item,key)=>{
      return(
        <div key={key} className="w-full md:w-6/12 lg:w-4/12 pb-2">
            <div className='pb-2'><DetailStar rating={item.rating}/></div>
            <h1 className='font-semibold'>{item.title}</h1>
            <h1>{item.comment}</h1>
            <h1 className='text-gray-700 text-sm'>{item.time} <span className='mx-2'>by</span>{item.customer}</h1>
        </div>
      )
    })
  return (
    <section className="container bg-white pt-10">
      <h1 className='text-[18px] font-semibold'>Reviews From Verified Purchase</h1>
      {count>0 && <span className='text-sm'>{count} Verified Reviews <i className='fa fa-check-circle text-xl ml-2 relative top-1 text-[#5858ec]'></i></span>}
      <div className='row py-2 my-5 md:my-0'> 
        {ReviewList.length>0?ReviewList:<ZeroReview/>}       
      </div>
    </section>
  )
}
