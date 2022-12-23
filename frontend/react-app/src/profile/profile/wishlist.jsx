import React from 'react'
import {MinHeaderwishlist,Ratings} from '../../home/components'
import { useSelector,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { reviewactions } from '../../store/reviewslice'

export default function Wishlist() {
  const {wishlist} = useSelector((state=>state.auth.userinfo))
  console.log(wishlist)
  const dispatch = useDispatch()

  const products = wishlist.map((item,key)=>{
    return(
      <div className="my-2 flex bg-white rounded-lg -mx-2" key={key}>
          <div className='h-[120px] rounded-lg border w-4/12 md:3/12 lg:w-[4/12]'>
            <Link to="/detail" state={{from:item}}><img src={item.url} alt="" className='cover-image' /></Link>
          </div>
          <div className=' w-8/12 md:w-9/12 lg:w-[4/12] '>
            <div>
            <h1 className='text-[18px] md:text-[20px] lg:text-[24px] mb-2 font-[500] pl-2'>{item.name}</h1>
            <div className="pl-2">
              <Ratings reviews ={item.reviews} totalR = {item.totalR}/>
            </div>
            </div>
            <div className='flex justify-center'>
            <button onClick={()=>{dispatch(reviewactions.setRemoved(item.id))}} className='text-white bg-[#5858ec] px-4 md:px-10 font-[450] ring-2 ring-offset-2 py-2 text-sm rounded-lg'>Remove</button>
          </div>
      </div>
      </div>
    )
  })
  return (
    <>
    {wishlist.length > 0 && <section className='bg-gradient-to-b from-[#5858ec]/10'>
        <div className='flex w-full '>
        <div className="w-full relative">
            <MinHeaderwishlist label ="Wishlists"/>
          </div>
        </div>
        <div className=' py-2 '>
          <div  className="bg-slate-400 px-4 md:px-5 lg:px-4 py-[2px]">
            {products}
          </div>
        </div>
    </section>}
    </>
  )
}

